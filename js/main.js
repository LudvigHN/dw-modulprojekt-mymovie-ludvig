
import { Header } from "./components/Header.js";
const rootDOM = document.querySelector("#root")
const apiKey = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGNlZGQ3M2I0MWRlMDZjNTQxYzllMTI5ODgxNmVkMyIsIm5iZiI6MTc5MDU4NDA1Ny4xNDIwMDAyLCJzdWIiOiI2YWJhMjRmOTQwOTI0MWJlNjQxYjczMzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.IgJBOVrWs57pYgJGpLQOam5z9EY_-m4RpomuZk6jhQ8"

const options = {
    method: 'GET',
    headers: { accept: 'application/json', Authorization: 'Bearer '+apiKey }
};

fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));


function render () {
    rootDOM.append(Header())
}

function init (){
    render()
}
init()