export function Runtime(id,options){
    
    return fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`,options)
                    .then(res => res.json()
                    .then(res => {
                        const item = document.createElement("p")
                        
                        let hours = 0
                        let minutes = res.runtime
                        while(minutes >= 60){
                            hours += 1
                            minutes -= 60
                        }
                        item.textContent = `⌚${hours}h ${minutes}m`
                        return item
                    }))
}