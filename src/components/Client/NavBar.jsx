import React, { useState } from 'react';
import './navBar.css'

function NavBar({ setRoute }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

  return (
    <nav className='navbar'>
        <div className={`menu ${isOpen ? 'open' : ''}`}>
            <ul>
                <li
                onClick={() => setRoute('Inicio')}
                >
                INICIO
                </li>
                <li
                onClick={() => setRoute('Inicio')}
                >
                CATÁLOGO
                </li>
                <li
                onClick={() => setRoute('Inicio')}
                >
                NOSOTROS
                </li>
                <li
                onClick={() => setRoute('Inicio')}
                >
                CONTACTO
                </li>
                <li 
                onClick={() => setRoute('Inicio')}
                >
                PERFIL
                </li>
            </ul>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
            {isOpen ? <i className='bi bi-x-lg'></i> : <i className='bi bi-list'></i>}
        </button>
    </nav>
  )
}

export default NavBar