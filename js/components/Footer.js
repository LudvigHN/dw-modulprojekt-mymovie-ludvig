export function Footer(){
    const footer = document.createElement("footer")
    footer.classList.add("footer")
    footer.innerHTML = `
    
        <button class="footer__btn"><img src="assets/movies.svg" alt=""></button>
        <button class="footer__btn"><img src="assets/tickets.svg" alt=""></button>
        <button class="footer__btn"><img src="assets/favorits.svg" alt=""></button>
    
    `
    return footer
}