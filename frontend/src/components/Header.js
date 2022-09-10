import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import '../css/header.css'
import { FaRegUser } from "react-icons/fa";

export default function Header() {
  return (
    <div>
        <nav className='navBar'>
            <Link to="/">
                <img src={logo} className='logo' />
            </Link>
            <ul>
                <li>
                    <Link to="/"><a>Home</a></Link>
                </li>
                <li>
                    <Link to="/new-releases"><a>New Releases</a></Link>
                </li>
                <li>
                    <Link to="/all"><a>Shop All</a></Link>
                </li>
            </ul>
            {/* */}
            <div className='icons'>
                <FaRegUser className='userIcon' size={35} />
            </div>
        </nav>
    </div>
  )
}

