import React from 'react'
import './header.css'

function Header() {
  return (
    <header>
        <a href="/" className='logo'>
          <img src="./assets/images/pez.png" alt="Muelle pesquero"/>
          <h1>MUELLE PESQUERO</h1>
        </a>
      <nav className='nav-bar'>
        <a href="">INICIO</a>
        <a href="">CATÁLOGO</a>
        <a href="">NOSOTROS</a>
        <a href="">INICIAR SESIÓN</a>
        <a href="">CONTACTO</a>
      </nav>
    </header>
  )
}

export default Header