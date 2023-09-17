import { changeGameState } from "./index.js"
import { settings } from "./index.js";

// console.log(settings)

let startGameButton = document.querySelector(".menu-page button#start")
// console.log(startGameButton)

startGameButton.addEventListener('click' , ()=>{
    changeGameState()
})