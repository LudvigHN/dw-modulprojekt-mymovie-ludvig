export function Header(){
    const header = document.createElement("header")
    header.classList.add("header")
    header.innerHTML =`
    <h1 class="header_title">MyMovies</h1>
    <label class="switch">
        <input type="checkbox" id="switch">
        <span class="slider round"></span>
    </label>
    ` 
    return header
}