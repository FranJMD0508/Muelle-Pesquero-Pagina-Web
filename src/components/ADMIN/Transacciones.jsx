import React, { useState, useEffect } from 'react';
import './tablas.css';
import config from './config';

function Transacciones() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(config.apiUrl + "transacciones", {
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
    <div class="container">
    <h1>Historial de Transacciones</h1>
    <table id="alimentos">
        <thead>
            <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Monto ($)</th>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Producto</th>
                <th>Cliente</th>
                <th>Cédula</th>
            </tr>
        </thead>
          <tbody>
                {
                  data.map(pago => (
                    <tr key={pago.id}>
                        <td>{pago.id}</td>
                        <td>{pago.tipo}</td>
                        <td>{pago.monto}</td>
                        <td>{formatDate(pago.fecha)}</td>
                        <td>{pago.descripcion}</td>
                        <td>{pago.codigo_pescado}</td>
                        <td>{pago.nombre_cliente}</td>
                        <td>{pago.cedula_cliente}</td>
                    </tr>
                    ))
                }
          </tbody>
      </table>
    </div>
  )
}

export default Transacciones