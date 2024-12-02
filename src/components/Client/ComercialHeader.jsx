import React from 'react'
import './header.css'

function Header() {
  return (
    <header>
        <a href="/" className='logo'>
          <img src="./assets/images/pez.png" alt="Muelle pesquero"/>
          <h1>MUELLE PESQUERO</h1>
        </a>
    </header>
  )
}

export default Header