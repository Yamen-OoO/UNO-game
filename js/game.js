import { ThorwAnimation, bankCardAnimation } from "./amimations.js";
import { changeGameState } from "./index.js";
import { settings } from "./index.js";
import { ClearPlayerArrayAndCardsElementsAndProfilesResetElements, generatePlayers, playersArray, showPlayerCardsAnimation } from "./player.js";


let endGameButton = document.querySelector(".game-page button#end")
endGameButton.addEventListener('click', () => {
    ClearGameToEndIt()
    changeGameState()
    // settings = {}
})


export async function runGame() {
    //!0) bases(rec , circle) and bankCard , unobutton , exit button are made be normal html 
    //!1) generate gcs object depend on settings
    GameCurrentState.GenerateGCSNewProperites()
    //! generate players from player.js
    generatePlayers()
    //! setup the voices files depending on settings.lang
    //! setup the backgroundimg depending on settings.back

    // ! when click ok start the game playing 
    let clickButton = await HideGameDetails()

    //!2) show the cards animation that are insdie the base > unocards-container
    let showPlayerCards = await showPlayerCardsAnimation()
    console.log('all setting are ready now start the game')


    // console.log(playersArray)

    //!3) checkwhoseTurn() that call it self until a win scenrio
    checkWhoseTurn()


    //! 4) when i retunred to here from wining sernario ,,,, use  ClearGameToEndIt() show the result  await to click changeGameState()


}


function checkWhoseTurn() {
    // if (GameCurrentState.playerTurn === 0) { 
    //     playersArray[GameCurrentState.playerTurn].play()
    //     .finally(() => {
    //         GameCurrentState.UpdateGCSPlayerTurn()
    //         checkWhoseTurn()
    //     })
    // }
    // else {




    console.log('%c now it is player ', 'color:blue', GameCurrentState.playerTurn)
    if (playersArray.length === 0) return //^ when i exit the game 


    playersArray[GameCurrentState.playerTurn].play()
        .catch((error) => console.log(error))
        .finally(() => {
            console.log('%c Player is done', 'color:yellow')
            GameCurrentState.UpdateGCSPlayerTurn()
            //! check wining senario ...then return
            checkWhoseTurn()
        })
    // }

}








//! when exit game .... delete all players from PlayersArray and elements , GCS with no properties



















































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
            this.rotationElement.classList.remove("counter-clockwise")
            this.rotationElement.classList.add("clockwise")
        }
        else {
            this.rotation = 'counterClockWise'
            this.rotationElement.classList.add("counter-clockwise")
            this.rotationElement.classList.remove("clockwise")
        }
    },


    IncreaseGCSACC: function (value) {
        this.Acc += value
    },
    ResetGCSACC: function () {
        this.Acc = 0
    },
    GenerateGCSNewProperites: function () {
        this.CurrentCardElement = document.querySelector(".cards-field-container .current-card")
        this.bankCardTop = document.querySelector(".cards-field-container .bank-card-top")
        this.mode = settings.mode
        this.Acc = 0
        // playerEndPlaying :false,
        this.playerTurn = 0
        // playerTurn: Math.floor(Math.random() * 4) + 1,
        let color = ['red', 'blue', 'green', 'yellow'][Math.floor(Math.random() * 3)]
        let value = Math.floor(Math.random() * 9)

        this.CurrentCard = { color: color, value: value.toString(), image: `/imgs/unocards/${color}${value}-min.jpg` }
        // this.CurrentCard = { color: 'red', value: 'P2'.toString(), image: `/imgs/unocards/redP2-min.jpg` }
        // this.CurrentCard = { color: 'black', value: 'P4'.toString(), image: `/imgs/unocards/P4-min.jpg` }
        this.CurrentCardElement.style.backgroundImage = `url(${this.CurrentCard.image})`

        this.thorwedCardElement = document.querySelector(".cards-field-container .thrown-card")

        this.rotationElement = document.querySelector(".rotation-arrow")
        console.log(this.rotationElement)
        this.rotation = 'clockWise'


        this.colorsPlaceholderLayer = document.querySelector(".choose-color-layer")
        this.colorsPlaceholder = document.querySelectorAll(".Choose-color .color")
        console.log(this.colorsPlaceholderLayer, this.colorsPlaceholder)
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
                this.thorwedCardElement.style.display = 'none'
                res()
            }, 1000);

        })
    },
    clearGCSObject: function () {
        //^ delete all the properties excpect the property that has function type
        let properties = Object.keys(this).map(prop => {
            return typeof this[prop] !== 'function' ? delete this[prop] : "ne"
        })
    },
    showColorsPlaceholder(typeee, playerCards, playerIndex) {
        return new Promise((resolve, reject) => {
            this.colorsPlaceholderLayer.style.display = 'flex'

            // //! if a player
            // if (playerIndex === 0) {
            //     colorsPlaceholder.forEach(color => {
            //         color.addEventListener('click', function () {
            //             let choosenColor = color.getAttribute('data-color')
            //             this.setChoosenColor(choosenColor)
            //             setTimeout(() => {
            //                 resolve()
            //             }, 1000);
            //         })
            //     })
            // }


            //// ! if computer
            if (playerIndex !== 10) {
                let choosenColor = 'yellow'
                this.setChoosenColor(choosenColor , typeee)

                setTimeout(() => {
                    console.log('choossssssssssssssssseeeeeeeeeeennnnnnnnnnn color is reeddddd')
                    this.colorsPlaceholderLayer.style.display = 'none'
                    resolve()
                }, 2000);

            }

        })

    },
    setChoosenColor(CC , typeee) {
        // this.colorsPlaceholder.forEach(color => console.log(color))
        this.colorsPlaceholder.forEach(color => {
            if (color.getAttribute('data-color') === CC){
                let color1 = CC 
                let value1 = typeee
                let newCard = { color: CC , value: value1, image: `/imgs/unocards/${color1}${value1}-min.jpg` }
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
    console.log('after Ending the game')
    console.log(GameCurrentState)
    console.log(playersArray)
    let placeHolder = document.querySelector(".placeholder-details")
    placeHolder.style.display = 'flex'

}
document.body.style.backgroundImage