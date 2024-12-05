import React, { useState, useEffect } from 'react';
import './tablas.css';
import config from './config';

function Alimentos() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(config.apiUrl + "inventario/pescado", {
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
                <th>ID Producto</th>
                <th>ID Lote</th>
                <th>Clasificación</th>
                <th>Nombre</th>
                <th>Cantidad (kg)</th>
                <th>Fecha de ingreso</th>
                <th>Fecha de caducidad</th>
                <th>Estado</th>
                <th>Proceso</th>
                <th>Embarcación de origen</th>
            </tr>
        </thead>
          <tbody>
                {
                  data.map(producto => (
                    <tr key={producto.id_pescado}>
                        <td>{producto.id_pescado}</td>
                        <td>{producto.id_lote}</td>
                        <td>{producto.clasificacion}</td>
                        <td>{producto.nombre}</td>
                        <td>{producto.peso}</td>
                        <td>{formatDate(producto.fecha_ingreso)}</td>
                        <td>{formatDate(producto.fecha_caducidad)}</td>
                        <td>{producto.estado}</td>
                        <td>{producto.proceso}</td>
                        <td>{producto.id_embarcacion}</td>
                    </tr>
                  ))
                }
          </tbody>
      </table>
  </div>
  )
}

export default Alimentos