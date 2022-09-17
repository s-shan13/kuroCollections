import { Link } from 'react-router-dom'
import '../css/userProfile.css'
export default function UserProfile() {
  return (
    <div className='mainUserProfile'>
      <div className='details-container'>
        <Link to="details"></Link>
      </div>
    </div>
  )
}
