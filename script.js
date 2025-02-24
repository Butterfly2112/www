let currentOpenSidebar = null; // Змінна для збереження стану відкритої панелі

function toggleSidebar(id) {
    const sidebar = document.getElementById(id);

    // Якщо відкрита якась панель, закриваємо її
    if (currentOpenSidebar && currentOpenSidebar !== sidebar) {
        currentOpenSidebar.style.display = "none";
    }

    // Перемикаємо поточну панель
    if (sidebar.style.display === "none" || sidebar.style.display === "") {
        sidebar.style.display = "block"; // Показуємо поточну панель
        currentOpenSidebar = sidebar; // Оновлюємо поточну відкриту панель
    } else {
        sidebar.style.display = "none";  // Ховаємо поточну панель
        currentOpenSidebar = null; // Якщо панель закрилася, очищуємо стан
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const moviesList = document.querySelector(".list ul"); // Список фільмів
    const movies = Array.from(document.querySelectorAll(".item")); // Отримуємо всі фільми
    const searchInput = document.getElementById("search"); // Поле пошуку
    const searchForm = document.getElementById("search-form"); // Форма пошуку

    function searchMovies() {
        const searchText = searchInput.value.trim().toLowerCase(); // Введений пошуковий запит

        // Фільтруємо та сортуємо фільми
        const MoviesShow = movies
            .filter(movie => {
                const movieTitle = movie.querySelector(".title").textContent.toLowerCase();
                movie.style.display = movieTitle.includes(searchText) ? "block" : "none";
                return movieTitle.includes(searchText);
            })
        // Очищаємо список перед оновленням
        moviesList.innerHTML = "";
        // Додаємо відфільтровані фільми в список
        MoviesShow.forEach(movie => moviesList.appendChild(movie));


    }
    // Обробник події для форми пошуку
    searchForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Запобігаємо перезавантаженню сторінки
        searchMovies(); // Виконуємо пошук і сортування
    });
}); 