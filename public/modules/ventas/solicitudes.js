function calcularPrecioTotal(precioUnitario, cantidad) {
    if (isNaN(precioUnitario) || isNaN(cantidad)) {
        return 0;
    }
    return (precioUnitario * cantidad).toFixed(2);
}

const preciosPescados = {
    jurel: 13.00,
    atun: 25.00,
    robalo: 12.00,
    merluza: 11.00,
    pargo: 36.00,
    sardina: 3.20,
    dorado: 12.30,
    corvina: 12.00,
    trucha: 17.00,
    camarones: 12.00,
    langostas: 100.00,
    mejillones: 6.10,
    calamares: 33.20,
    cangrejo: 36.20
};

document.getElementById('producto').addEventListener('change', function(event) {
    const productoSeleccionado = event.target.value;
    const precioUnitario = preciosPescados[productoSeleccionado];

    if (precioUnitario !== undefined) {
        document.getElementById('precioUnitario').textContent = precioUnitario.toFixed(2);
    }
});

document.getElementById('solicitudForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const nombreCliente = document.getElementById('nombreCliente').value;
    const cedulaCliente = document.getElementById('cedulaCliente').value;
    const fecha = document.getElementById('fecha').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const producto = document.getElementById('producto').value;
    const cantidad = parseFloat(document.getElementById('cantidad').value);
    const precioUnitario = parseFloat(document.getElementById('precioUnitario').textContent);

    if (!nombreCliente || !cedulaCliente || !fecha || !telefono || !email || !producto || isNaN(cantidad) || isNaN(precioUnitario)) {
        alert('Por favor, complete todos los campos correctamente.');
        return;
    }

    const precioTotal = calcularPrecioTotal(precioUnitario, cantidad);

    const nuevaSolicitud = {
        nombreCliente,
        cedulaCliente,
        producto,
        fecha,
        telefono,
        email,
        cantidad: cantidad.toFixed(2),
        precioUnitario: precioUnitario.toFixed(2),
        precioTotal
    };

    guardarSolicitudLocalStorage(nuevaSolicitud);
    agregarFilaTabla(nuevaSolicitud);

    document.getElementById('solicitudForm').reset();
});

function agregarFilaTabla(solicitud) {
    const nuevaFila = document.createElement('tr');

    const celdaNombre = document.createElement('td');
    celdaNombre.textContent = solicitud.nombreCliente;
    nuevaFila.appendChild(celdaNombre);

    const celdaCedula = document.createElement('td');
    celdaCedula.textContent = solicitud.cedulaCliente;
    nuevaFila.appendChild(celdaCedula);

    const celdaProducto = document.createElement('td');
    celdaProducto.textContent = solicitud.producto;
    nuevaFila.appendChild(celdaProducto);

    const celdaFecha = document.createElement('td');
    celdaFecha.textContent = solicitud.fecha;
    nuevaFila.appendChild(celdaFecha);

    const celdaTelefono = document.createElement('td');
    celdaTelefono.textContent = solicitud.telefono;
    nuevaFila.appendChild(celdaTelefono);

    const celdaEmail = document.createElement('td');
    celdaEmail.textContent = solicitud.email;
    nuevaFila.appendChild(celdaEmail);

    const celdaCantidad = document.createElement('td');
    celdaCantidad.textContent = solicitud.cantidad;
    nuevaFila.appendChild(celdaCantidad);

    const celdaPrecioUnitario = document.createElement('td');
    celdaPrecioUnitario.textContent = solicitud.precioUnitario;
    nuevaFila.appendChild(celdaPrecioUnitario);

    const celdaPrecioTotal = document.createElement('td');
    celdaPrecioTotal.textContent = solicitud.precioTotal;
    nuevaFila.appendChild(celdaPrecioTotal);

    const tbody = document.querySelector('#tablaSolicitudes tbody');
    if (tbody) {
        tbody.appendChild(nuevaFila);
    } else {
        console.error('No se encontró el cuerpo de la tabla (tbody).');
    }
}

function guardarSolicitudLocalStorage(solicitud) {
    let solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
    solicitudes.push(solicitud);
    localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
}

function cargarSolicitudesLocalStorage() {
    const solicitudes = JSON.parse(localStorage.getItem('solicitudes')) || [];
    solicitudes.forEach(solicitud => agregarFilaTabla(solicitud));
}

document.addEventListener('DOMContentLoaded', cargarSolicitudesLocalStorage);

document.getElementById('vaciarAlmacenamiento').addEventListener('click', function () {
    localStorage.removeItem('solicitudes');
    alert('El almacenamiento ha sido vaciado.');
    location.reload(); 
});

//NUEVA FUNCION DE ANDRE Y LEO ADD BY ANDRES
function enviarDatosAPI(){
    const data = {
        nombreCliente,
        cedulaCliente,
        producto,
        fecha,
        telefono,
        email,
        cantidad: cantidad.toFixed(2),
        precioUnitario: precioUnitario.toFixed(2),
        precioTotal
    };

    /* ARREGLAR LA RUTA INDICADA (LET HIM COCK) */
    fetch('https://8b95-190-120-250-84.ngrok-free.app/api/factura/ventas', {
        method: 'POST',
        headers: {
            "ngrok-skip-browser-warning": "69420", // Para saltar la advertencia de Ngrok
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)

    })
    .then(response => response.json())
    .then(data => console.log("Respuesta de la API: ", data))
    .catch(error => console.error('Error:', error));
}



