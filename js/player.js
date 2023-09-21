import { hidePlayerCards, showPlayerCards } from "./amimations.js"
import { generatePlayerProfile } from "./profile.js"
import { GoDownAnimation, apendCards, fixLeftMargin, generatePlayerCards } from "./cards.js"
import { GameCurrentState } from "./game.js"
import { Speack } from "../audios.js"
export let playersArray = []

let player1CardsContainer = document.querySelector(".player-one .unocards-container")
let player2CardsContainer = document.querySelector(".player-tow .unocards-container")
let player3CardsContainer = document.querySelector(".player-three .unocards-container")
let player4CardsContainer = document.querySelector(".player-four .unocards-container")
let playersUnoContainers = [player1CardsContainer, player2CardsContainer, player3CardsContainer, player4CardsContainer]







//^ profile elment is a sibiling to unocontainer of each player
class Player {
    thinkingTime = 5000
    aleratedUno = false
    endPlaying = false // used to stop the timer
    constructor(profileObject, profileElemet, cardsArray, cardsContainer, i) {
        this.profileObject = profileObject
        this.profileElement = profileElemet
        this.cardsArray = cardsArray
        this.cardsContainerElement = cardsContainer
        this.index = i
        this.cardsNumberElement = profileElemet.firstElementChild.nextElementSibling
        // this.playerSign = profileElemet.nextElementSibling
    }

    //!=========== Computer Main function =============
    async computerPlay() {
        await this.active()
        await this.think()
        this.endPlaying = true
        await this.disActive()
        this.endPlaying = false
        console.log('player left cards' , this.cardsArray.length)
    }





    active(res) {
        return new Promise(res => {
            setTimeout(() => {
                if (this.aleratedUno === true) {
                    this.cardsContainerElement.style.backgroundColor = 'gold'
                    this.cardsNumberElement.style.backgroundColor = 'gold'
                } else {
                    this.cardsContainerElement.style.backgroundColor = 'blue'
                    this.cardsNumberElement.style.backgroundColor = 'blue'

                }
                this.startTimer(res)
                res()
            }, 2000);
        })
    }
    disActive() {
        return new Promise(res => {
            setTimeout(() => {
                if (this.aleratedUno === true) {
                    this.cardsContainerElement.style.backgroundColor = 'gold'
                    this.cardsNumberElement.style.backgroundColor = 'gold'
                } else {
                    this.cardsContainerElement.style.backgroundColor = 'green'
                    this.cardsNumberElement.style.backgroundColor = 'green'
                }
                console.info(this.aleratedUno)
                res()
            }, 1000);
        })
    }
    async userPlay(res){
        return new Promise(res =>{
            this.active(res)
        })
        //check ...if Acc = 0 > wait player to play or end the game in 
    }


































    //^ computer base function
    async think() {
        // await this.computerThinkingTime()
        if (GameCurrentState.Acc !== 0) {
            console.log('acc is not 0 ,,,, so we need to find a blocker')
            let result = this.hasABlocker()
            console.log(result)
            if (result !== false) {
                let cardIndex = result.cardIndex
                let increasingValue = result.increasingValue
                this.activeAlertUnoFromPlayer()
                await this.thorwACard(cardIndex)
                this.updateCardsNumberElement()
                await this.checkTheCardEffect()
                console.log('the New ACC is ', GameCurrentState.Acc)
            }
            else {
                let ACCCCCC = GameCurrentState.Acc
                await this.addCards(ACCCCCC)
                this.updateCardsNumberElement()
                this.activeAlertUnoFromPlayer()
                GameCurrentState.ResetGCSACC()
                //! stop the player to play 
                console.log('the New ACC is ', GameCurrentState.Acc)
            }
        }
        else {
            //Acc is 0 .... check for avilabe cards
            console.log('acc is 0 .... check of availale cards')

            let choosenCardIndex = this.checkForAvailbeCards()
            if (choosenCardIndex !== false) {
                console.log('have a card')
                this.activeAlertUnoFromPlayer()
                await this.thorwACard(choosenCardIndex)
                this.updateCardsNumberElement()
                await this.checkTheCardEffect()
            }
            else {
                console.log('dont have a card add a new one')
                await this.addCards(1)
                this.updateCardsNumberElement()
                this.activeAlertUnoFromPlayer()
                let choosenCardIndex = this.checkForAvailbeCards()
                console.log(choosenCardIndex)
                if (choosenCardIndex !== false) {
                    this.activeAlertUnoFromPlayer()
                    await this.thorwACard(choosenCardIndex)
                    this.updateCardsNumberElement()
                    await this.checkTheCardEffect()
                }
                else {
                    return
                }
            }

        }
    }





    // computerThinkingTime() {
    //     let thinkingTime = 4000
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve()
    //         }, thinkingTime);
    //     })
    // }
    async checkTheCardEffect() {

        let newCardValue = GameCurrentState.CurrentCard.value
        if (newCardValue === 'R') {
            //! not working
            GameCurrentState.ChangeGCSRotation()
            console.log('Revverssee')
        }
        else if (newCardValue === "P4") {
            GameCurrentState.IncreaseGCSACC(4)
            console.log('Acc + 4')
            await GameCurrentState.showColorsPlaceholder('P4', '', this.index)
        }
        else if (newCardValue === "P2") {
            GameCurrentState.IncreaseGCSACC(2)
            console.log('Acc + 2')
        }
        else if (newCardValue === "S") {
            //~ UpdagtePlayerTrun after i check the wining state in chekckPlayerStateWining (game.js)
            console.log('Stop the next player')
        }
        else if (newCardValue === 'colors') {
            // GameCurrentState.CurrentCard.color = 'red'
            await GameCurrentState.showColorsPlaceholder('colors', '', this.index)

            console.log('change colorrrr')
            // update colors card img to dynamic color
        }
    }
    hasABlocker() {
        //p2 block it with p2 value or color
        //p4 block it with p4 value
        let blockingCard = GameCurrentState.CurrentCard
        let blockingCardsIndexs = this.cardsArray.map(card => {
            return (blockingCard.color === 'black' && card.value === blockingCard.value) || (card.value === blockingCard.value) ? 'true' : ''
        })
        console.log(blockingCardsIndexs)
        return blockingCardsIndexs.includes('true') ? { cardIndex: blockingCardsIndexs.indexOf('true'), increasingValue: blockingCard.value === "P4" ? 4 : 2 } : false
    }

    checkForAvailbeCards() {
        let currentCard = GameCurrentState.CurrentCard
        let availaleCardsIndexArray = this.cardsArray.map(card => {
            return card.color === currentCard.color || card.value === currentCard.value || card.color === 'black' ? 'true' : ''
        })
        console.log(availaleCardsIndexArray)
        return availaleCardsIndexArray.includes('true') ? availaleCardsIndexArray.indexOf('true') : false
    }





    //^ takes cards number to add
    async addCards(cardsNumber) {
        await GameCurrentState.BankCardAnimation(cardsNumber)
        await apendCards(this.cardsArray, cardsNumber, this.index)
    }


    //^ takes index of played card
    async thorwACard(cardindex) {
        //! before throwing the the third card

        let cardIndex = cardindex
        let card = this.cardsArray[cardIndex]
        let cardImage = this.cardsArray[cardIndex].image
        await GoDownAnimation(cardIndex, this.index)
        this.removeCardFromArray(cardindex)
        await GameCurrentState.ThorwCardAnimation(cardImage)
        GameCurrentState.UpdateGCSCard(card)
    }


    removeCardFromArray(cardindex) {
        this.cardsArray.splice(cardindex, 1)
    }



    activeAlertUnoFromPlayer() {
        if (this.cardsArray.length === 3 && this.aleratedUno === false) {
            console.log(this.cardsArray.length, 'cards leftttttttttttttttttttttttttttttttttttttt before thrwing')
            this.aleratedUno = true
            console.log('unoooooooooooooooooooooooooooooooooooooooooooooooo')
            this.cardsContainerElement.classList.add('wining-base-shadow')
            this.cardsContainerElement.style.backgroundColor = 'gold'
            this.cardsNumberElement.style.backgroundColor = 'gold'
            //! audio in here to say unoooo
            //! change base color to gold
            //! add moving shadow
        } else if (this.cardsArray.length < 3 && this.aleratedUno === true) {
            this.cardsContainerElement.style.backgroundColor = 'gold'
            this.cardsNumberElement.style.backgroundColor = 'gold'
        }
        else if (this.cardsArray.length > 2 && this.aleratedUno === true) {
            console.log(this.cardsArray.length, 'cards leftttttttttttttttttttttttttttt')
            this.aleratedUno = false
            this.cardsContainerElement.classList.remove('wining-base-shadow')
            this.cardsContainerElement.style.backgroundColor = 'blue'
            //! change base color to default
            //! remove moving shadow
        }
    }
    updateCardsNumberElement() {
        this.cardsNumberElement.textContent = this.cardsArray.length
    }







    startTimer(res) {
        let progressBar = this.cardsContainerElement.nextElementSibling.firstElementChild.firstElementChild
        progressBar.style.display = 'block'
        let seconds = 10;
        let timer
        clearInterval(timer);
        progressBar.style.transform = "rotate(0deg)";
        timer = setInterval(() => {
            // console.log(this.endPlaying)
            seconds--;
            if (seconds <= 0 || this.endPlaying === true) {
                clearInterval(timer);
                progressBar.style.display = 'none'
            } else {
                progressBar.style.transform = `rotate(${((10 - seconds) / 10) * 360}deg)`;
            }
        }, 1000);

    }
}







































export function generatePlayers() {
    for (let i = 0; i <= 3; i++) {
        let cardsArray = generatePlayerCards(i)
        let playerProfile = generatePlayerProfile(i)
        playersArray.push(new Player(playerProfile, playersUnoContainers[i].nextElementSibling, cardsArray, playersUnoContainers[i], i))
    }
    // playersArray[0].userPlay = function(){
    //     console.log('this is userplayfunction')
    // }
}






export function showPlayerCardsAnimation() {
    return new Promise((res) => {
        let animationsTime = 3000
        for (let i = 0; i <= 3; i++) {
            let styleProperty
            let unocontainer = playersUnoContainers[i]
            if (i === 2) {
                // styleProperty = 'top'
                showPlayerCards(unocontainer, 'top')
            }
            else {
                // styleProperty = 'bottom'
                showPlayerCards(unocontainer, 'bottom')
            }
            // showPlayerCards(unocontainer ,styleProperty )
        }
        setTimeout(() => {
            res()
        }, animationsTime);
    })
}


export function ClearPlayerArrayAndCardsElementsAndProfilesResetElements() {
    //! clear elements
    for (let i = 0; i <= 3; i++) {
        playersArray[i].cardsContainerElement.classList.remove("wining-base-shadow")
        playersArray[i].cardsContainerElement.style.backgroundColor = 'green'
        playersArray[i].cardsNumberElement.style.backgroundColor = 'green'
        playersArray[i].cardsNumberElement.textContent = '7'
        playersUnoContainers[i].innerHTML = null
        let container = playersUnoContainers[i]
        if (i === 2) {
            hidePlayerCards(container, 'top')
        }
        else {
            hidePlayerCards(container, 'bottom')
        }
        playersUnoContainers[i].nextElementSibling.firstElementChild.lastElementChild.src = ''
        playersUnoContainers[i].nextElementSibling.lastElementChild.textContent = '__'
    }
        playersArray.length = 0
}
