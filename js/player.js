import { hidePlayerCards, showPlayerCards } from "./amimations.js"
import { generatePlayerProfile } from "./profile.js"
import { GoDownAnimation, apendCards, fixLeftMargin, generatePlayerCards } from "./cards.js"
import { GameCurrentState } from "./game.js"
import { Speack, cardAudio } from "./audios.js"
import * as ComputerMethodes from './computer.js'
import * as UserMehtodes from './user.js'
export let playersArray = []

let player1CardsContainer = document.querySelector(".player-one .unocards-container")
let player2CardsContainer = document.querySelector(".player-tow .unocards-container")
let player3CardsContainer = document.querySelector(".player-three .unocards-container")
let player4CardsContainer = document.querySelector(".player-four .unocards-container")
let playersUnoContainers = [player1CardsContainer, player2CardsContainer, player3CardsContainer, player4CardsContainer]







//^ profile elment is a sibiling to unocontainer of each player
export class Player {
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

    async checkTheCardEffect() {
        let newCardValue = GameCurrentState.CurrentCard.value
        if (newCardValue === 'R') {
            console.log('Revverssee')
            GameCurrentState.ChangeGCSRotation()
        }
        else if (newCardValue === "P4") {
            console.log('Acc + 4')
            GameCurrentState.IncreaseGCSACC(4)
            await GameCurrentState.showColorsPlaceholder('P4', '', this.index)
        }
        else if (newCardValue === "P2") {
            console.log('Acc + 2')
            GameCurrentState.IncreaseGCSACC(2)
        }
        else if (newCardValue === "S") {
            //~ UpdagtePlayerTrun after i check the wining state in chekckPlayerStateWining (game.js)
            console.log('Stop the next player')
        }
        else if (newCardValue === 'colors') {
            console.log('change colorrrr')
            // update colors card img to dynamic color
            // GameCurrentState.CurrentCard.color = 'red'
            await GameCurrentState.showColorsPlaceholder('colors', '', this.index)
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
        cardAudio('godown')
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


}



class Computer extends Player {
    constructor(one, tow, three, four, five) {
        super(one, tow, three, four, five)
    }
    computerPlay() {
        return ComputerMethodes.computerPlay.call(this)
    }
    active() {
        return ComputerMethodes.active.call(this)
    }
    disActive() {
        return ComputerMethodes.disActive.call(this)
    }
    startTimer() {
        return ComputerMethodes.startTimer.call(this)
    }
    think() {
        return ComputerMethodes.think.call(this)
    }
}







class User extends Player {
    constructor(one, tow, three, four, five) {
        super(one, tow, three, four, five)
    }
    userPlay(){
        return UserMehtodes.userPlay.call(this)
    }
    functionsHolder(res){
        return UserMehtodes.functionsHolder.call(this , res)
    }
    active(res){
        return UserMehtodes.active.call(this , res)
    }
    disActive(res){
        return UserMehtodes.disActive.call(this , res)
    }
    startTimer(res){
        return UserMehtodes.startTimer.call(this , res)
    }
    activePlayerToPlay(){
        return UserMehtodes.activePlayerToPlay.call(this)
    }
    checkCardCondition(cardindex , res){
        return UserMehtodes.checkCardCondition.call(this , cardindex , res)
    }
    disActivePlayerToPlay(){
        return UserMehtodes.disActivePlayerToPlay.call(this)
    }

}




















Computer



export function generatePlayers() {
    for (let i = 0; i <= 3; i++) {
        let cardsArray = generatePlayerCards(i)
        let playerProfile = generatePlayerProfile(i)
        if (i === 0) {
            playersArray.push(new User(playerProfile, playersUnoContainers[i].nextElementSibling, cardsArray, playersUnoContainers[i], i))
            console.log(playersArray[0])
        }else{
            playersArray.push(new Computer(playerProfile, playersUnoContainers[i].nextElementSibling, cardsArray, playersUnoContainers[i], i))
        }
    }
    console.log(playersArray)
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
