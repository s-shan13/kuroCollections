import React from 'react'
import { Link } from 'react-router-dom'
import '../css/login.css'
export default function Login() {
  return (
    <div className='mainLogin'>
        <div className='login-container'>
            <h2 className='login-title'>Log in</h2>
            <form>
                <input type="email" placeHolder="Email" className="form-input" />
                <input type="password" placeHolder="Password" className="form-input" />
                <input type="submit" className='login-button' value="login" />
            </form>
            <div className='register-text'>
                <h3>Or</h3>
                <h3><Link className='register-link' to="/register">Register</Link></h3>
            </div>
        </div>
    </div>
  )
}
