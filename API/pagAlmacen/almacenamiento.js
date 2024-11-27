document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5001/api/pescados') // Cambia la URL según tu configuración
        .then(response => response.json())
        .then(data => {
            const productosTable = document.querySelector('#alimentos tbody');
            data.data.forEach(producto => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${producto.codigo_pescado}</td>
                    <td>${producto.pescado}</td>
                    <td>${producto.peso_pescado} kg</td>
                `;
                productosTable.appendChild(row);
            });
        })
        .catch(error => console.error('Error al obtener los productos:', error));

    fetch('http://localhost:5001/api/clientes') // Cambia la URL según tu configuración
        .then(response => response.json())
        .then(data => {
            const clientesTable = document.querySelector('#clientes tbody');
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
        })
        .catch(error => console.error('Error al obtener los clientes:', error));
});