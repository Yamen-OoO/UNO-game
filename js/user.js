import { GameCurrentState } from "./game.js";


export async function userPlay() {
    return new Promise(res => {
        this.functionsHolder(res)
    })
}

export async function functionsHolder(res) {
    await this.active(res)
    await this.activePlayerToPlay()
    this.disActivePlayerToPlay()
    await this.disActive(res)
}

export function active(res) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            this.endPlaying = false
            if (this.aleratedUno === true) {
                this.cardsContainerElement.style.backgroundColor = 'gold'
                this.cardsNumberElement.style.backgroundColor = 'gold'
            } else {
                this.cardsContainerElement.style.backgroundColor = 'blue'
                this.cardsNumberElement.style.backgroundColor = 'blue'
            }
            this.startTimer(res)
            resolve()
        }, 2000);
    })
}

export function disActive(res) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            this.endPlaying = true
            if (this.aleratedUno === true) {
                this.cardsContainerElement.style.backgroundColor = 'gold'
                this.cardsNumberElement.style.backgroundColor = 'gold'
            } else {
                this.cardsContainerElement.style.backgroundColor = 'green'
                this.cardsNumberElement.style.backgroundColor = 'green'
            }
            resolve()
            res()
        }, 2000);
    })
}








export function activePlayerToPlay() {
    return new Promise(async res => {
        if (GameCurrentState.Acc !== 0) {
            let result = this.hasABlocker()
            console.log(result)
            //dont have a blocker
            if (result === false) {
                console.log('%c nooo i dont have a blocker', 'color:red')
                let ACCCCCC = GameCurrentState.Acc
                await this.addCards(ACCCCCC)
                this.updateCardsNumberElement()
                // this.activeAlertUnoFromPlayer()
                GameCurrentState.ResetGCSACC()
                this.endPlaying = true
                res()
                console.log('the New ACC is ', GameCurrentState.Acc)
            }
            else {
                //have a blocker
                let cardIndex = result.cardIndex
                let increasingValue = result.increasingValue === 4 ? 'P4' : 'P2'
                console.log(cardIndex)
                console.log(increasingValue)
                console.log('%c yeahhhh i have a blocker in ', 'color:blue', cardIndex)
                let cards = [...this.cardsContainerElement.children]
                let cardsArray = this.cardsArray
                cards.forEach((card, i) => {
                    console.log(card )
                    console.log(cardsArray[i])
                    
                    if (cardsArray[i].value === increasingValue) {
                        console.log('testt 11111111111111111111111111')
                        card.style.cursor = 'pointer'
                        let cardElementIndex = i
                        card.addEventListener('click', () => {
                            this.checkCardCondition(cardIndex, res)

                        })
                    }
                    else{
                        console.log('hell no ...you cant throw it')
                    }
                })
            }
        }
        // if Acc ===0
        else {
            console.log('%c ACC is 0 now')
            let cards = [...this.cardsContainerElement.children]
            console.log('cards  from activeplayertToPlay ', cards)
            cards.forEach((card, i) => {
                card.style.cursor = 'pointer'
                // console.log('%c the card index ','color:red', i)
                console.log('%c the card Array ', 'color:red', this.cardsArray)
                card.addEventListener('click', () => {
                    this.checkCardCondition(i, res)

                })
            })
        }
    })
}
export function disActivePlayerToPlay() {
    let cards = [...this.cardsContainerElement.children]
    cards.forEach((card, i) => {
        card.style.cursor = 'auto'
        card.removeEventListener('click', () => {
            this.checkCardCondition(i, res)
        })
    })
}



export async function checkCardCondition(cardIndex, res) {
    if (this.endPlaying === false) {
        // console.log('%c the card index ', 'color:red', cardIndex)
        // console.log('%c the card Array ', 'color:red', this.cardsArray)
        try {
            let clickedCardColor = this.cardsArray[cardIndex].color
            let clickedCardValue = this.cardsArray[cardIndex].value
            if (clickedCardColor === GameCurrentState.CurrentCard.color || clickedCardValue === GameCurrentState.CurrentCard.value || clickedCardColor === 'black') {
                this.endPlaying = true
                console.log('same color or value or its black card')
                await this.thorwACard(cardIndex)
                this.updateCardsNumberElement()
                console.log(this.cardsArray)
                await this.checkTheCardEffect()
                res()
            }
            else {
                return
            }
        }
        catch (err) {
            console.log(err)
        }
    }
}



export function startTimer(res) {
    let progressBar = this.cardsContainerElement.nextElementSibling.firstElementChild.firstElementChild
    progressBar.style.display = 'block'
    let seconds = 10;
    let timer
    clearInterval(timer);
    progressBar.style.transform = "rotate(0deg)";
    // !11111111111111111111111111111
    timer = setInterval(() => {
        seconds--;
        if (seconds <= 0 || this.endPlaying === true) {
            clearInterval(timer);
            progressBar.style.display = 'none'
            this.disActive(res)
        } else {
            progressBar.style.transform = `rotate(${((10 - seconds) / 10) * 360}deg)`;
        }
    }, 1000);
}
