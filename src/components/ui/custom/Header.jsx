import React from 'react'
import './header.css'

function Header() {
  return (
    <div className='p-3 shaddow-sm flex justify-between items-center px-5'>
        <img src= '/logo.svg' alt="Logo" className="header-logo"/>
        <div>
          <button className="sign-in-button">Sign In</button>
        </div>

    </div>
  )
}

export default Header