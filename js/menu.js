import { changeGameState } from "./index.js"
import { settings } from "./index.js";

// console.log(settings)

let slide1 = document.querySelector('.menu-slide1')
let slide2 = document.querySelector('.menu-slide2')
let startGameButton2 = document.querySelector(".menu-page button#start")
let startGameButton1 = document.querySelector(".menu-page button.start")
// console.log(startGameButton)

startGameButton2.addEventListener('click', () => {
    changeGameState()
})

startGameButton1.onclick = () => {
    slide2.style.display = 'block'
    slide1.style.display = 'none'
}


let backgroundsOptions = document.querySelectorAll(".menu-slide2 .settings .backgrounds .backgroud")
let langs = document.querySelectorAll(".menu-slide2 .settings .lans .lan ")
console.log(langs)
export function resetSlides() {
    slide2.style.display = 'none'
    slide1.style.display = 'block'
    //options reset forEach. ... remove class choosen and clear the settings object
}

backgroundsOptions.forEach((background , i) =>{
    console.log(background)
    background.onclick = ()=>{
        background.classList.add("choosen")
        settings.background =  background.getAttribute('number')
        backgroundsOptions.forEach((bg,j) =>{
            if(j !== i){
                bg.classList.remove("choosen")
            }
        })
        console.log(settings)
    }
})



langs.forEach((lan , i) =>{
    console.log(lan)
    lan.onclick = ()=>{
        lan.classList.add("choosen")
        settings.lang =  lan.getAttribute('lang')
        langs.forEach((ln,j) =>{
            if(j !== i){
                ln.classList.remove("choosen")
            }
        })
        console.log(settings)
    }
})


export function resetMenuOptions(){
    backgroundsOptions.forEach((back , i) => i=== 0 ? back.classList.add("choosen") : back.classList.remove('choosen') )
    langs.forEach((lan , i) => i=== 0 ? lan.classList.add("choosen") : lan.classList.remove('choosen') )
    resetSlides()
}