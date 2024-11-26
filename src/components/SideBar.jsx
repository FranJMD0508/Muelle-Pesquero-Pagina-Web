import React from 'react';
import './sideBar.css'

function SideBar() {

    return (
        <aside id='sidebar' className='sidebar'>
            <ul className='sidebar-nav' id='sidebar-nav'>
                <li className='nav-item'>
                    <a className='nav-link' href="/">
                        <span>Dashboard</span>
                        <i className='bi bi-grid'></i>
                    </a>
                </li>

                <li className='nav-item'>
                    <a 
                        className='nav-link collapsed'
                        data-bs-target="#components-nav"
                        data-bs-toggle="collapsed"
                        href="#"
                    >
                        <span>Clientes</span>
                        <i className="bi bi-person"></i>
                    </a>
                </li>

                <li className='nav-item'>
                    <a 
                        className='nav-link collapsed'
                        data-bs-target="#components-nav"
                        data-bs-toggle="collapsed"
                        href="#"
                    >
                        <span>Tablas</span>
                        <i className="bi bi-table"></i>
                    </a>
                </li>
            </ul>
        </aside>
    )
}

export default SideBar