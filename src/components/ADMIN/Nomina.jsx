import React, { useState, useEffect } from 'react';
import './tablas.css';
import config from './config';

function Nomina() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(config.apiUrl + "nomina", {
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
    <h1>Nómina de Empleados</h1>
    <table id="nomina">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Cédula</th>
            </tr>
        </thead>
          <tbody>
                {
                  data.map(empleado => (
                    <tr key={empleado.id}>
                        <td>{empleado.nombre}</td>
                        <td>{empleado.apellido}</td>
                        <td>{empleado.cedula}</td>
                    </tr>
                    ))
                }
          </tbody>
      </table>
    </div>
  )
}

export default Nomina