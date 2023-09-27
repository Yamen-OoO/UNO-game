import { playersArray } from "./player.js";
import { GameCurrentState } from "./game.js";




export async function computerPlay() {
    await this.active()
    await this.think()
    this.endPlaying = true
    await this.disActive()
    this.endPlaying = false
    console.log('player left cards', this.cardsArray.length)
}



export async function think() {
    if (GameCurrentState.Acc !== 0) {
        console.log('acc is not 0 ,,,, so we need to find a blocker')
        let result = this.hasABlocker()
        console.log(result)
        if (result !== false) {
            let cardIndex = result.cardIndex
            let increasingValue = result.increasingValue
            this.updatePlayerBase()
            await this.thorwACard(cardIndex)
            this.updateCardsNumberElement()
            await this.checkTheCardEffect()
            console.log('the New ACC is ', GameCurrentState.Acc)
        }
        else {
            let ACCCCCC = GameCurrentState.Acc
            await this.addCards(ACCCCCC)
            this.updateCardsNumberElement()
            this.updatePlayerBase()
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
            this.updatePlayerBase()
            await this.thorwACard(choosenCardIndex)
            this.updateCardsNumberElement()
            await this.checkTheCardEffect()
        }
        else {
            console.log('dont have a card add a new one')
            await this.addCards(1)
            this.updateCardsNumberElement()
            this.updatePlayerBase()
            let choosenCardIndex = this.checkForAvailbeCards()
            console.log(choosenCardIndex)
            if (choosenCardIndex !== false) {
                this.updatePlayerBase()
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

export function active() {
    return new Promise(res => {
        setTimeout(() => {
            if (this.aleratedUno === true) {
                this.cardsContainerElement.style.backgroundColor = 'gold'
                this.cardsNumberElement.style.backgroundColor = 'gold'
            } else {
                this.cardsContainerElement.style.backgroundColor = 'blue'
                this.cardsNumberElement.style.backgroundColor = 'blue'
            }
            this.startTimer()
            res()
        }, 2000);
    })
}
export function disActive() {
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
        }, 2000);
    })
}
export function startTimer() {
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