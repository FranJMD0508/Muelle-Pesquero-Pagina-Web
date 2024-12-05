import React from 'react'
import './menuCompras.css'

function MenuCompras({ setRoute }) {

  return (
    <div className='mainCompras'>
        <h2>¿A qué menú desea acceder?</h2>
        <div className="menuCompras">
            <a href="/modules/ventas/estructura.html"><i className='bi bi-person'></i>ESTANDAR</a>
            <a href="/modules/ventas/personalizadas.html"><i className='bi bi-person-gear'></i>PERSONALIZADO</a>
        </div>
    </div>
  )
}

export default MenuCompras