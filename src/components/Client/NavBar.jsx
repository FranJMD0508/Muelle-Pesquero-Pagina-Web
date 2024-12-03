import React, { useState, useEffect } from 'react';
import './navBar.css'

function NavBar({ setRoute }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      const savedRoute = localStorage.getItem('currentRoute');
      if (savedRoute) {
          setRoute(savedRoute);
      }
    }, [setRoute]);


    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };

    const handleRouteChange = (route) => {
      setRoute(route);
      localStorage.setItem('currentRoute', route);
    };

  return (
    <nav className='navbar'>
        <div className={`menu ${isOpen ? 'open' : ''}`}>
            <ul>
                <li
                onClick={() => handleRouteChange('Cliente Inicio')}
                >
                INICIO
                </li>
                <li
                onClick={() => handleRouteChange('Cliente')}
                >
                CATÁLOGO
                </li>
                <li
                onClick={() => handleRouteChange('Cliente')}
                >
                NOSOTROS
                </li>
                <li
                onClick={() => handleRouteChange('Cliente')}
                >
                CONTACTO
                </li>
                <li 
                onClick={() => handleRouteChange('Cliente Perfil')}
                >
                PERFIL
                </li>
            </ul>
        </div>
        <button className="menu-toggle" onClick={toggleMenu} onBlur={toggleMenu}>
            {isOpen ? <i className='bi bi-x-lg'></i> : <i className='bi bi-list'></i>}
        </button>
    </nav>
  )
}

export default NavBar