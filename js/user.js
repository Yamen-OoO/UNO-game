import { GameCurrentState } from "./game.js";


export async function userPlay() {
    return new Promise(res => {
        this.functionsHolder(res)
    })
}

export async function functionsHolder(res) {
    console.log(this.cardsArray)
    await this.active(res)
    await this.activePlayerToPlay()
    // this.disActivePlayerToPlay()
    await this.disActive(res)
    console.log(this.cardsArray)
    console.log(this.aleratedUno)

    console.log('%c alertUno ', 'color:pink', this.aleratedUno)
    console.log('%c saiedUno ', 'color:pink', this.saiedUno)

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
                this.cardsContainerElement.style.backgroundColor = ' rgba(3, 3, 3, 0.872)'
                this.cardsNumberElement.style.backgroundColor = ' rgba(3, 3, 3, 0.872)'
            }
            let testIfColorsPlacholderShownAndUserDidntClick = window.getComputedStyle(GameCurrentState.colorsPlaceholderLayer).getPropertyValue('display')

            //if didint choose a color and tiem is up
            if (testIfColorsPlacholderShownAndUserDidntClick === 'flex') {
                GameCurrentState.colorsPlaceholderLayer.style.display = 'none'
                let typeeee = GameCurrentState.CurrentCard.value
                GameCurrentState.setChoosenColor('blue', typeeee)
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
                if (this.cardsArray.length > 2) {
                    this.saiedUno = false
                }
                this.updatePlayerBase()
                // this.activeAlertUnoFromPlayer()
                GameCurrentState.ResetGCSACC()
                this.endPlaying = true
                res()
                console.log('the New ACC is ', GameCurrentState.Acc)
            }
            else {
                this.haveABlocker = true
                //have a blocker
                this.checkToActiveUnoButton()
                let cardIndex = result.cardIndex
                let increasingValue = result.increasingValue === 4 ? 'P4' : 'P2'
                console.log(cardIndex)
                console.log(increasingValue)
                console.log('%c yeahhhh i have a blocker in ', 'color:blue', cardIndex)
                let cards = [...this.cardsContainerElement.children]
                let cardsArray = this.cardsArray
                cards.forEach((card, i) => {
                    console.log(card)
                    console.log(cardsArray[i])

                    if (cardsArray[i].value === increasingValue) {
                        console.log('%c add the eventlistner from acc = 4 ....all cards ', 'color:pink')
                        card.style.cursor = 'pointer'
                        let cardElementIndex = i
                        // card.addEventListener('click', () => {
                        //     this.checkCardCondition(cardIndex, res)
                        // })
                        card.onclick = () => {
                            this.checkCardCondition(cardElementIndex, res)
                        }
                    }
                    else {
                        console.log('hell no ...you cant throw it')
                    }
                })
            }
        }
        // if Acc ===0
        else {
            console.log('%c ACC is 0 now')
            let cards = [...this.cardsContainerElement.children]
            console.log(cards)
            console.log('cards  from activeplayertToPlay ', cards)
            this.checkToActiveUnoButton()
            this.activeBankCard(res)
            this.acivePlayerCards(res)

        }
    })
}
export function acivePlayerCards(res) {
    let cards = [...this.cardsContainerElement.children]
    cards.forEach((card, i) => {
        card.style.cursor = 'pointer'
        console.log('%c add the eventlistner from acc = 0 ....all cards ', 'color:purple')
        console.log('%c the card Array ', 'color:red', this.cardsArray)
        card.onclick = () => {
            this.checkCardCondition(i, res)
        }
    })

}
export function activeBankCard(res) {
    GameCurrentState.bankCardTop.style.cursor = 'pointer'
    GameCurrentState.bankCardTop.onclick = async (e) => {
        GameCurrentState.bankCardTop.style.cursor = 'auto'
        GameCurrentState.bankCardTop.onclick = null
        await this.addCards(1)
        if (this.cardsArray.length > 2) {
            this.saiedUno = false
        }
        this.checkToActiveUnoButton()
        this.updatePlayerBase()
        this.acivePlayerCards(res)
    }
}

export function checkToActiveUnoButton() {

    //! if i have ava cards to palyyyyyyyyyyyyy
    if (this.cardsArray.length === 3) {
        this.activeUnoButton()
    }
    else {
        this.disActiveUnoButton()
    }
}
export function activeUnoButton() {
    let unoButton = GameCurrentState.unoButton
    unoButton.style.cursor = 'pointer'
    unoButton.style.backgroundColor = 'red'
    unoButton.onclick = () => {
        this.saiedUno = true
        console.log('unooooooooooooooooooooooooooooooooooooooo')
        this.disActiveUnoButton()
    }

}
export function disActiveUnoButton() {
    let unoButton = GameCurrentState.unoButton
    unoButton.style.backgroundColor = 'black'
    unoButton.style.cursor = 'auto'
    unoButton.onclick = null
}







export function disActivePlayerToPlay() {
    let cards = [...this.cardsContainerElement.children]
    cards.forEach((card, i) => {
        console.log('%c remove eventlistner test 1', 'color:orange')
        card.style.cursor = 'auto'
        card.onclick = () => {
            return
        }
    })
    GameCurrentState.bankCardTop.style.cursor = 'auto'
    GameCurrentState.bankCardTop.onclick = null

    GameCurrentState.unoButton.style.backgroundColor = 'black'
    GameCurrentState.unoButton.style.cursor = 'auto'
    GameCurrentState.unoButton.onclick = null

}



export async function checkCardCondition(cardIndex, res) {
    if (this.endPlaying === false) {
        console.log('%c the card index ', 'color:red', cardIndex)
        // console.log('%c the card Array ', 'color:red', this.cardsArray)
        try {
            let clickedCardColor = this.cardsArray[cardIndex].color
            let clickedCardValue = this.cardsArray[cardIndex].value
            console.log('%c clicked card is  ', 'backgroundColor : red', clickedCardColor, clickedCardValue)
            if (clickedCardColor === GameCurrentState.CurrentCard.color || clickedCardValue === GameCurrentState.CurrentCard.value || clickedCardColor === 'black') {
                this.haveABlocker = false
                this.disActivePlayerToPlay()
                console.log(this.cardsArray)
                console.log('same color or value or its black card')
                this.updatePlayerBase()
                await this.thorwACard(cardIndex)
                this.updateCardsNumberElement()
                await this.checkTheCardEffect()
                this.endPlaying = true
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
    timer = setInterval(async () => {
        seconds--;
        if (seconds <= 0 || this.endPlaying === true) {
            clearInterval(timer);
            progressBar.style.display = 'none'
            let testIfColorsPlacholderShownAndUserDidntClick = window.getComputedStyle(GameCurrentState.colorsPlaceholderLayer).getPropertyValue('display')

            //if didint choose a color and tiem is up
            if (testIfColorsPlacholderShownAndUserDidntClick === 'flex') {
                GameCurrentState.colorsPlaceholderLayer.style.display = 'none'
                let typeeee = GameCurrentState.CurrentCard.value
                GameCurrentState.setChoosenColor('blue', typeeee)
            }


            if (this.cardsArray.length < 3 && this.saiedUno === false) {
                await this.addCards(2)
                this.updateCardsNumberElement()
                this.updatePlayerBase()
                console.log('you didnt say unoooooo')
            }
            

            // if didnt throw the blocker
            if(GameCurrentState.Acc !==0 && this.haveABlocker === true){
                let cardsNumber = GameCurrentState.Acc
                await this.addCards(cardsNumber)
                this.updateCardsNumberElement()
                this.updatePlayerBase()
                GameCurrentState.ResetGCSACC()
                this.haveABlocker = false
                console.log('you didnt throw the blocker')
            }
            if (this.length > 3) {
                console.log('you can not say it now ')
                this.saiedUno = false
                this.aleratedUno = false
            }
            this.disActivePlayerToPlay()
            this.disActive(res)
        } else {
            progressBar.style.transform = `rotate(${((10 - seconds) / 10) * 360}deg)`;
        }
    }, 1000);
}
