import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../css/userProfile.css'


export default function UserProfile() {

  const {user, loading} = useSelector(state=>state.user)
  

  return (
    <>
    {loading?<h1>loading</h1>:<div className='mainUserProfile'>
      <div className='details-container'>
        <div className='top-details'>
          <div className='name-container'>
            <h1>Name</h1>
            <p>{user && user.name}</p>
          </div>
        <div className='email-container'>
          <h1>Email</h1>
          <p>{user&&user.email}</p>
        </div>
      </div>
      <div className='bottom-options'>
        <Link className='profile-option' to="/orders">My orders</Link>
        <Link className='profile-option' to="/profile/update">Update profile</Link>
        <Link className='profile-option' to="/password/reset">Reset password</Link>
      </div>
        
        
      </div>
    </div>}
    </>
    
  )
}
