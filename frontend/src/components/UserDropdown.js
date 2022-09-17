import { Link } from "react-router-dom";
import '../css/dropdown.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../actions/userAction";
import { useAlert } from "react-alert";


export default function UserDropdown( props ) {

    const {userDropdownStatus} = props;
    const {user} = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const alert = useAlert()

    const handleLogOut = () =>{
        dispatch(logout())
        alert.success("Logged out")
    }

  return (
    <div className={userDropdownStatus?'showUserDropdown':'hideUserDropdown'}>
        <ul>
            {user.role==="admin"&&<li>
                <Link className='dropdownLink mouseHover' to='/dashboard'>Dashboard</Link>
            </li>}
            <li>
                <Link className='dropdownLink mouseHover' to='/profile'>Profile</Link>
            </li>
            <li>
                <Link className='dropdownLink mouseHover' to='/orders'>Orders</Link>
            </li>
            <li>
                <Link to="/" onClick={handleLogOut} className='dropdownLink mouseHover'>Logout</Link>
            </li>
        </ul>
    </div>
  )
}
