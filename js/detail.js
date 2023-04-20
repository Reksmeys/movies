const baseURL = 'https://api.themoviedb.org/3/'
const API_KEY = "4113f3ad734e747a5b463cde8c55de42"
const basePath = 'https://image.tmdb.org/t/p/w440_and_h660_face'

// fetch One Movies
let youtubekey = ""
const fetchTrailer = (movieID) => {
    fetch(`${baseURL}movie/${movieID}/videos?api_key=${API_KEY}`)
    .then(resp => resp.json())
    .then(movie => youtubekey = movie.results[movie.results.length - 1].key)
}
const fetchDetailMovies = (movieID) => {
    fetch(`${baseURL}movie/${movieID}?api_key=${API_KEY}`)
    .then(resp => resp.json())
    .then(movie => {
        $("#banner").html(`
                <section class="container-fluid" style='background-image: linear-gradient(to right, rgba(100, 76, 205, 0.5) calc((50vw - 170px) - 340px), rgba(129, 110, 222, 0.84) 50%, rgba(31.5, 10.5, 10.5, 0.84) 100%), url(${basePath}${movie.backdrop_path})'>
                <div class="container">
                <div class="row detail">
                    <div class="col-12 col-sm-6 col-md-3" style="max-width: 300px;">
                        <img
                            id="movies-thumnail"
                            style="width: 100%;"
                            src=${basePath}${movie.poster_path} alt="poster">
                    </div>
                    <div class="col-12 col-sm-6 col-md-9">
                        <h1 id="movie-title">${movie.original_title}</h1>
                        <h3 class="text-white">Overview</h3>
                        <p id="overview" class="text-white">${movie.overview}</p>
        
                        <div class="d-flex flex-row justify-content-between">
                            <div class="d-flex flex-column">
                                <span><a href="#" class="text-decoration-none text-white">Stan Lee</a></span>
                                <span><a href="#" class="text-decoration-none text-white">Characters</a></span>
                            </div>
                            <div class="d-flex flex-column">
                                <span><a href="#" class="text-decoration-none text-white">Stan Lee</a></span>
                                <span><a href="#" class="text-decoration-none text-white">Characters</a></span>
                            </div>
                            <div class="d-flex flex-column">
                                <span><a href="#" class="text-decoration-none text-white">Stan Lee</a></span>
                                <span><a href="#" class="text-decoration-none text-white">Characters</a></span>
                            </div>
                        </div>
                
                        <!-- Button trigger modal -->
                        <button type="button" id="btnTrailer" class="btn btn-primary mt-5" data-bs-toggle="modal">
                            Play Trailer
                        </button>
        
                    </div>
                </div> 
            </div>
                
                </section>

        
        `)
    })
}
const fetchTopCast = (movieID) => {
    let TopPeople = document.querySelector(".top-cast")
    console.log(`${baseURL}movie/${movieID}/credits?api_key=${API_KEY}`)
    fetch(`${baseURL}movie/${movieID}/credits?api_key=${API_KEY}&page=1`)
    .then(resp => resp.json())
    .then(people => people.cast.map(person => TopPeople.innerHTML += `
        <div class="col-12 col-sm-6 col-md-3 col-lg-3 col-xl-2">
            <div class="card h-100 border-0 shadow">
                <img src=${basePath}${person.profile_path} class="card-img-top" alt="movies">
                <div class="card-body">
                <a href="#" class="text-decoration-none">
                    <h5 class="card-title">
                        ${person.name}
                    </h5>
                    <p>${person.character}</p>
                </a>
                </div>
            </div>
    </div>
    `))
}

let movieID = location.search.substring(1); // get from browser bar ?502356

console.log(movieID)
fetchTrailer(movieID)
fetchDetailMovies(movieID)
fetchTopCast(movieID)

// jQuery Code
$(document).on("click", "#btnTrailer", function(){
    $('#trilerModal').modal('show')
    $("#trailerPlayer").attr("src", `https://www.youtube.com/embed/${youtubekey}`)
})

