let genreList = {}
await fetch("js/components/Genre.json")
    .then(res => res.json()
    )
    .then(res => {
        genreList = res.genres
    }
    );

import { Header } from "./components/Header.js";
import { Main } from "./components/Main.js";
import { Footer } from "./components/Footer.js";
import { Runtime } from "./components/Runtime.js";

const rootDOM = document.querySelector("#root")
const baseImgUrl = "https://image.tmdb.org/t/p/w500"
const nowShowingUrl = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
const popularUrl = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGNlZGQ3M2I0MWRlMDZjNTQxYzllMTI5ODgxNmVkMyIsIm5iZiI6MTc5MDU4NDA1Ny4xNDIwMDAyLCJzdWIiOiI2YWJhMjRmOTQwOTI0MWJlNjQxYjczMzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.IgJBOVrWs57pYgJGpLQOam5z9EY_-m4RpomuZk6jhQ8"
const options = {
    method: 'GET',
    headers: { accept: 'application/json', Authorization: 'Bearer ' + apiKey }
};
function NowShowing(url) {
    const ulDOM = document.querySelector(".now_showing__list")
    fetch(url, options)
        .then(res => res.json())
        .then(res => {


            res.results.forEach(result => {
                const li = document.createElement("li")
                li.classList.add("now_showing__item")
                li.innerHTML = `
                <a href="details.html?id=${result.id}">
                <img src="${baseImgUrl + result.poster_path}" alt="" class="now_showing__img">
            </a>
                <div>
                    <h2 class="now_showing__item_title">${result.original_title}</h2>
                    <div class="score_wrapper">
                        <!-- <img src="" alt="" class="score_img"> -->
                        <p class="score">⭐${result.vote_average.toFixed(1)}/10 IMDb</p>
                    </div>
                </div>
                `
                ulDOM.append(li)
            })
        }

        )

        .catch(err => console.error(err));
}
function Popular(url) {
    const ulDOM = document.querySelector(".popular__list")
    fetch(url, options)
        .then(res => res.json())
        .then(res => {

            res.results.forEach(async result => {
                const li = document.createElement("li")
                li.classList.add("popular__item")
                li.innerHTML = `<a href="details.html?id=${result.id}">
                <img src="${baseImgUrl + result.poster_path}" alt="" class="now_showing__img">
                </a>
                <div>
                    <h2 class="popular__item_title">${result.original_title}</h2>
                    <div class="score_wrapper">
                        <!-- <img src="" alt="" class="score_img"> -->
                        <p class="score">⭐${result.vote_average.toFixed(1)}/10 IMDb</p>
                    </div>
                    <ul class="genres"></ul>
                    <p class="runtime"></p>
                </div>
                `
                const genreNames = result.genre_ids.map(id => genreList.find(({ id: genreId }) => genreId === id)?.name)
                const genreDOM = li.querySelector(".genres")
                genreNames.forEach(name => {
                    const genreLi = document.createElement("li")
                    genreLi.classList.add("genre")
                    genreLi.textContent = name
                    genreDOM.append(genreLi)
                }
                )

                const runtimeDOM = li.querySelector(".runtime")
                runtimeDOM.append(await Runtime(result.id, options))


                ulDOM.append(li)
            })
        })

        .catch(err => console.error(err));
}

function render() {
    rootDOM.append(Header(), Main(), Footer())
    NowShowing(nowShowingUrl)
    Popular(popularUrl)
}

function init() {
    render()
}
init()


