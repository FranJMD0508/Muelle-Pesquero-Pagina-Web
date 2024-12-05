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
    <div class="contenedor-tabla">
    <h1>Historial de Transacciones</h1>
    <table id="transacciones">
        <thead>
            <tr>
                <th>ID</th>
                <th>Tipo</th>
                <th>Monto ($)</th>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Número de Factura Compras</th>
                <th>Número de Factura Ventas</th>
            </tr>
        </thead>
          <tbody>
                {
                  data
                  ?data.map(pago => (
                    <tr key={pago.id}>
                        <td>{pago.id}</td>
                        <td>{pago.tipo}</td>
                        <td>{pago.monto}</td>
                        <td>{formatDate(pago.fecha)}</td>
                        <td>{pago.descripcion}</td>
                        <td>{pago.numero_factura_compras}</td>
                        <td>{pago.numero_factura_ventas}</td>
                    </tr>
                    ))
                  : <tr><td colSpan='9' className='text-center'>No hay datos</td></tr>
                }
          </tbody>
      </table>
    </div>
  )
}

export default Transacciones