import React from 'react'
import './producto.css'

function Producto({ img, nombre, precio }) {
  return (
    <div className="producto-card">
        <img src={img} alt="producto" />
        <div className="info">
          <h4>{nombre}</h4>
          <h5>${precio}</h5>
          <a href="" className='agregar'>
            <i className='bi bi-cart-fill'></i>
            AGREGAR
          </a>
        </div>
    </div>
  )
}

export default Producto