import React, { useState, useEffect } from 'react';
import './sideBar.css'

function SideBar({ setRoute }) {

    const handleRouteChange = (route) => {
        setRoute(route);
        sessionStorage.setItem('currentRoute', route);
      };

    useEffect(() => {
        const savedRoute = sessionStorage.getItem('currentRoute');
        if (savedRoute) {
            setRoute(savedRoute);
        }
      }, [setRoute]);

    return (
        <aside id='sidebar' className='sidebar'>
            <ul className='sidebar-nav' id='sidebar-nav'>
                <li className='nav-item'>
                    <a 
                        className='nav-link'
                        onClick={() => handleRouteChange('Admin Dashboard')}
                    >
                        <i className='bi bi-speedometer'></i>
                        <span>Dashboard</span> 
                    </a>
                </li>

                <li className='nav-item'>
                    <a 
                        className='nav-link collapsed'
                        data-bs-target="#components-nav"
                        data-bs-toggle="collapsed"
                        onClick={() => handleRouteChange('Admin Alimentos')}
                    >
                        <i className="fa-solid fa-fish"></i>
                        <span>Alimentos</span>
                    </a>
                </li>

                <li className='nav-item'>
                    <a 
                        className='nav-link collapsed'
                        data-bs-target="#components-nav"
                        data-bs-toggle="collapsed"
                        onClick={() => handleRouteChange('Admin Herramientas')}
                    >
                        <i className="bi bi-tools"></i>
                        <span>Herramientas</span>
                    </a>
                </li>

                <li className='nav-item'>
                    <a 
                        className='nav-link collapsed'
                        data-bs-target="#components-nav"
                        data-bs-toggle="collapsed"
                        onClick={() => handleRouteChange('Admin Transacciones')}
                    >
                        <i className="bi bi-cash-coin"></i>
                        <span>Transacciones</span>
                    </a>
                </li>

                <li className='nav-item'>
                    <a 
                        className='nav-link collapsed'
                        data-bs-target="#components-nav"
                        data-bs-toggle="collapsed"
                        onClick={() => handleRouteChange('Admin Clientes')}
                    >
                        <i className="bi bi-people-fill"></i>
                        <span>Clientes</span>
                    </a>
                </li>

                <li className='nav-item'>
                    <a 
                        className='nav-link collapsed'
                        data-bs-target="#components-nav"
                        data-bs-toggle="collapsed"
                        onClick={() => handleRouteChange('Admin Maquinaria')}
                    >
                        <i className="fa-solid fa-ship"></i>
                        <span>Maquinaria</span>
                    </a>
                </li>

                <li className='nav-item'>
                    <a 
                        className='nav-link collapsed'
                        data-bs-target="#components-nav"
                        data-bs-toggle="collapsed"
                        onClick={() => handleRouteChange('Admin Mantenimiento')}
                    >
                        <i className="bi bi-hammer"></i>
                        <span>Mantenimiento</span>
                    </a>
                </li>
                <li className='nav-item'>
                    <a 
                        className='nav-link collapsed'
                        data-bs-target="#components-nav"
                        data-bs-toggle="collapsed"
                        href='modules/produccion/formulario.html'
                    >
                        <i className="bi bi-house-gear-fill"></i>
                        <span>Producción</span>
                    </a>
                </li>

                <li className='nav-item'>
                    <a 
                        className='nav-link collapsed'
                        data-bs-target="#components-nav"
                        data-bs-toggle="collapsed"
                        href='modules/compras/index.html'
                    >
                        <i className="bi bi-bag-fill"></i>
                        <span>Compras</span>
                    </a>
                </li>

                <li className='nav-item'>
                    <a 
                        className='nav-link collapsed'
                        data-bs-target="#components-nav"
                        data-bs-toggle="collapsed"
                        onClick={() => handleRouteChange('Cliente Inicio')}
                    >
                        <i className="bi bi-box-arrow-left"></i>
                        <span>Salir</span>
                    </a>
                </li>
            </ul>
        </aside>
    )
}

export default SideBar