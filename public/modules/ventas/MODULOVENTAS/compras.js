
let carrito = [];

function añadirAlCarrito(producto, cantidad) {
    carrito.push({ producto, cantidad });
    console.log(`Añadido al carrito. Cantidad: ${cantidad}kg`);
}

function obtenerCarrito() {
    return carrito;
}

document.addEventListener('DOMContentLoaded', () => {
    const botonesOrdenar = document.querySelectorAll('.order-button');
    
    botonesOrdenar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            const producto = event.target.parentElement.getAttribute('data-product');
            const cantidadSelect = event.target.parentElement.querySelector('#weight');
            const cantidad = parseFloat(cantidadSelect.value);

            if (!isNaN(cantidad) && cantidad > 0) {
                añadirAlCarrito(producto, cantidad);
                alert('Añadido al carrito.');
                window.location.href = 'carrito.html';
            } else {
                alert('Por favor, introduce una cantidad válida.');
            }
        });
    });
});
