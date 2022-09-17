import { Link } from "react-router-dom";
import '../css/dropdown.css'
import { useDispatch } from 'react-redux'
import { checkLogin, logout } from "../actions/userAction";
import { useEffect } from "react";

export default function UserDropdown( props ) {

    const {userDropdownStatus} = props;
    const dispatch = useDispatch()

    const handleLogOut = () =>{
        dispatch(logout())
    }

  return (
    <div className={userDropdownStatus?'showUserDropdown':'hideUserDropdown'}>
        <ul>
            <li>
                <Link className='dropdownLink mouseHover' to='/profile'>Profile</Link>
            </li>
            <li>
                <Link to="/" onClick={handleLogOut} className='dropdownLink mouseHover'>Logout</Link>
            </li>
        </ul>
    </div>
  )
}
