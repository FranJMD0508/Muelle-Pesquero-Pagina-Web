document.addEventListener("DOMContentLoaded", function() {
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
});
