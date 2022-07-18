import React from 'react'
import './header.css'
import basket from './bag.png'
import user from './user.png'
import logo from './logo.jpg'

export default function Header() {
  return (
    <div className='header'>
        <div className='logo'>
            <img id='logo' src={logo} alt="logo" />
        </div>
        <div className='options' >
            <p>New Releases</p>
            <p id='pMid' >Collections</p>
            <p>Best sellers</p>
        </div>
        <div className='login-basket'>
            <img id='user' src={user}/>
            <img id='basket' src={basket} alt="bag" />
        </div>
    </div>
  )
}
