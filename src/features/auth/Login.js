import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import useTitle from '../../hooks/useTitle'
import PulseLoader from 'react-spinners/PulseLoader'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import recipe_star_logo from '../../img/recipe_star_logo.png'
import '../../css/Login.css'

const Login = () => {
    useTitle('UserLogin')

    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response')
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (err.status === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg(err.data?.message)
            }
        }
    }

    const togglePasswordVisibility = () => setShowPassword(!showPassword)

    if (isLoading) return <PulseLoader color={"#FFF"} />

    const content = (
        <div className="signup-container">
            {/* Left Panel */}
            <div className="left-panel">
                <div className="logo">
                    <Link to="/">
                        <img
                            src={recipe_star_logo}
                            alt="Recipe Star Logo"
                            className="logo-img1"
                        />
                    </Link>
                </div>
                <h2 className="signup-heading">Login to Recipe Star</h2>
                
                <p ref={errRef} className={`error-text ${errMsg ? "visible" : "hidden"}`} aria-live="assertive">
                    {errMsg}
                </p>

                <form onSubmit={handleSubmit} className="signup-form">
                    <input
                        type="text"
                        name="username"
                        ref={userRef}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="input-field"
                        placeholder="Username"
                        autoComplete="off"
                        required
                    />

                    <div className="password-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            placeholder="Password"
                            required
                        />
                        <span className="password-icon" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <label className="persist-check">
                        <input
                            type="checkbox"
                            id="persist"
                            onChange={() => setPersist(prev => !prev)}
                            checked={persist}
                        />
                        Trust This Device
                    </label>

                    <button type="submit" className="signup-button">
                        Login
                    </button>
                </form>
                <p className="signin-text">
                    Don't have an account? <Link to="/signup" className="signin-link">SignUp</Link>
                </p>
            </div>

            {/* Right Panel */}
            <div className="right-panel">
                {/* Add any right panel content here */}
            </div>
        </div>
    )

    return content
}

export default Login