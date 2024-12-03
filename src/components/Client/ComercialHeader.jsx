import React from 'react'
import './comercialHeader.css'

function Header() {
  return (
    <header id='cabecero'>
        <a href="/" id='logo'>
          <img src="./assets/images/pez.png" alt="Muelle pesquero"/>
          <h1>MUELLE PESQUERO</h1>
        </a>
    </header>
  )
}

export default Header