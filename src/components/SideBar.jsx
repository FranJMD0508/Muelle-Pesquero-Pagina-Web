import React from 'react';
import './sideBar.css'

function SideBar({ setRoute }) {

    return (
        <aside id='sidebar' className='sidebar'>
            <ul className='sidebar-nav' id='sidebar-nav'>
                <li className='nav-item'>
                    <a 
                        className='nav-link'
                        href="/"
                        onClick={() => setRoute('Dashboard')}
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
                        href="#"
                        onClick={() => setRoute('Alimentos')}
                    >
                        <i class="fa-solid fa-fish"></i>
                        <span>Alimentos</span>
                    </a>
                </li>

                <li className='nav-item'>
                    <a 
                        className='nav-link collapsed'
                        data-bs-target="#components-nav"
                        data-bs-toggle="collapsed"
                        href="#"
                        onClick={() => setRoute('Herramientas')}
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
                        href="#"
                        onClick={() => setRoute('Transacciones')}
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
                        href="#"
                        onClick={() => setRoute('Clientes')}
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
                        href="#"
                        onClick={() => setRoute('Maquinaria')}
                    >
                        <i className="bi bi-table"></i>
                        <span>Maquinaria</span>
                    </a>
                </li>

                <li className='nav-item'>
                    <a 
                        className='nav-link collapsed'
                        data-bs-target="#components-nav"
                        data-bs-toggle="collapsed"
                        href="#"
                        onClick={() => setRoute('Nomina')}
                    >
                        <i className="bi bi-table"></i>
                        <span>Nómina</span>
                    </a>
                </li>
            </ul>
        </aside>
    )
}

export default SideBar