import React from 'react';
import Producto from './Producto';
import productos from '../data/productos';
import './destacados.css';

function Destacados() {

  return (
    <div className="destacados">
      <h2>Productos destacados</h2>
      <div className="productos">
        {productos.map(producto => (
          <Producto
            key={producto.id}
            img={producto.img}
            nombre={producto.nombre}
            precio={producto.precio.toFixed(2)}
          />
        ))}
      </div>
    </div>
  )
}

export default Destacados;