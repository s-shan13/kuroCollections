import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../css/login.css'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, login } from '../actions/userAction'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const navigate = useNavigate()
    const alert = useAlert()
    const dispatch = useDispatch()
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword ] = useState("")

    const {isAuthenticated,  error} = useSelector(state=>state.user)

    const handleLoginSubmit = (e) =>{
        e.preventDefault()
        dispatch(login(loginEmail, loginPassword))

    }
    useEffect(() => {
        //Checking for errors
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        //Redirecting is user is already logged in
        if(isAuthenticated){
            navigate("/profile")
        }
      }, [dispatch,alert, error, isAuthenticated])
    

  return (
    <div className='mainLogin'>
        <div className='login-container'>
            <h2 className='login-title'>Log in</h2>
            <form onSubmit={handleLoginSubmit}>
                <input type="email" required placeHolder="Email" className="form-input" value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} />

                <input type="password" required placeHolder="Password" className="form-input" value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)} />

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
