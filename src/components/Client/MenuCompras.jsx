import React from 'react'
import './menuCompras.css'

function MenuCompras({ setRoute }) {

  return (
    <div className='mainCompras'>
        <div className="logoCompras">
          <img src="./assets/images/pez.png" alt="Bienvenido" />
          <h1>Muelle Pesquero</h1>
        </div>
        <div className="menuCompras">
          <h2>¿A qué menú desea acceder?</h2>
            <a href="/modules/ventas/estructura.html"><i className='bi bi-person'></i>ESTANDAR</a>
            <a href="/modules/ventas/personalizadas.html"><i className='bi bi-person-gear'></i>PERSONALIZADO</a>
        </div>
    </div>
  )
}

export default MenuCompras