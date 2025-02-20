import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faFileCirclePlus,
    faFilePen,
    faUserGear,
    faUserPlus,
    faRightFromBracket,
    faHeart
} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import '../css/DashHeader.css'
import recipe_star_logo from '../img/recipe_star_logo.png'
const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {
    const { isManager, isAdmin } = useAuth()

    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    const onLogoutClicked = async () => {
        try {
            await sendLogout().unwrap()
            // Force clear all navigation state
            window.location.href = '/'
        } catch (err) {
            console.error('Logout failed:', err)
        }
    }

    const onNewNoteClicked = () => navigate('/dash/recipes/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onNotesClicked = () => {
        if (isAdmin) {
            navigate('/dash/recipes')
        } else {
            navigate('/dash/recipes/manage')
        }
    }
    const onUsersClicked = () => navigate('/dash/users')
    const onSavedClicked = () => navigate('/dash/saved-recipes');

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    let newNoteButton = null
    if (NOTES_REGEX.test(pathname)) {
        newNoteButton = (
            <button
                className="dash-header__icon-button"
                title="New Note"
                onClick={onNewNoteClicked}
            >
                <FontAwesomeIcon icon={faFileCirclePlus} />
            </button>
        )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="dash-header__icon-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon icon={faUserPlus} />
            </button>
        )
    }

    let userButton = null
    if (isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className="dash-header__icon-button"
                    title="Users"
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon icon={faUserGear} />
                </button>
            )
        }
    }

    let notesButton = null
    if(isManager || isAdmin ){
        if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
            notesButton = (
                <button
                    className="dash-header__icon-button"
                    title="Recipes"
                    onClick={onNotesClicked}
                >
                    <FontAwesomeIcon icon={faFilePen} />
                </button>
            )
        }
    }
    

    let savedButton = (
        <button
            className="dash-header__icon-button"
            title="Saved Recipes"
            onClick={onSavedClicked}
        >
            <FontAwesomeIcon icon={faHeart} />
        </button>
    );

    const logoutButton = (
        <button
            className="dash-header__icon-button"
            title="Logout"
            onClick={onLogoutClicked}
        >
            <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
    )

    const errClass = isError ? "errmsg" : "offscreen"

    let buttonContent
    if (isLoading) {
        buttonContent = <PulseLoader color={"#FFF"} />
    } else {
        buttonContent = (
            <>
                {newNoteButton}
                {newUserButton}
                {notesButton}
                {userButton}
                {savedButton}
                {logoutButton}
            </>
        )
    }

    const content = (
        <>
        <p className={errClass}>{error?.data?.message}</p>
        <header className="dash-header">
            <div className="dash-header__content">
                <Link to="/dash">
                    <img 
                        src={recipe_star_logo} 
                        alt="RecipeStar" 
                        className="dash-header__logo"
                    />
                </Link>
                <nav className="dash-header__nav-icons">
                    {buttonContent}
                </nav>
            </div>
        </header>
    </>
    )

    return content
}
export default DashHeader