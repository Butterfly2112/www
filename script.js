//бокова панель
let currentOpenSidebar = null; // Змінна для відстеження відкритої панелі

function toggleSidebar(id) {
    const sidebar = document.getElementById(id);

    // Якщо інша панель відкрита, закриваємо її
    if (currentOpenSidebar && currentOpenSidebar !== sidebar) {
        currentOpenSidebar.classList.remove("show");
    }

    // Перемикаємо поточну панель
    if (!sidebar.classList.contains("show")) {
        sidebar.classList.add("show");
        currentOpenSidebar = sidebar;
    } else {
        sidebar.classList.remove("show");
        currentOpenSidebar = null;
    }
}
//пошук
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
//кнопка "переглянуто"
document.addEventListener("DOMContentLoaded", function () {
const savedData = JSON.parse(localStorage.getItem("films")) || {};

document.querySelectorAll(".sidebar").forEach((sidebar) => {
    const filmId = sidebar.id; // Використовуємо sidebar.id як filmId
    const watchedButton = sidebar.querySelector(".watched");
    const ratingContainer = sidebar.querySelector(".rating-container");
    const commentField = sidebar.querySelector("textarea");
    const submitButton = sidebar.querySelector(".rating-container button");
    const stars = sidebar.querySelectorAll(".star");
    let selectedRating = 0;

    // Відновлення збережених даних
    if (savedData[filmId]) {
        selectedRating = savedData[filmId].rating || 0;
        commentField.value = savedData[filmId].comment || "";
        updateStars();
    }
    watchedButton.addEventListener('click', function () {
        ratingContainer.classList.add('show'); // Показуємо контейнер з рейтингом
        watchedButton.style.display = 'none'; // Приховуємо кнопку "Переглянуто"
    });


    // Оновлення підсвічування зірок
    function updateStars() {
        stars.forEach((star) => {
            const starValue = parseFloat(star.getAttribute("data-value"));
            star.classList.toggle("selected", starValue <= selectedRating);
        });
    }

    // Вибір рейтингу
    stars.forEach((star) => {
        star.addEventListener("click", function () {
            selectedRating = parseFloat(star.getAttribute("data-value"));
            updateStars();
        });
    });

    // Збереження рейтингу та коментаря
    submitButton.addEventListener("click", function () {
        if (selectedRating === 0) {
            alert("Поставте оцінку!");
            return;
        }

        savedData[filmId] = {
            rating: selectedRating,
            comment: commentField.value || "Ви не надали коментарів😑",
        };

        localStorage.setItem("films", JSON.stringify(savedData));
        alert("Відгук збережено ♥");
    });
});
});
//фільтри
document.addEventListener("DOMContentLoaded", function () {
    // Отримуємо фільтри з DOM
    const genreFilter = document.getElementById("genre"); // Фільтр жанру
    const yearFilter = document.getElementById("year"); // Фільтр року
    const durationFilter = document.querySelector("select:nth-of-type(3)"); // Фільтр тривалості (знаходимо третій <select>)

    // Отримуємо всі елементи фільмів у списку
    const items = document.querySelectorAll(".list .item");

    // Функція фільтрації фільмів
    function filterMovies() {
        // Отримуємо вибрані значення фільтрів
        const selectedGenre = genreFilter.value;
        const selectedYear = yearFilter.value;
        const selectedDuration = durationFilter.value;

        // Конвертуємо `NodeList` у масив
        let filteredItems = Array.from(items);

        // фільтрація жанру
        if (selectedGenre !== "all") {
            filteredItems = filteredItems.filter(item => {
                const sidebarId = item.getAttribute("onclick").match(/'([^']+)'/)[1];
                const sidebar = document.getElementById(sidebarId);

                const genres = sidebar.querySelector(".details-table tr:nth-child(3) td")
                    .textContent.trim().toLowerCase();

                return genres.includes(selectedGenre.toLowerCase());
            });
        }

        // фільтрація року
        filteredItems = filteredItems.filter(item => {
            const sidebarId = item.getAttribute("onclick").match(/'([^']+)'/)[1];
            const sidebar = document.getElementById(sidebarId);

            const yearText = sidebar.querySelector(".details-table td:nth-child(2)").textContent.trim();
            const year = parseInt(yearText);

            if (selectedYear === "all") return true;
            if (selectedYear === "from_old") return year;
            if (selectedYear === "from_early") return year;
            if (selectedYear === "2025_2015" && year >= 2015 && year <= 2025) return true;
            if (selectedYear === "2011_2002" && year >= 2002 && year <= 2011) return true;
            if (selectedYear === "1998_1931" && year >= 1931 && year <= 1998) return true;

            return false;
        });

        // фільтрація тривалості
        filteredItems = filteredItems.filter(item => {
            const sidebarId = item.getAttribute("onclick").match(/'([^']+)'/)[1];
            const sidebar = document.getElementById(sidebarId);

            const durationText = parseInt(sidebar.querySelector(".details-table tr:nth-child(2) td").textContent);
            const duration = parseInt(durationText);

            if (selectedDuration === "all") return true;
            if (selectedDuration === "first_small") return duration;
            if (selectedDuration === "first_big") return duration;
            if (selectedDuration === "short" && duration < 110) return true;
            if (selectedDuration === "medium" && duration >= 110 && duration <= 200) return true;
            if (selectedDuration === "long" && duration > 200) return true;

            return false;
        });

        // сортування: рік і триваліть 
        filteredItems = filteredItems.sort((a, b) => {
            const sidebarIdA = a.getAttribute("onclick").match(/'([^']+)'/)[1];
            const sidebarIdB = b.getAttribute("onclick").match(/'([^']+)'/)[1];

            const sidebarA = document.getElementById(sidebarIdA);
            const sidebarB = document.getElementById(sidebarIdB);

            const yearA = parseInt(sidebarA.querySelector(".details-table td:nth-child(2)").textContent);
            const yearB = parseInt(sidebarB.querySelector(".details-table td:nth-child(2)").textContent);

            const durationA = parseInt(sidebarA.querySelector(".details-table tr:nth-child(2) td").textContent);
            const durationB = parseInt(sidebarB.querySelector(".details-table tr:nth-child(2) td").textContent);

            if (selectedGenre === "all") {
                if (selectedDuration === "first_big") {
                    return durationB - durationA; // Сортуємо за тривалістю від меньшої
                } else if (selectedDuration === "first_small") {
                    return durationA - durationB; // Сортуємо за тривалістю від більшої
                }

                if (selectedYear === "from_early") {
                    return yearB - yearA; // Сортуємо за роком від новіших до старіших
                } else if (selectedYear === "from_old") {
                    return yearA - yearB; // Сортуємо за роком від старіших до новіших
                }
            }

            return 0;
        });

        // відобреження відфільтрованих фільмів
        const movieList = document.querySelector(".container .list ul");
        movieList.innerHTML = ""; // Очистка списку перед додаванням нових елементів

        // Додаємо відфільтровані та відсортовані елементи у список
        filteredItems.forEach(movie => {
            movie.style.display = 'flex'; // Показуємо фільм (або '')
            movieList.appendChild(movie);
        });

        // Приховуємо фільми, які не відповідають фільтрам
        items.forEach(item => {
            if (!filteredItems.includes(item)) {
                item.style.display = 'none';
            }
        });
    }

    //  обробник подій для фільтрів
    genreFilter.addEventListener("change", filterMovies);
    yearFilter.addEventListener("change", filterMovies);
    durationFilter.addEventListener("change", filterMovies);
});
