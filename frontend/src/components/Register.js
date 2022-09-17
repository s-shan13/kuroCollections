import React from 'react'
import { Link } from 'react-router-dom'
import '../css/login.css'
export default function Login() {
  return (
    <div className='mainLogin'>
        <div className='login-container'>
            <h2 className='login-title'>Register</h2>
            <form>
                <input type="email" placeHolder="Email" className="form-input" />
                <input type="password" placeHolder="Password" className="form-input" />
                <input type="password" placeHolder="Confirm Password" className="form-input" />
                <input type="submit" className='login-button' value="Register" />
            </form>
            <div className='register-text'>
                <h3>Or</h3>
                <h3><Link className='register-link' to="/login">Login</Link></h3>
            </div>
        </div>
    </div>
  )
}
