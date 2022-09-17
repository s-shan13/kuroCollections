import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/login.css'
export default function Login() {

    const [loginEmail, setLoginEmail] = useState("")
    const [name, setName] = useState("")
    const [loginPassword, setLoginPassword ] = useState("")
    const [confirmPass, setConfirmPass] = useState("")

    const handleRegisterSubmit = (e) =>{
        e.preventDefault()
        setLoginEmail(e.target[0].value)
        setName(e.target[1].value)
        setLoginPassword(e.target[2].value)
        setConfirmPass(e.target[3].value())
    }

  return (
    <div className='mainLogin'>
        <div className='login-container'>
            <h2 className='login-title'>Register</h2>
            <form onSubmit={handleRegisterSubmit}>
                <input type="email" required placeholder="Email" className="form-input" value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} />

                <input type="text" required placeholder="Name" className="form-input" value={name} onChange={(e)=>setName(e.target.value)} />

                 <input type="password" required placeholder="Password" className="form-input" value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)} />

                 <input type="password" required placeholder="Confirm Password" className="form-input" value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)} />

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
