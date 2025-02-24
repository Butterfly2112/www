function toggleSidebar(id) {
    var sidebar = document.getElementById(id);
    if (sidebar.style.display === "none" || sidebar.style.display === "") {
        sidebar.style.display = "block"; // Показуємо sidebar
    } else {
        sidebar.style.display = "none";  // Ховаємо sidebar
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const movies = document.querySelectorAll(".item"); // Отримуємо всі фільми
    const searchInput = document.getElementById("search"); // Поле пошуку
    const searchForm = document.getElementById("search-form"); // Форма пошуку

    function searchMovies() {
        const searchText = searchInput.value.trim().toLowerCase(); // Введений пошуковий запит
        // проходимо по кожному елементу в масиві фільмів (movies), щоб перевірити кожен фільм.
        movies.forEach(movie => {
            const movieTitle = movie.querySelector(".title").textContent.toLowerCase(); // Отримуємо назву фільму
            // Відображаємо фільми, які містять введений текст, інші ховаємо
            movie.style.display = movieTitle.includes(searchText) ? "block" : "none";
        });
    }
    // Обробник події для форми пошуку
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Запобігаємо перезавантаженню сторінки
        searchMovies(); // Виконуємо пошук
    });
});


