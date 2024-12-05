document.addEventListener("DOMContentLoaded", function() {
    const url = "https://8b95-190-120-250-84.ngrok-free.app";
    fetch(url+"/api/pescados/", {
        method: "GET",
        headers: new Headers({
            "ngrok-skip-browser-warning": "69420", // Para saltar la advertencia de Ngrok
        }),
    })
    .then((response) => response.json())
    .then((datos) => {
        const menu = document.querySelector(".menu");
        datos.data.map((obj) => {
            const articulo = document.createElement("article");
            articulo.classList.add("item", "col-sm-6", "col-md-4", "col-lg-3", "mb-4");
            articulo.setAttribute("data-product", obj.nombre.toLowerCase());

            const contenido = crearArticle(obj); 
            if (obj.cantidad===0) {
                articulo.innerHTML = `
                    ${contenido} 
                    <button class="order-button" disabled="true" style=".order-button:hover {background-color: #fff !important;color: #fe9 !important;}">NO DISPONIBLE</button>
                    `;
            } else {
                articulo.innerHTML = `
                    ${contenido} 
                    <button class="order-button" >ORDENAR</button>
                    `;
            }
            menu.appendChild(articulo);
        })
    }).catch(error => console.error("Error al obtener los objetos: ", error));

    function crearArticle(obj) {
        const nombre = obj.nombre.toLowerCase();
        const contenido = `
        <img src="${nombre+".jpg"}" alt="${nombre} data-hover="${nombre+"2.jpg"}">
        <h2>${obj.nombre}</h2>
        <p id="${nombre}" value="${obj.precio}">Precio: $${obj.precio}/kg</p>
        `;
        return contenido;
    }

    //CAMBIA IMAGEN
    const items = document.querySelectorAll(".item img");
    items.forEach(function(item) {
        const originalSrc = item.src;
        const hoverSrc = item.getAttribute("data-hover");

        item.addEventListener("mouseenter", function() {
            item.src = hoverSrc;
        });

        item.addEventListener("mouseleave", function() {
            item.src = originalSrc;
        });
    });

    //BUSCADOR
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const articles = document.querySelectorAll(".item");

    function searchPescados() {
        const query = searchInput.value.toLowerCase();
        articles.forEach(function(article) {
            const name = article.querySelector("h2").textContent.toLowerCase();
            if (name.includes(query)) {
                article.style.display = "block";
            } else {
                article.style.display = "none";
            }
        });
    }

    searchButton.addEventListener("click", searchPescados);

    searchInput.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            searchPescados();
        }
    });

    //FUNCIONES DEL CARRITO
    let carrito = [];
    const ordenarbtn = document.querySelectorAll(".order-button");

    fetch(url+"/api/inventario/pescado/", {
        method: "GET",
        headers: new Headers({
            "ngrok-skip-browser-warning": "69420", // Para saltar la advertencia de Ngrok
        }),
    })
    .then((response) => response.json())
    .then((datos) => {
        ordenarbtn.forEach(button => {
            button.addEventListener('click', function(event) {
                // Obtiene el artículo correspondiente al botón que fue clickeado
                const articulo = event.target.closest('.item');
                
                // Obtiene el nombre del producto
                const nombreProducto = articulo.querySelector('h2').textContent;
                console.log(nombreProducto);
                const precio = articulo.querySelector('p').value;
        
                // TENGO QUE HACER LA VERIFICACION, MAÑANA PIENSO
                
                
                // ESTE IF ESTÁ MAAAAAAAAL ESTOY VALIDANDO SI EXISTE
                if (carrito.find(item => item.producto === nombreProducto)) {
                    return;
                } else {
                    carrito.push({
                        producto: nombreProducto,
                        cantidad: 1,
                        precio: precio
                    });
                    actualizarListaCarrito();
                }
        
                // Actualiza la lista del carrito
            });
        });
    }).catch(error => console.error("Error al obtener los objetos: ", error));

    function actualizarListaCarrito() {
    
        // Itera sobre el carrito y agrega cada producto a la lista
        carrito.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${item.producto}</span> <input value="${item.cantidad}" type="number"> <i id="incremento">+</i> <i id="decremento">-</i> <i id="eliminar">borrar</i>`
            listaCarrito.appendChild(li);
        });
    }
    
    const listaCarrito = document.getElementById('lista-carrito');
});