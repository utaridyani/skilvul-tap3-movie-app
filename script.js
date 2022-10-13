const API_URL =  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5012b0c2db6e9ad18f008224703ebeb6&page=1'
const SEARCH = 'https://api.themoviedb.org/3/search/movie?&api_key=5012b0c2db6e9ad18f008224703ebeb6&query='
const IMG = 'https://image.tmdb.org/t/p/w500'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 6) {
        return 'blue'
    } else {
        return 'red'
    }
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, release_date} = movie

        const movieList = document.createElement('div')
        movieList.classList.add('movie')

        movieList.innerHTML = `
            <img src="${IMG + poster_path}" alt="${title}">
            <div class="movie-poster">
                <div id="left">
                    <h4>${title}</h4>
                    <p>${release_date}</p>
                </div>
                <div id="right">
                    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
            </div>
        `
        main.appendChild(movieList)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchMovie = search.value

    if(searchMovie && searchMovie !== '') {
        getMovies(SEARCH + searchMovie)

        search.value = ''
    } else {
        window.location.reload()
    }
})


