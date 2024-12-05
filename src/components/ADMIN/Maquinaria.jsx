import React, { useState, useEffect } from 'react';
import './tablas.css';
import config from './config';

function Maquinaria() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(config.apiUrl + "embarcacion", {
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
    <div class="contenedor-tabla">
    <h1>Inventario de Embarcaciones</h1>
    <table id="maquinaria">
        <thead>
            <tr>
                <th>Cantidad</th>
                <th>Tipo de Embarcación</th>
                <th>Estado</th>
                <th>Capacidad máxima (T) </th>
            </tr>
        </thead>
          <tbody>
                {
                  data.map(barco => (
                    <tr key={barco.id}>
                        <td>{barco.cantidad_barco}</td>
                        <td>{barco.tipo_embarcacion}</td>
                        <td>{barco.estado}</td>
                        <td>{barco.capacidad_carga_max}</td>
                    </tr>
                    ))
                }
          </tbody>
      </table>
    </div>
  )
}

export default Maquinaria