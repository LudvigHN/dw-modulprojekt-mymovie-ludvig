export function Footer(){
    const footer = document.createElement("footer")
    footer.classList.add("footer")
    footer.innerHTML = `
    <div>
        <button class="btn_frontpage"><img src="" alt=""></button>
        <button class="btn_tickets"><img src="" alt=""></button>
        <button class="btn_favoriets"><img src="" alt=""></button>
    </div>
    `
    return footer
}