import React from 'react'

function MenuCompras({ setRoute }) {

  return (
    <div className='mainCompras'>
        <h2>¿A qué menú desea acceder?</h2>
        <div className="menuCompras">
            <a href="/modules/ventas/estructura.html">ESTANDAR</a>
            <a href="/modules/ventas/personalizadas.html">PERSONALIZADO</a>
        </div>
    </div>
  )
}

export default MenuCompras