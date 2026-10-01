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

fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,credits,language=en-US`, options)
  .then(res => res.json())
  .then(res => {
    console.log(res);
    let rating = ""
    if (res.adult == true) {
      rating = "18+"
    }
    else { rating = "PG-13" }
    const trailerLink = "https://www.youtube.com/watch?v=" + res.videos.results.find(video => video.name.includes("Trailer")).key;
    rootDOM.innerHTML = `
        <article class="details_wrapper">
          <div class="details_img_wrapper">
        <a href="${trailerLink}" class="trailer_link">
          <button class="trailer_btn">▶</button>
          Play Trailer</a>
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
    rootDOM.querySelector(".cast_list").innerHTML = res.credits.cast.map(actor => `<li class="actor"> <img src="${baseImgUrl + actor.profile_path}" class="actor_img"><p class="actor_name">${actor.name}</p><p class="actor_character thin_text">${actor.character}`).join("")
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
  }
  )
  .catch(err => console.error(err));