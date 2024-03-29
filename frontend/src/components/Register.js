import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/login.css'
import { createAccount, clearErrors } from '../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'



export default function Login() {

    const [loginEmail, setLoginEmail] = useState("")
    const [name, setName] = useState("")
    const [loginPassword, setLoginPassword ] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const dispatch = useDispatch()
    const alert = useAlert()
    const navigate = useNavigate()
    const {isAuthenticated, error} = useSelector(state=>state.user)

    const handleRegisterSubmit = (e) =>{
        e.preventDefault()

        if(e.target[2].value.length < 8){
            alert.error("Password should be at least 8 characters")
        }else if(e.target[2].value === e.target[3].value){
            dispatch(createAccount(loginEmail, loginPassword, name))
        }else{
            alert.error("Passwords do not match")
        }
    }
    useEffect(()=>{
        //Checking for errors
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        //Redirecting is user is already logged in
        if(isAuthenticated){
            navigate("/profile")
        }
    }, [dispatch, isAuthenticated])

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
            <div className='options-div'>
                <div className='register-text'>
                    <h3><Link className='register-link' to="/login">Login</Link></h3>
                </div>
            </div>
            
        </div>
    </div>
  )
}
