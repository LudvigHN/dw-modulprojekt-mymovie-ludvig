import { DetailsHeader } from "./components/DetailsHead.js"
import { ColorScheme } from "./components/ColorScheme.js"
const url = new URL(window.location.href)
const params = url.searchParams
const id = params.get("id")
const rootDOM = document.querySelector("#root")
const baseImgUrl = "https://image.tmdb.org/t/p/w500"

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGNlZGQ3M2I0MWRlMDZjNTQxYzllMTI5ODgxNmVkMyIsIm5iZiI6MTc5MDU4NDA1Ny4xNDIwMDAyLCJzdWIiOiI2YWJhMjRmOTQwOTI0MWJlNjQxYjczMzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.IgJBOVrWs57pYgJGpLQOam5z9EY_-m4RpomuZk6jhQ8'
  }
};

async function details() {
  await fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,credits,language=en-US`, options)
    .then(res => res.json())
    .then(res => {
      console.log(res);

      let rating = ""
      if (res.adult == true) {
        rating = "18+"
      }
      else { rating = "PG-13" }
      console.log(res.videos.results);
      
      const trailerLink = res.videos.results.find(video => video.type === "Trailer" && video.site === "YouTube").key;
      rootDOM.innerHTML = `
        <article class="details_wrapper">
          <div class="details_img_wrapper">
          <button class="trailer_btn">▶</button>
          Play Trailer
        <!-- <img src="${baseImgUrl + res.backdrop_path}" alt=""> -->
        </div>
        <div class="details_content">
          <h1 class="details_title">${res.original_title}</h1>
          <p class="score thin_text">⭐${res.vote_average.toFixed(1)}/10 IMDb</p>
          <ul class="genres"></ul>
          <ul class="info_list">
            <li>
              <p class="thin_text">Length</p>
              <p class="runtime"></p>
            </li>
            <li>
              <p class="thin_text">Language</p>
              <p>${res.spoken_languages[0].english_name}</p>
            </li>
            <li>
              <p class="thin_text">Rating</p>
              <p>${rating}</p>
            </li>
          </ul>
          <section class="description">
            <h2 class="title">description</h2>
            <p class="thin_text">${res.overview}</p>
          </section>
          <section class="cast">
            <h2 class="title"></h2>
          
          </section>
        </div>
        <section class="cast_wrapper"><ul class="cast_list"></ul></section>
  </article>
        `
      rootDOM.prepend(DetailsHeader())
      rootDOM.querySelector(".cast_list").innerHTML = res.credits.cast.map(actor => `<li class="actor"> <img src="${baseImgUrl + actor.profile_path}" class="actor_img"><p class="actor_name">${actor.name}</p><p class="actor_character thin_text">${actor.character}</p>`).join("")
      rootDOM.querySelector(".genres").innerHTML = res.genres.map(genre => `<li class="genre">${genre.name}</li>`).join("")
      const runtime = rootDOM.querySelector(".runtime")
      let hours = 0
      let minutes = res.runtime
      while (minutes >= 60) {
        hours += 1
        minutes -= 60
      }
      runtime.textContent = `${hours}h ${minutes}m`
      if (res.original_title != res.title) {
        const title = rootDOM.querySelector(".details_title")
        title.innerHTML += `<span class="english_title">${res.title}</span>`
      }
      document.querySelector(".details_img_wrapper").style.backgroundImage = `url(${baseImgUrl + res.backdrop_path})`
      const trailerBtn = document.querySelector(".trailer_btn")
      trailerBtn.addEventListener("click", function () {
        document.querySelector(".details_img_wrapper").innerHTML = `
        
      <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/${trailerLink}?si=32oSoVtXNNadRlZJ&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      `

      })
    }
    )
    .catch(err => console.error(err))
};

async function render() {

  await details()
  ColorScheme()
}
function init() {
  render()
}
init()