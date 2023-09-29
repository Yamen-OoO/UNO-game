import { cardAudio, muteGameAudios, unMuteGameAudios } from "./audios.js";
import { ThorwAnimation, bankCardAnimation, fadeInPlaceHolder } from "./amimations.js";
import { changeGameState } from "./index.js";
import { settings } from "./index.js";
import { ClearPlayerArrayAndCardsElementsAndProfilesResetElements, generatePlayers, playersArray, showPlayerCardsAnimation } from "./player.js";
import { resetNamesArray } from "./profile.js";
let endGameButtons = document.querySelectorAll(".game-page button.end")
let AudioButton = document.querySelector(".game-page button.audio")
let resultPlacholder = document.querySelector(".result-placeholer")
let gameAudioMute = false




// * Buttons Actions
endGameButtons.forEach(button => {
    button.addEventListener('click', () => {
        ClearGameToEndIt()
        changeGameState()
        // settings = {}
        resultPlacholder.style.display = 'none'
    })
})
AudioButton.addEventListener('click', () => {
    if (gameAudioMute) {
        AudioButton.style.backgroundColor = 'red'
        muteGameAudios()
        gameAudioMute = !gameAudioMute
    }
    else {
        AudioButton.style.backgroundColor = 'blue'
        unMuteGameAudios()
        gameAudioMute = !gameAudioMute
    }
})
//****************************************************************************** */



//* GamePage Main Fucntion That run every Game
export async function runGame() {
    //^ 0) bases(rec , circle) and bankCard , unobutton , exit button are made with normal html 

    //^ 1) generate gcs object depend on settings
    GameCurrentState.GenerateGCSNewProperites()

    //^ 2) generate players from player.js
    generatePlayers()


    //! setup the voices files depending on settings.lang
    //! setup the backgroundimg depending on settings.back

    //^ 4) when click ok start the game playing 
    let clickButton = await HideGameDetails()

    //^ 5) cards animation that are insdie the base > unocards-container
    let showPlayerCards = await showPlayerCardsAnimation()
    console.log('all setting are ready now start the game')



    //^ 6) checkwhoseTurn() that call itself until a win or lose senario
    await GameRunning()

    //^ 7) show the result of the game
    //! when i retunred to here from wining sernario ,,,,and click end button use  ClearGameToEndIt() show the result  await to click changeGameState()
    showGameResult()
}
//****************************************************************************** */




//* async function that run players playing (async because we are using timers and animations)
//* when a player has 0 cards ... we resolve this function then show the result
function GameRunning() {
    return new Promise(res => {
        checkWhoseTurn(res)


    })

    function checkWhoseTurn(res) {
        console.log('%c now it is player ', 'color:blue', GameCurrentState.playerTurn)
        if (playersArray.length === 0) return //^ when i exit the game 
        console.log(res)



        if (GameCurrentState.playerTurn === 0) {
            playersArray[GameCurrentState.playerTurn].userPlay()
                .catch(err => console.log(err))
                .then(() => {
                    checkToEndTheGame(res)

                })
                .catch(err => console.log(err))
        }
        else {
            playersArray[GameCurrentState.playerTurn].computerPlay()
                .catch(err => console.log(err))
                .then(() => {
                    checkToEndTheGame(res)
                })
                .catch((error) => console.log(error))
        }
    }



    function checkToEndTheGame(res) {
        console.log('%c Player is done', 'color:yellow')
        console.log('user is ', GameCurrentState.playerTurn)
        //! check wining senario ...then return
        chekckPlayerStateWining()
        if (GameCurrentState.endGame === true && playersArray[GameCurrentState.playerTurn].cardsArray.length === 0) {
            res()
        }
        else {
            //~ if current card is Stop ... 
            if (GameCurrentState.CurrentCard.value === "S") {
                GameCurrentState.UpdateGCSPlayerTurn()
            }
            GameCurrentState.UpdateGCSPlayerTurn()
            console.log('Now it is ', GameCurrentState.playerTurn)
            checkWhoseTurn(res)
        }
    }



    function chekckPlayerStateWining() {
        //~ check if player cards length === 0 end the game
        if (playersArray[GameCurrentState.playerTurn].cardsArray.length === 0) {
            GameCurrentState.endGame = true
        }
        console.log('check the error test', GameCurrentState.endGame)
    }
}





function showGameResult() {
    resultPlacholder.style.display = 'block'
    fadeInPlaceHolder(resultPlacholder)

    for (let i = 0; i <= 3; i++) {
        let player = {}
        player.cardsNumber = playersArray[i].cardsArray.length
        player.name = playersArray[i].profileObject.name
        GameCurrentState.gameResultList.push(player)
    }
    GameCurrentState.gameResultList.sort((a, b) => a.cardsNumber - b.cardsNumber)
    console.log(GameCurrentState.gameResultList)
    console.log(GameCurrentState.gameResultListElement)
    for (let i = 0; i < 4; i++) {
        GameCurrentState.gameResultListElement[i].textContent = GameCurrentState.gameResultList[i].name
    }
}




















// ^ UnderTheHood Funcitons
// ^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

export let GameCurrentState = {
    UpdateGCSPlayerTurn: function () {
        if (this.rotation === 'counterClockWise') {
            this.playerTurn++
            if (this.playerTurn === 4) {
                this.playerTurn = 0
            }
        }
        else {
            this.playerTurn--
            if (this.playerTurn === -1) {
                this.playerTurn = 3
            }
        }
    },
    ChangeGCSRotation: function () {
        if (this.rotation === 'counterClockWise') {
            this.rotation = 'clockWise'
            this.rotationElement.style.animationDirection = 'normal'
            // this.rotationElement.classList.remove("counter-clockwise")
            // this.rotationElement.classList.add("clockwise")
        }
        else {
            this.rotation = 'counterClockWise'
        this.rotationElement.style.animationDirection = 'reverse'
            // this.rotationElement.classList.add("counter-clockwise")
            // this.rotationElement.classList.remove("clockwise")
        }
    },


    IncreaseGCSACC: function (value) {
        this.Acc += value
    },
    ResetGCSACC: function () {
        this.Acc = 0
    },
    GenerateGCSNewProperites: function () {
        this.endGame = false
        this.CurrentCardElement = document.querySelector(".cards-field-container .current-card")
        this.bankCardTop = document.querySelector(".cards-field-container .bank-card-top")
        this.mode = settings.mode
        this.Acc = 0
        // playerEndPlaying :false,
        this.playerTurn = 0
        // playerTurn: Math.floor(Math.random() * 4) + 1,
        let color = ['red', 'blue', 'green', 'yellow'][Math.floor(Math.random() * 3)]
        let value = Math.floor(Math.random() * 9)

        this.CurrentCard = { color: 'blue', value: value, image: `/imgs/unocards/blue${value}-min.jpg` }
        // this.CurrentCard = { color: 'red', value: 'P2'.toString(), image: `/imgs/unocards/redP2-min.jpg` }
        // this.CurrentCard = { color: 'black', value: 'P4'.toString(), image: `/imgs/unocards/P4-min.jpg` }
        this.CurrentCardElement.style.backgroundImage = `url(${this.CurrentCard.image})`

        this.thorwedCardElement = document.querySelector(".cards-field-container .thrown-card")

        this.rotationElement = document.querySelector(".rotation-arrow")
        // this.rotationElement.classList.add('clockwise')
        // this.rotationElement.classList.remove('counter-clockwise')
        this.rotation = 'clockWise'

        this.gameResultList = []
        this.gameResultListElement = resultPlacholder.firstElementChild.nextElementSibling.children


        this.colorsPlaceholderLayer = document.querySelector(".choose-color-layer")
        this.colorsPlaceholder = document.querySelectorAll(".Choose-color .color")

        this.unoButton = document.querySelector("button.uno-button")
        // StopCardActive: false,
    },






    BankCardAnimation(cardsdNumber) {
        let NumberOfanimations = cardsdNumber
        let element = this.bankCardTop
        bankCardAnimation(element, NumberOfanimations)
        return new Promise(res => {
            setTimeout(() => {
                res()
            }, cardsdNumber * 200)

        })
        //^ must return a promise
        //! everything animation should return a promise
    },
    UpdateGCSCard: function (playercard) {
        this.CurrentCard = playercard
        this.CurrentCardElement.style.backgroundImage = `url(${playercard.image})`
    },
    ThorwCardAnimation(cardImage) {
        return new Promise(res => {
            this.thorwedCardElement.style.backgroundImage = `url(${cardImage})`
            this.thorwedCardElement.style.display = 'block'
            let element = this.thorwedCardElement
            ThorwAnimation(element)
            setTimeout(() => {
                cardAudio('throw')
                this.thorwedCardElement.style.display = 'none'
                res()
            }, 1000);

        })
    },
    clearGCSObject: function () {
        //^ delete all the properties excpect the property that is a function type
        let properties = Object.keys(this).map(prop => {
            return typeof this[prop] !== 'function' ? delete this[prop] : "ne"
        })
    },
    showColorsPlaceholder(typeee, playerCards, playerIndex) {
        return new Promise((resolve, reject) => {
            this.colorsPlaceholderLayer.style.display = 'flex'

            // //! if a player
            if (playerIndex === 0) {
                this.colorsPlaceholder.forEach(color => {
                    color.style.cursor = 'pointer'
                    console.log('showPlaceHOlder colors testttttttttttttttttttttttttttttttttt')

                    color.onclick =  () => {
                        let choosenColor = color.getAttribute('data-color')
                        this.setChoosenColor(choosenColor , typeee)
                        this.colorsPlaceholderLayer.style.display = 'none'
                        setTimeout(() => {
                            resolve()
                        }, 1000);
                    }
                })
            }


            //// ! if computer
            if (playerIndex !== 0) {
                let choosenColor = 'blue'
                this.colorsPlaceholder.forEach(color =>{
                    color.style.cursor = 'auto'
                    color.onclick = null

                })
                this.setChoosenColor(choosenColor, typeee)

                setTimeout(() => {
                    console.log('choossssssssssssssssseeeeeeeeeeennnnnnnnnnn color is reeddddd')
                    this.colorsPlaceholderLayer.style.display = 'none'
                    resolve()
                }, 2000);

            }

        })

    },
    setChoosenColor(CC, typeee) {
        console.log("test the function hereeeeeeeeeeeeeeeeeeeeeeeeeeeeee how many times its called")
        // this.colorsPlaceholder.forEach(color => console.log(color))
        this.colorsPlaceholder.forEach(color => {
            if (color.getAttribute('data-color') === CC) {
                let color1 = CC
                let value1 = typeee
                let newCard = { color: CC, value: value1, image: `/imgs/unocards/${color1}${value1}-min.jpg` }
                console.log(color1)
                console.log(value1)
                console.log(newCard)
                this.UpdateGCSCard(newCard)
                setTimeout(() => {
                    color.classList.add('choosen-color')
                }, 1000);
                setTimeout(() => {
                    color.classList.remove('choosen-color')
                }, 2000);
            }
        })
    }
}












function HideGameDetails() {
    let placeHolderButton = document.querySelector(".placeholder-details button")
    fadeInPlaceHolder(placeHolderButton.parentElement)
    return new Promise(res => {
        placeHolderButton.addEventListener("click", function () {
            this.parentElement.parentElement.style.display = 'none'
            res('done')
        })
    })
}



function ClearGameToEndIt() {
    ClearPlayerArrayAndCardsElementsAndProfilesResetElements()
    GameCurrentState.clearGCSObject()
    resetNamesArray()
    console.log('after Ending the game')
    console.log(GameCurrentState)
    console.log(playersArray)
    let placeHolder = document.querySelector(".placeholder-details")
    placeHolder.style.display = 'flex'

}
document.body.style.backgroundImage