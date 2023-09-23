import { GameCurrentState } from "./game.js";


export async function userPlay() {
    return new Promise(res => {
        this.functionsHolder(res)
    })
}

export async function functionsHolder(res) {
    await this.active(res)
    await this.activePlayerToPlay()
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
        this.endPlaying = true
        if (this.aleratedUno === true) {
            this.cardsContainerElement.style.backgroundColor = 'gold'
            this.cardsNumberElement.style.backgroundColor = 'gold'
        } else {
            this.cardsContainerElement.style.backgroundColor = 'green'
            this.cardsNumberElement.style.backgroundColor = 'green'
        }
        setTimeout(() => {
            this.endPlaying = false
            resolve()
            res()
        }, 1000);
    })
}







export function startTimer(res) {
    console.log(this)
    let progressBar = this.cardsContainerElement.nextElementSibling.firstElementChild.firstElementChild
    progressBar.style.display = 'block'
    let seconds = 10;
    let timer
    clearInterval(timer);
    progressBar.style.transform = "rotate(0deg)";
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

export function activePlayerToPlay() {
    return new Promise(res => {
        for (let i = this.cardsContainerElement.children.length - 1; i >= 0; i--) {
            this.cardsContainerElement.children[i].style.cursor = 'pointer'
            this.cardsContainerElement.children[i].addEventListener('click', () => {
                this.checkCardCondition(i, res)
            })
        }
    })
}


export async function checkCardCondition(cardIndex, res) {
    let clickedCard = this.cardsArray[cardIndex]
    if (clickedCard.color === GameCurrentState.CurrentCard.color || clickedCard.value === GameCurrentState.CurrentCard.value) {
        console.log('same color or value')
        await this.thorwACard(cardIndex)
        this.updateCardsNumberElement()
        await this.checkTheCardEffect()
        res()
    }
    else{
        return
    }
}
