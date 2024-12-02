import React, { useState, useEffect } from 'react';
import './tablas.css';
import config from './config';

function Herramientas() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(config.apiUrl + "herramientas", {
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

  return (
    <div class="container">
    <h1>Inventario de Herramientas</h1>
    <table id="alimentos">
        <thead>
            <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Cantidad</th>
            </tr>
        </thead>
          <tbody>
                {
                  data.map(herramienta => (
                    <tr key={herramienta.id}>
                        <td>{herramienta.codigo_herramienta}</td>
                        <td>{herramienta.herramienta}</td>
                        <td>{herramienta.cantidad_herramienta}</td>
                    </tr>
                    ))
                }
          </tbody>
      </table>
    </div>
  )
}

export default Herramientas