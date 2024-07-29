const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280"
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query="
        
const movieBox = document.querySelector("#movie-box")



// async used because we will use fetch to call a thrid party url 
const getMovies = async (api) => {
    // will fetch the given api and will take its data and add it in the response
    const response = await fetch(api)
    // data will come from the particular api which was given and will be converted into json
    const data = await response.json()
    // console.log(data)
    showMovies(data.results)
}

// will take data and display it in the form of cards
const showMovies = (data) => {
    // empty the movie box everytime
    movieBox.innerHTML = '';
    data.forEach(
        (item) => {
            const box = document.createElement("div")
            // done to append it to the movie-box element 
            box.classList.add("box")
            // concatinate with the poster-path
            box.innerHTML = `
            <img src="${IMGPATH + item.poster_path}" alt="" >
                <div class="overlay">
                    <div class="title">
                        <h2>${item.original_title} </h2>
                        <span>${item.vote_average} </span>
                    </div>
                    <h3>Overview: </h3>
                    <p>
                        ${item.overview}
                    </p>
                </div>
            `;
        movieBox.appendChild(box)
    });
}

document.querySelector("#search").addEventListener(
    "keyup",
    function(event) {
        if (event.target.value != ""){
            getMovies(SEARCHAPI + event.target.value)
        } else {
            getMovies(APIURL)
        }
    }
)

// initial call
getMovies(APIURL)