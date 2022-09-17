import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../css/login.css'
import { useDispatch, useSelector } from 'react-redux'
import { checkLogin, clearErrors, login } from '../actions/userAction'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { updateDetails } from '../actions/updateAction'

export default function UpdateProfile() {

    const navigate = useNavigate()
    const {user} = useSelector(state=>state.user)
    const {error, isUpdated, loading} = useSelector(state=>state.updated)
    const alert = useAlert()
    const dispatch = useDispatch()
    const [newEmail, setNewEmail] = useState("")
    const [newName, setNewName ] = useState("")

    const handleUpdateSubmit = (e) =>{
        e.preventDefault()
        dispatch(updateDetails(newEmail, newName))
        
    }
    useEffect(() => {
        if(user){
            setNewEmail(user.email)
            setNewName(user.name)
        }
        //Checking for errors
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        if(isUpdated){
            alert.success("Updated")
            dispatch(checkLogin())
            window.location.href="/profile"
            dispatch({type:"UPDT_RESET"})
        }
      }, [dispatch,alert, error, user, isUpdated])
    

  return (
    <div className='mainLogin'>
        <div className='login-container'>
            <h2 className='login-title'>Update details</h2>
            <form onSubmit={handleUpdateSubmit}>
                <input type="email" required className="form-input" value={user&&newEmail} onChange={(e)=>setNewEmail(e.target.value)} />

                <input type="text" required placeHolder="Name" className="form-input" value={newName} onChange={(e)=>setNewName(e.target.value)} />

                <input type="submit" className='login-button' value="Update" />
            </form>
            <div className='register-text'>
                <h3>Or</h3>
                <h3><Link className='register-link' to="/profile">Reset</Link></h3>
            </div>
        </div>
    </div>
  )
}