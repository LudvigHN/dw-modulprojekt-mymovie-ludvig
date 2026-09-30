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

fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,language=en-US`, options)
  .then(res => res.json())
  .then(res => {
    console.log(res);
    const trailerLink = "https://www.youtube.com/watch?v=" + res.videos.results.find(video => video.name.includes("Trailer")).key;
    rootDOM.innerHTML = `
        <div class="details_wrapper">
          <div class="details_img_wrapper">
        <a href="${trailerLink}" class="trailer_link">
          <button class="trailer_btn"></button>
          Play Trailer</a>
        <!-- <img src="${baseImgUrl + res.backdrop_path}" alt=""> -->
        </div>
        <div class="details_content">
          <h1 class="details_title">${res.original_title}</h1>
          <p class="score">⭐${res.vote_average.toFixed(1)}/10 IMDb</p>
          <ul class="genres"></ul>
        </div>
        </div>
        `
    rootDOM.querySelector(".genres").innerHTML = res.genres.map(genre => `<li class="genre">${genre.name}</li>`).join("")

    if (res.original_title != res.title) {
      const title = rootDOM.querySelector(".details_title")
      title.innerHTML += `<span class="english_title">${res.title}</span>`
    }
    document.querySelector(".details_img_wrapper").style.backgroundImage = `url(${baseImgUrl + res.backdrop_path})`
  }
  )
  .catch(err => console.error(err));