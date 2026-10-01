export function ColorScheme(){
    console.log(1);
    const root = document.documentElement;
    const toggle = document.querySelector("#switch")
    const systemTheme = window.matchMedia("(prefers-color-scheme:dark)")
    const storageKey = "darkmode"
    function applyTheme(theme){
        console.log(root);
        
        root.setAttribute("data-mode", theme)
        if(theme === "dark"){
            toggle.checked = true
        } else{
            toggle.checked = false
        }
    }
    const savedTheme = localStorage.getItem(storageKey)
    if(savedTheme !== null){
        applyTheme(savedTheme)
    }else{
        if(systemTheme.matches){
            toggle.checked = true
        } else{
            toggle.checked = false
        }
    }
    console.log(1);
    toggle.addEventListener("change",()=>{
        let theme;

        if(toggle.checked){
            theme = "dark"
        }else{
            theme = "light"
        }
        applyTheme(theme)
        localStorage.setItem(storageKey, theme)
    })
    systemTheme.addEventListener("change",(event)=>{
        const savedTheme = localStorage.getItem(storageKey)
        if(savedTheme === null){
            if(event.matches){
                toggle.checked = true
            } else{
                toggle.checked = false
            }
        }
    })
    
    
}