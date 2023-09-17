import { runGame } from "./game.js"

let menuPage = document.querySelector(".menu-page")
let gamePage = document.querySelector(".game-page")




let startGame = false
export function changeGameState() {
    startGame = !startGame
    engine()
}

export let settings = {
    mode: 'basic',
    lang: 'arabic',
    background: 1
}






function EngineRunTheGame() {
    //& show the game page
    gamePage.style.display = 'block'
    menuPage.style.display = 'none'
    runGame()
    //^ generate , regenerate  the game settings , players , playerBase , cards (logically and drawing)

}
function EngineShowMenu() {
    //& show the menu page
    menuPage.style.display = 'block'
    gamePage.style.display = 'none'
    //^ delete all the data of the players , cards 
    settings.mode = ''
    settings.lang = ''
    settings.background = ''
    console.log(settings)

}







function engine() {
    if (startGame) {
        EngineRunTheGame()
    } else {
        EngineShowMenu()
    }
}

