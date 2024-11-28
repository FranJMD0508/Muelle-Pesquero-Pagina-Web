import React, { useState, useEffect } from 'react';
import './tablas.css'

function Clientes() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/clientes')
    .then(response => response.json())
    .then(data => {
      setData(data.data)
    })
    .catch(e => console.log(e.message));
  }, []);

  return (
    <div className="container">
        <h1>Historial de Clientes</h1>
        <table id="clientes">
            <thead>
                <tr>
                    <th>Cedula</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Telefono</th>
                </tr>
            </thead>
            <tbody>
                {
                data.map(cliente => (
                    <tr key={cliente.id}>
                        <td>{cliente.cedula}</td>
                        <td>{cliente.nombre}</td>
                        <td>{cliente.email}</td>
                        <td>{cliente.telefono}</td>
                    </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default Clientes