import React from 'react';
import './sideBar.css'

function SideBar({ setRoute }) {

    return (
        <aside id='sidebar' className='sidebar'>
            <ul className='sidebar-nav' id='sidebar-nav'>
                <li className='nav-item'>
                    <a 
                        className='nav-link'
                        onClick={() => setRoute('Admin Dashboard')}
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
                        onClick={() => setRoute('Admin Alimentos')}
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
                        onClick={() => setRoute('Admin Herramientas')}
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
                        onClick={() => setRoute('Admin Transacciones')}
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
                        onClick={() => setRoute('Admin Clientes')}
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
                        onClick={() => setRoute('Admin Maquinaria')}
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
                        onClick={() => setRoute('Admin Nomina')}
                    >
                        <i className="fa-solid fa-id-card-clip"></i>
                        <span>Nómina</span>
                    </a>
                </li>
            </ul>
        </aside>
    )
}

export default SideBar