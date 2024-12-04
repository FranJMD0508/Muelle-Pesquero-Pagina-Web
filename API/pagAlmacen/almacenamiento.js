document.addEventListener("DOMContentLoaded", () => {
    const url = "https://f786-190-120-250-84.ngrok-free.app";
    fetch(url+"inventario/pescado/", {
        method: "GET", // Especificando el método GET explícitamente
        headers: new Headers({
            "ngrok-skip-browser-warning": "69420", // Para saltar la advertencia de Ngrok
        }),
    }) // Cambia la URL según tu configuración
        .then((response) => response.json())
        .then((data) => {
            const objsTable = document.querySelector("#alimentos tbody");
            data.data.forEach((obj) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${obj.codigo_pescado}</td>
                    <td>${obj.pescado}</td>
                    <td>${obj.cantidad_pescado} kg</td>
                    <a class="editar"><i class="fa-solid fa-pen-to-square"></i></a><a class="eliminar"><i class="fa-regular fa-pen-to-square"></i></a>

                `;
                objsTable.appendChild(row);
            });
        })
        .catch((error) => console.error("Error al obtener los objs:", error));

    fetch(url+"inventario/herramientas/", {
        method: "GET", // Especificando el método GET explícitamente
        headers: new Headers({
            "ngrok-skip-browser-warning": "69420", // Para saltar la advertencia de Ngrok
        }),
    }) // Cambia la URL según tu configuración
        .then((response) => response.json())
        .then((data) => {
            const herramientasTable = document.querySelector("#herramientas tbody");
            data.data.forEach((obj) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${obj.cedula}</td>
                    <td>${obj.nombre}</td>
                    <td>${obj.email}</td>
                    <td>${obj.telefono}</td>
                `;//Revisar Objetos
                herramientasTable.appendChild(row);
            });
        })
        .catch((error) => console.error("Error al obtener los clientes:", error));

    fetch(url+"/transacciones/", {
        method: "GET", // Especificando el método GET explícitamente
        headers: new Headers({
            "ngrok-skip-browser-warning": "69420", // Para saltar la advertencia de Ngrok
        }),
    }) // Cambia la URL según tu configuración
        .then((response) => response.json())
        .then((data) => {
            const objsTable = document.querySelector("#transacciones tbody");
            data.data.forEach((obj) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                        <td>${obj.codigo_pescado}</td>
                        <td>${obj.pescado}</td>
                        <td>${obj.cantidad_pescado} kg</td>
                        <a class="editar"><i class="fa-solid fa-pen-to-square"></i></a><a class="eliminar"><i class="fa-regular fa-pen-to-square"></i></a>
    
                    `;
                objsTable.appendChild(row);
            });
        })
        .catch((error) => console.error("Error al obtener los objs:", error));

    fetch(url+"/clientes/", {
        method: "GET", // Especificando el método GET explícitamente
        headers: new Headers({
            "ngrok-skip-browser-warning": "69420", // Para saltar la advertencia de Ngrok
        }),
    }) // Cambia la URL según tu configuración
        .then((response) => response.json())
        .then((data) => {
            const objsTable = document.querySelector("#clientes tbody");
            data.data.forEach((obj) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                        <td>${obj.cedula}</td>
                        <td>${obj.nombre}</td>
                        <td>${obj.email}</td>
                        <td>${obj.telefono}</td>
                        <a class="editar"><i class="fa-solid fa-pen-to-square"></i></a><a class="eliminar"><i class="fa-regular fa-pen-to-square"></i></a>
        
                        `;
                objsTable.appendChild(row);
            });
        })
        .catch((error) => console.error("Error al obtener los objs:", error));

    fetch(url+'/maquinaria/', {
        method: "GET",  // Especificando el método GET explícitamente
        headers: new Headers({
            "ngrok-skip-browser-warning": "69420",  // Para saltar la advertencia de Ngrok
        }),
    }) // Cambia la URL según tu configuración
        .then(response => response.json())
        .then(data => {
            let count = 0;
            const objsTable = document.querySelector('#maquinaria tbody');
            data.data.forEach(obj => {
                const row = document.createElement('tr');
                row.innerHTML = `
                        <td>${obj.codigo_pescado}</td>
                        <td>${obj.pescado}</td>
                        <td>${obj.cantidad_pescado} kg</td>
                        <a class="editar" value=${count}><i class="fa-solid fa-pen-to-square"></i></a><a class="eliminar ${count}"><i class="fa-regular fa-pen-to-square"></i></a>
    
                    `;
                count++;
                objsTable.appendChild(row);
            });
        })
        .catch(error => console.error('Error al obtener los objs:', error));

    fetch(url+'/nomina/', {
        method: "GET",  // Especificando el método GET explícitamente
        headers: new Headers({
            "ngrok-skip-browser-warning": "69420",  // Para saltar la advertencia de Ngrok
        }),
    }) // Cambia la URL según tu configuración
        .then(response => response.json())
        .then(data => {
            const objsTable = document.querySelector('#nomina tbody');
            data.data.forEach(obj => {
                const row = document.createElement('tr');
                row.innerHTML = `
                        <td>${obj.codigo_pescado}</td>
                        <td>${obj.pescado}</td>
                        <td>${obj.cantidad_pescado} kg</td>
                        <a class="editar"><i class="fa-solid fa-pen-to-square"></i></a><a class="eliminar"><i class="fa-regular fa-pen-to-square"></i></a>
    
                    `;
                objsTable.appendChild(row);
            });
        })
        .catch(error => console.error('Error al obtener los objs:', error));
    //FUNCION QUE MUESTRA LA TABLA CUANDO SE CLICKEA SU ELEMENTO <a>
    function mostrarTabla(tablaId) {
        const tablas = document.querySelectorAll(".container");
        tablas.forEach((tabla) => {
            if (tabla.id === tablaId) {
                tabla.style.display = ""; // Muestra la tabla seleccionada
            } else {
                tabla.style.display = "none"; // Oculta las demás tablas
            }
        });
    }

    //LLAMADA DE LOS EVENTOS CLICKEADOS <a>
    document.getElementById("linkPescados").addEventListener("click", (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del enlace
        mostrarTabla("alimentosT"); // Mostrar la tabla de pescados
    });
    document.getElementById("linkHerramientas").addEventListener("click", (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del enlace
        mostrarTabla("herramientasT"); // Mostrar la tabla de pescados
    });
    document
        .getElementById("linkTransacciones")
        .addEventListener("click", (e) => {
            e.preventDefault(); // Evitar el comportamiento por defecto del enlace
            mostrarTabla("transaccionesT"); // Mostrar la tabla de pescados
        });
    document.getElementById("linkClientes").addEventListener("click", (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del enlace
        mostrarTabla("clientesT"); // Mostrar la tabla de pescados
    });
    document.getElementById("linkMaquinaria").addEventListener("click", (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del enlace
        mostrarTabla("maquinariaT"); // Mostrar la tabla de pescados
    });
    document.getElementById("linkNomina").addEventListener("click", (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del enlace
        mostrarTabla("nominaT"); // Mostrar la tabla de clientes
    });
});
