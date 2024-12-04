document.addEventListener("DOMContentLoaded", function() {
    const url = "https://f786-190-120-250-84.ngrok-free.app";
    fetch(url+"/inventario/pescado/", {
        method: "GET",
        headers: new Headers({
            "ngrok-skip-browser-warning": "69420", // Para saltar la advertencia de Ngrok
        }),
    })
    .then((response) => response.json())
    .then((datos) => {
        const menu = document.querySelector("#Fileteados");
        datos.data.map((obj) => {
            const articulo = document.createElement("article").classList.add("item col-sm-6 col-md-4 col-lg-3 mb-4");
            const contenido = crearArticle(obj); 
            if (obj.cantidad===0) {
                articulo.innerHTML = `
                <div id="${obj.name}" style="position: relative; height:100%; width: 100%; z-index: 1; background-color: rgb(204,204,204,0.3)"><h1>No Disponible</h1></div>
                ${contenido}
                `;
            } else {
                articulo.innerHTML = `
                <div style="display:none; height:100%; width: 100%; z-index: 1; background-color: rgb(204,204,204,0.3)"><h1>No Disponible</h1></div>
                ${contenido}
                `;
            }
            menu.appendChild(articulo);
        })
    }).catch(error => console.error("Error al obtener los objetos: ", error));

    function crearArticle(obj) {
        const contenido = `
        <h2>${obj.name}</h2>
        <img src="${obj.imagen+".jpg"}" alt="${obj.name} data-hover="${obj.name+"2.jpg"}">
        <p>${obj.price}</p>
        <button class="order-button">ORDENAR</button>
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

    // fetch(url+"/inventario/pescado/", {
    //     method: "GET",
    //     headers: new Headers({
    //         "ngrok-skip-browser-warning": "69420", // Para saltar la advertencia de Ngrok
    //     }),
    // })
    // .then((response) => response.json())
    // .then((datos) => {
        ordenarbtn.forEach(button => {
            button.addEventListener('click', function(event) {
                // Obtiene el artículo correspondiente al botón que fue clickeado
                const articulo = event.target.closest('.item');
                
                // Obtiene el nombre del producto
                const nombreProducto = articulo.querySelector('h2').textContent;
                console.log(nombreProducto);
        
                // TENGO QUE HACER LA VERIFICACION, MAÑANA PIENSO
                const productoExistente = carrito.find(item => item.producto === nombreProducto);
                
                // ESTE IF ESTÁ MAAAAAAAAL ESTOY VALIDANDO SI EXISTE
                if (productoExistente) {
                    productoExistente.cantidad++;
                } else {
                    carrito.push({
                        producto: nombreProducto,
                        cantidad: 1,
                        precio: nose
                    });
                }
        
                // Actualiza la lista del carrito
                actualizarListaCarrito();
            });
        });
    // }).catch(error => console.error("Error al obtener los objetos: ", error));

    function actualizarListaCarrito() {
        // Limpia la lista actual
        listaCarrito.innerHTML = '';
    
        // Itera sobre el carrito y agrega cada producto a la lista
        carrito.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.producto}: ${item.cantidad}kg`; //VERÉ SI LO INCREMENTO O LE PONGO UN INPUT
            listaCarrito.appendChild(li);
        });
    }
    
    const listaCarrito = document.getElementById('lista-carrito');
});