import React, { useState, useEffect } from 'react';

function Alimentos() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://e544-190-120-250-84.ngrok-free.app/api/pescados', {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
    .then(response => response.json())
    .then(data => {
      setData(data.data)
      console.log("Data:",data.data)
    })
    .catch(e => console.log(e.message));
  }, []);

  return (
    <div class="container">
    <h1>Inventario de alimentos</h1>
    <table id="alimentos">
        <thead>
            <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Peso</th>
            </tr>
        </thead>
          <tbody>
                {
                  data.map(producto => (
                    <tr key={producto.id}>
                        <td>{producto.codigo_pescado}</td>
                        <td>{producto.pescado}</td>
                        <td>{producto.cantidad_pescado}</td>
                    </tr>
                    ))
                }
          </tbody>
      </table>
  </div>
  )
}

export default Alimentos