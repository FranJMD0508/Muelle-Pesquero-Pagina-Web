import React from 'react'

function NavNotice() {
  return (
    <li className='nav-item dropdown'>
      <a className='nav-link nav-icon' href="#" data-bs-toggle="dropdown">
        <i className='bi bi-bell'></i>
        <span className='badge bg-primary badge-number'>5</span>
      </a>

      <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications'>
        <li className='dropdown-header'>
          Tienes 5 notificaciones
          <a href="#">
            <span className='badge rounde-pill bg-primary p-2 ms-2'>
              Ver Todo
            </span>
          </a>
        </li>
        <li>
          <hr className='dropdown-divider'/>
        </li>

        <li className='notifications-item'>
          <i className='bi bi-exclamation-circle text-warning'></i>
          <div>
            <h4>Lorem Impsum</h4>
            <p>Hola me llamo luis</p>
            <p>Hace 30 minutos</p>
          </div>
        </li>

        <li>
          <hr className='dropdown-divider'/>
        </li>

        <li className='notifications-item'>
          <i className='bi bi-exclamation-circle text-warning'></i>
          <div>
            <h4>Penhem Chulo</h4>
            <p>Hola me llamo Francisco</p>
            <p>Hace 30 minutos</p>
          </div>
        </li>

        <li>
          <hr className='dropdown-divider'/>
        </li>

        <li className='dropdown-footer'>
          <a href="#">Mostrar todo</a>
        </li>
      </ul>
    </li>
  )
}

export default NavNotice