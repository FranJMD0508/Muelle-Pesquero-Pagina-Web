import React, { useState, useEffect } from 'react';
import './tablas.css';
import config from './config';

function Alimentos() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(config.apiUrl + "pescados", {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
    .then(response => response.json())
    .then(data => {
      setData(data.data)
    })
    .catch(e => console.log(e.message));
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="contenedor-tabla">
    <h1>Inventario de alimentos</h1>
    <table id="alimentos">
        <thead>
            <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Cantidad (Kg)</th>
                <th>Fecha de entrada</th>
                <th>Fecha de caducidad</th>
            </tr>
        </thead>
          <tbody>
                {
                  data.map(producto => (
                    <tr key={producto.id}>
                        <td>{producto.codigo_pescado}</td>
                        <td>{producto.pescado}</td>
                        <td>{producto.cantidad_pescado}</td>
                        <td>{formatDate(producto.fecha_entrada)}</td>
                        <td>{formatDate(producto.fecha_caducidad)}</td>
                    </tr>
                  ))
                }
          </tbody>
      </table>
  </div>
  )
}

export default Alimentos