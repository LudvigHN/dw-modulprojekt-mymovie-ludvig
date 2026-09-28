export function Main(){
    const main = document.createElement("main")
    main.classList.add("main")
    main.innerHTML= `
    <section class="now_showing__wrapper">
    <h2 class="now_showing__title">Now Showing</h2>
    <ul class="now_showing__list"></ul>
    </section>
    <section class="popular__wrapper">
    <h2 class="popular__title">popular</h2>
    <ul class="popular__list"></ul>
    </section>
    `
    return main
}