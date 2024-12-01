import React from 'react'
import './header.css'

function Header({ setRoute }) {
  return (
    <header>
        <a href="/" className='logo'>
          <img src="./assets/images/pez.png" alt="Muelle pesquero"/>
          <h1>MUELLE PESQUERO</h1>
        </a>
      <nav className='nav-bar'>
        <a
          href=""
          onClick={() => setRoute('Inicio')}
        >
          INICIO
        </a>
        <a
          href=""
          onClick={() => setRoute('Inicio')}
        >
          CATÁLOGO
        </a>
        <a
          href=""
          onClick={() => setRoute('Inicio')}
        >
          NOSOTROS
        </a>
        <a
          href=""
          onClick={() => setRoute('Inicio')}
        >
          CONTACTO
        </a>
        <a 
          href=""
          onClick={() => setRoute('Inicio')}
        >
          PERFIL
        </a>
      </nav>
    </header>
  )
}

export default Header