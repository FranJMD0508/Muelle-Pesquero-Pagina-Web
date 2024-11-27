import React from 'react'

function CardFilter({filterChange}) {
  return (
    <div className='filter'>
        <a className='icon' href="" data-bs-toggle='dropdown'>
            <i className='bi bi-three-dots'></i>
        </a>
        <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow'>
            <li className='dropdown-header text-start'>
                <h6>Filtro</h6>
            </li>
            <li>
                <a className='dropdown-item' onClick={() => filterChange('Todo')}>
                    Todo
                </a>
            </li>
            <li>
                <a className='dropdown-item' onClick={() => filterChange('Ventas')}>
                    Ventas
                </a>
            </li>
            <li>
                <a className='dropdown-item' onClick={() => filterChange('Ganancias')}>
                    Ganancias
                </a>
            </li>
            <li>
                <a className='dropdown-item' onClick={() => filterChange('Clientes')}>
                    Clientes
                </a>
            </li>
        </ul>
    </div>
  )
}

export default CardFilter