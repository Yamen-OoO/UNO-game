import { goDownAnimation, showAddedCardAnimation } from "./amimations.js"

let cardColors = ['red', 'blue', 'green', 'yellow']
let cardValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "R", "S", "P2"]
let CardBlack = ['colors', 'P4']

let player1CardsContainer = document.querySelector(".player-one .unocards-container")
let player2CardsContainer = document.querySelector(".player-tow .unocards-container")
let player3CardsContainer = document.querySelector(".player-three .unocards-container")
let player4CardsContainer = document.querySelector(".player-four .unocards-container")
let playersUnoContainers = [player1CardsContainer, player2CardsContainer, player3CardsContainer, player4CardsContainer]


class Card {
    constructor(color, value, img) {
        this.color = color,
            this.value = value,
            this.image = img
    }
}








export function generatePlayerCards(cardContainerIndex) {
    let dynamicType
    let dynamicColor
    let dynamicValue
    let cardsArray = []
    generateCardsArray()
    generateNewCardElement(cardContainerIndex)
    fixLeftMargin(cardContainerIndex)
    return cardsArray

    //^ generate 7 card object
    function generateCardsArray() {
        for (let i = 0; i <= 3; i++) {
            //^ [1-9 , S , P , R] uno card
            dynamicType = Math.floor(Math.random() * 15)
            if (dynamicType > 2) {
                dynamicColor = cardColors[Math.floor(Math.random() * cardColors.length)]
                dynamicValue = cardValues[Math.floor(Math.random() * cardValues.length)]
                cardsArray.push(new Card(dynamicColor, dynamicValue, `/imgs/unocards/${dynamicColor}${dynamicValue}-min.jpg`))
            }
            else {
                //^ P4 , colors
                dynamicValue = CardBlack[Math.floor(Math.random() * 2)]
                cardsArray.push(new Card('black', dynamicValue, `/imgs/unocards/${dynamicValue}-min.jpg`))
            }
        }
    }

    function generateNewCardElement(cardContainerIndex) {
        for (let i = 0; i <= 3; i++) {
            let card = document.createElement("div")
            card.classList.add("uno-card")
            if (cardContainerIndex === 0) {
                card.classList.add("playercard")
                card.classList.add("new-card")
                card.style.backgroundImage = `url(${cardsArray[i].image})`
            }
            else {
                card.classList.add("computercard")
                card.style.backgroundImage = `url(${cardsArray[i].image})`
                // card.style.backgroundImage = 'url("/imgs/unocards/_-min.jpeg")'
            }
            playersUnoContainers[cardContainerIndex].appendChild(card)
        }
    }

}
export function fixLeftMargin(cardContainerIndex) {
    let cardsNumber = playersUnoContainers[cardContainerIndex].children
    let leftCardMargin
    if (cardContainerIndex === 0 || cardContainerIndex === 2) {
        if (cardsNumber.length >= 25) {
            leftCardMargin = 25
        }
        else if (cardsNumber.length >= 20) {
            leftCardMargin = 30
        }
        else if (cardsNumber.length >= 15) {
            leftCardMargin = 40
        }
        else if (cardsNumber.length >= 10) {
            leftCardMargin = 55
        }
        else if (cardsNumber.length <= 10) {
            leftCardMargin = 75
        }
    }
    // ^ for cardContainer of player tow and four
    else {
        if (cardsNumber.length >= 25) {
            leftCardMargin = 15
        }
        else if (cardsNumber.length >= 20) {
            leftCardMargin = 18
        }
        else if (cardsNumber.length >= 15) {
            leftCardMargin = 25
        }
        else if (cardsNumber.length >= 10) {
            leftCardMargin = 28
        }
        else if (cardsNumber.length <= 10) {
            leftCardMargin = 40
        }
    }
    for (let i = 0; i <= cardsNumber.length - 1; i++) {
        cardsNumber[i].style.left = leftCardMargin * i + "px"
    }
    // console.log(playersUnoContainers[cardContainerIndex].children)
}














export async function apendCards(playerCardsArray, cardNumber, cardContainerIndex) {
    await generateDynamicCards(playerCardsArray, cardNumber, cardContainerIndex)
}

function generateDynamicCards(playerCardsArray, cardsNumber, cardContainerIndex) {
    return new Promise((res) => {
        let dynamicType
        for (let i = 1; i <= cardsNumber; i++) {
            let card = { color: null, value: null, img: null }
            dynamicType = Math.floor(Math.random() * 15)
            if (dynamicType > 2) {
                card.color = cardColors[Math.floor(Math.random() * cardColors.length)]
                card.value = cardValues[Math.floor(Math.random() * cardValues.length)]
                card.img = `/imgs/unocards/${card.color}${card.value}-min.jpg`
                playerCardsArray.push(new Card(card.color, card.value, card.img))
                generateNewCardElement(card.img, cardContainerIndex)
            }
            else {
                card.value = CardBlack[Math.floor(Math.random() * CardBlack.length)]
                card.img = `/imgs/unocards/${card.value}-min.jpg`
                playerCardsArray.push(new Card('black', card.value, card.img))
                generateNewCardElement(card.img, cardContainerIndex)
            }
            fixLeftMargin(cardContainerIndex)

        }


        setTimeout(() => {
            console.log('done generating animations')
            res()
        }, 2000);
    })

}
function generateNewCardElement(cardImg, cardContainerIndex) {
    let card = document.createElement("div")
    card.classList.add("uno-card")
    if (cardContainerIndex === 0) {
        card.classList.add("playercard")
        card.style.backgroundImage = `url(${cardImg})`
    }
    else {
        card.classList.add("computercard")
        card.style.backgroundImage = `url(${cardImg})`
        // card.style.backgroundImage = 'url("/imgs/unocards/_-min.jpeg")'
    }


    if (cardContainerIndex === 2) {
        playersUnoContainers[cardContainerIndex].appendChild(card)
        showAddedCardAnimation(card, 'top')
    } else {
        playersUnoContainers[cardContainerIndex].appendChild(card)
        showAddedCardAnimation(card, 'bottom')
    }
}



export function GoDownAnimation(cardIndex, cardContainerIndex) {
    return new Promise((resolve, reject) => {
        let card = playersUnoContainers[cardContainerIndex].children[cardIndex]
        if (cardContainerIndex === 2) {
            goDownAnimation(card, 'top')
        }
        else {
            goDownAnimation(card, 'bottom')
        }

        setTimeout(() => {
            card.remove()
            fixLeftMargin(cardContainerIndex)
            resolve()
        }, 1200);
    })
}