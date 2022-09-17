import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import '../css/header.css'
import { FaRegUser, FaRegHeart, FaShoppingBag } from "react-icons/fa";
import Dropdown from './Dropdown';
import UserDropdown from './UserDropdown';
import { useSelector } from 'react-redux';

export default function Header() {

    const [showDropdown, setShowDropdown] = useState(false)
    const [showUserDropdown, setUserShowDropdown] = useState(false)
    const {isAuthenticated} = useSelector(state=>state.user)

    return (
        <div className='mainHeaderDiv'>
            <div className='logoDiv' >
                <Link to='/'>
                    <img className='logo mouseHover' src={logo}></img>
                </Link>
            </div>
            <div className='navbarDiv' >
                <ul className='navList'>
                    <li>
                        <Link className='navLink mouseHover' to='/'>Home</Link>
                    </li>
                    <li>
                        <Link className='navLink mouseHover' to='/new-releases'>New Releases</Link>
                    </li>
                    <li onMouseLeave={()=>setShowDropdown(false)}>
                        <Link className='navLink mouseHover' onMouseEnter={()=> setShowDropdown(true)} to='/all' >Shop All</Link>
                        <Dropdown dropdownStatus={showDropdown} />
                    </li>
                </ul>
            </div>
            <div className='iconsDiv' >
                <ul className='iconsList'>
                    <li onMouseLeave={()=>setUserShowDropdown(false)}>
                        <Link to='/login'><FaRegUser className='icon mouseHover' onMouseEnter={()=> setUserShowDropdown(true)}/></Link>
                        
                        {isAuthenticated&&<UserDropdown userDropdownStatus={showUserDropdown} />}
                    </li>
                    <li>
                        <Link to='/favourites'><FaRegHeart className='icon mouseHover'/></Link>
                    </li>
                    <li>
                        <Link to='/bag'><FaShoppingBag className='icon mouseHover'/></Link>
                    </li>
                </ul>    
            </div>
        </div>
    )
}

