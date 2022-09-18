import '../css/resetPassword.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'

export default function ResetPassword() {

    const {user} = useSelector(state=>state.user)
    const [sent, setSent] = useState(false)
    const [email, setEmail] = useState("")

    const handleClick = () =>{
        setSent(!sent)
    }

  return (
    <div className="main-reset-pass">

        {sent?<h3>Reset email sent to {user?user.email:email}</h3>:<div className="email-box-div">
            {user?<p className='email-p'>{user.email}</p>:<input type="email" placeholder="Enter Email" className='email-input' onChange={(e)=>setEmail(e.target.value)} />}
            
        </div>}
        <p className='send-btn' onClick={handleClick}>{sent?"Use different email":"Send"}</p>
    </div>
  )
}
