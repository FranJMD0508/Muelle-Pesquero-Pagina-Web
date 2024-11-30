document.addEventListener('DOMContentLoaded', () => {
    // Solicitar productos con el método GET explícito
    fetch("https://e544-190-120-250-84.ngrok-free.app/API/pescados", {
      method: "GET",  // Especificando el método GET explícitamente
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",  // Para saltar la advertencia de Ngrok
      }),
    })
      .then(response => response.json())
      .then(data => {
        const productosTable = document.querySelector('#alimentos tbody');
        // Verificar si la respuesta contiene los datos esperados
        if (data && data.data && Array.isArray(data.data)) {
          data.data.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${producto.codigo_pescado}</td>
              <td>${producto.pescado}</td>
              <td>${producto.cantidad_pescado} kg</td>
            `;
            productosTable.appendChild(row);
          });
        } else {
          console.error('Datos de productos no válidos:', data);
        }
      })
      .catch(error => console.error('Error al obtener los productos:', error));
  
    // Solicitar clientes con el método GET explícito
    fetch('https://e544-190-120-250-84.ngrok-free.app/API/clientes', {
      method: 'GET',  // Especificando el método GET explícitamente
      headers: {
        'ngrok-skip-browser-warning': '69420', // Para saltar la advertencia de Ngrok también en esta solicitud
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        const clientesTable = document.querySelector('#clientes tbody');
        // Verificar si la respuesta contiene los datos esperados
        if (data && data.data && Array.isArray(data.data)) {
          data.data.forEach(cli => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${cli.cedula}</td>
              <td>${cli.nombre}</td>
              <td>${cli.email}</td>
              <td>${cli.telefono}</td>
            `;
            clientesTable.appendChild(row);
          });
        } else {
          console.error('Datos de clientes no válidos:', data);
        }
      })
      .catch(error => console.error('Error al obtener los clientes:', error));
  });
  