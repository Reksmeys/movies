const baseURL = 'https://api.themoviedb.org/3/'
const API_KEY = "4113f3ad734e747a5b463cde8c55de42"
const page = 1

const basePath = 'https://image.tmdb.org/t/p/w440_and_h660_face'

// popular movies card

// declare function to card
const renderToCard = (data, renderArea) => {
    let renderToUI = document.querySelector(renderArea)
    data.map(movie => renderToUI.innerHTML += `
        <div class="col-12 col-sm-6 col-md-3 col-lg-3 col-xl-2">
            <a href="html/detail.html?${movie.id}">
                <div class="card h-100 border-0 shadow">
                    <img src=${basePath}${movie.poster_path} class="card-img-top" alt="movies">
                    <div class="card-body">
                    <a href="#" class="text-decoration-none">
                        <h5 class="card-title">${movie.title}</h5>
                    </a>
                    </div>
                </div>
            </a>
        </div>
    
    `
    )
}
// fetching popular movies
const fetchPopularMovies = () => {
    fetch(`${baseURL}movie/popular?api_key=${API_KEY}&page=${page}`)
    .then(resp => resp.json())
    .then(movies => {
        renderToCard(movies.results, ".popular-movies")
    })
}
const fetchPlayingMovies = () => {
    fetch(`${baseURL}movie/now_playing?api_key=${API_KEY}&page=${page}`)
    .then(resp => resp.json())
    .then(movies => renderToCard(movies.results, ".playing-movies"))
}

const fetchPopularPeople = () => {
    let TopPeople = document.querySelector(".top-cast")
    console.log(`${baseURL}person/popular?api_key=${API_KEY}&page=${page}`)
    fetch(`${baseURL}person/popular?api_key=${API_KEY}&page=${page}`)
    .then(resp => resp.json())
    .then(people => people.results.map(person => TopPeople.innerHTML += `
        <div class="col-12 col-sm-6 col-md-3 col-lg-3 col-xl-2">
            <div class="card h-100 border-0 shadow">
                <img src=${basePath}${person.profile_path} class="card-img-top" alt="movies">
                <div class="card-body">
                <a href="#" class="text-decoration-none">
                    <h5 class="card-title">
                        ${person.name}
                    </h5>
                    <p>Jake Sully</p>
                </a>
                </div>
            </div>
    </div>
    `))
}

fetchPopularMovies()
fetchPlayingMovies()
fetchPopularPeople()
