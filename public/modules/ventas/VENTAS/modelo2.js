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
                <div id="${obj.name}" style="height:100%; width: 100%; z-index: 1; background-color: rgb(204,204,204,0.3)"><h1>No Disponible</h1></div>
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
});