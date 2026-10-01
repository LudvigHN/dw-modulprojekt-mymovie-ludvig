export function DetailsHeader(){
    const header = document.createElement("header")
    header.classList.add("details_header")
    header.innerHTML =`
    <a href="index.html" class="details__back_arrow"><img src="assets/backarrow.svg" class="back_arrow__img"></a>
    <label class="switch details__switch">
        <input type="checkbox" id="switch">
        <span class="slider round"></span>
    </label>
    ` 
    return header
}