const inputNode = document.getElementById('input')
const buttonNode = document.getElementById('button')
const movieListNode = document.getElementById('movieList')

const API_KEY = '1808c42d'

buttonNode.addEventListener('click', buttonHandler)

function buttonHandler() {
    const movieTitle = inputNode.value
    const url = `https://www.omdbapi.com/?s=${encodeURIComponent(movieTitle)}&apikey=${API_KEY}`;
    console.log(url);

    if(!movieTitle.trim()) {
        alert('Введите название фильма');
        return;
    }

    fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(movieTitle)}&apikey=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                renderMovies(data.Search);
            } else {
                movieListNode.innerHTML = '<p class="movie__title">Фильмы не найдены</p>';
            }
        })
        .catch(error => {
            console.error('Ошибка при запросе:', error);
            movieListNode.innerHTML = '<p class="movie__title">Произошла ошибка. Попробуйте позже</p>';
        })
}

function renderMovies(movies) {
    movieListNode.innerHTML = movies
        .map(movie => {
            return `
                <a class="movie__link" href="movie-details.html?id=${movie.imdbID}">
                    <li class="movie">
                        <img class="movie__img" src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.png'}" alt="${movie.Title}" />
                        <div class="movie__info">
                            <h2 class="movie__title">${movie.Title}</h2>
                            <p class="movie__year">${movie.Year}</p>
                            <p class="movie__type">${movie.Type === 'movie' ? 'Фильм' :
                                movie.Type === 'series' ? 'Сериал' :
                                movie.Type === 'episode' ? 'Эпизод' : movie.Type}</p>
                        </div>
                    </li>
                </a>
            `;
        })
        .join('')
}

















// fetch('https://jsonplaceholder.typicode.com/todos', {
//     method: 'POST',
//     body: JSON.stringify({
//         title: 'новая задача',
//         completed: false
//     }),
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })
//     .then(response => response.json())
//     .then(json => console.log(json))

// const params = new URLSearchParams(location.search);

// const id = params.get('id');

// console.log(id);

// fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
//     .then(response = responsee.json())
//     .then(json = console.log(json))