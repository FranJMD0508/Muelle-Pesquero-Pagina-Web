import React, { useState } from 'react';
import './producto.css'

function Producto({ img, nombre, precio }) {
  const [estado, setEstado] = useState(false);

  const toggleInfo = () => {
    setEstado(!estado);
  };

  return (
    <div className="producto-card">
        <img src={img} alt="producto" tabIndex="0" onFocus={toggleInfo} onBlur={toggleInfo}/>
        <div className={`info ${estado ? 'open' : 'closed'}`}>
          <h4>{nombre}</h4>
          <h5>${precio}/kg</h5>
          <a href="/modules/ventas/estructura.html" className={`agregar ${!estado ? 'open' : 'closed'}`}>
            <i className='bi bi-cart-fill'></i>
            <span>AGREGAR</span>
          </a>
        </div>
    </div>
  )
}

export default Producto