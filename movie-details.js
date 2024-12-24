const API_KEY = '1808c42d'

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

loadingPageData()

function loadingPageData() {
    if (movieId) {
        const url = `https://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`
    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.Response === 'True') {
                    document.getElementById('moviePoster').src = data.Poster !== 'N/A' ? data.Poster : 'placeholder.png';
                    document.getElementById('movieTitle').textContent = data.Title;
                    document.getElementById('movieYear').textContent = data.Year;
                    document.getElementById('movieRating').textContent = data.imdbRating;
                    document.getElementById('movieReleased').textContent = data.Released;
                    document.getElementById('movieRuntime').textContent = data.Runtime;
                    document.getElementById('movieGenre').textContent = data.Genre;
                    document.getElementById('movieDirector').textContent = data.Director;
                    document.getElementById('movieWriter').textContent = data.Writer;
                    document.getElementById('movieActors').textContent = data.Actors;
                    document.getElementById('moviePlot').textContent = data.Plot;
                } else {
                    document.body.innerHTML = `<p>Фильм не найден. Попробуйте позже.</p>`;
                }
            })
            .catch(error => {
                console.error('Ошибка при запросе:', error);
                document.body.innerHTML = `<p>Произошла ошибка. Попробуйте позже.</p>`;
            });
    } else {
        document.body.innerHTML = `<p>ID фильма не указан.</p>`;
    }
    
}