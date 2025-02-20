// features/auth/Signup.js
import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useRegisterMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import useTitle from '../../hooks/useTitle'
import PulseLoader from 'react-spinners/PulseLoader'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import recipe_star_logo from '../../img/recipe_star_logo.png'
import '../../css/Login.css'

const Signup = () => {
    useTitle('Recipe Star: Sign Up')
    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const [register, { isLoading }] = useRegisterMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await register({ username, password }).unwrap()
            navigate('/login')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response')
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (err.status === 409) {
                setErrMsg('Username Already Exists')
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus()
        }
    }

    const togglePasswordVisibility = () => setShowPassword(!showPassword)

    if (isLoading) return <PulseLoader color={"#FFF"} />

    return (
        <div className="signup-container">
            <div className="left-panel">
                <div className="logo">
                    <Link to="/">
                        <img src={recipe_star_logo} alt="Recipe Star Logo" className="logo-img1" />
                    </Link>
                </div>
                <h2 className="signup-heading">Create New Account</h2>
                
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

                    <button type="submit" className="signup-button">
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <p className="signin-text">
                    Already have an account? <Link to="/login" className="signin-link">Login</Link>
                </p>
            </div>

            <div className="right-panel">
                {/* Same background as login */}
            </div>
        </div>
    )
}

export default Signup