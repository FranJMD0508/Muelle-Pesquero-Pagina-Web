import React from 'react'
import './logo.css'

function Logo() {

    const handleToggleSideBar = () => {
        document.body.classList.toggle('toggle-sidebar');
    };

    const handleBlur = () => {
        document.body.classList.remove('toggle-sidebar');
    };

    return (
        <div className='d-flex align-items-center justify-content-between'>
                        <i
                className="bi bi-list toggle-sidebar-btn"
                onClick={handleToggleSideBar}
                onBlur={handleBlur}
                tabIndex="0"
            ></i>
            <a href='/' className='logo d-flex align-items-center'>
                {/* <img src="" alt=""/> */}
                <span className='d-none d-lg-block'>Administración</span>
            </a>
        </div>
    )
}

export default Logo