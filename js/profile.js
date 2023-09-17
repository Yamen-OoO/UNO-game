let names = ['amman', 'hadi', 'kareem', 'krystal', 'lana', 'majd', 'nazzeh', 'noor', 'samira', 'sima', 'tala', 'tony', 'yamen', 'zina']
// let gamecontainer = document.querySelector(".game-container")

let player1CardsContainer = document.querySelector(".player-one .unocards-container")
let player2CardsContainer = document.querySelector(".player-tow .unocards-container")
let player3CardsContainer = document.querySelector(".player-three .unocards-container")
let player4CardsContainer = document.querySelector(".player-four .unocards-container")
let playersUnoContainers = [player1CardsContainer, player2CardsContainer, player3CardsContainer, player4CardsContainer]





//* generate profile Object and return it , change profile html element
export function generatePlayerProfile(containerIndex) {
    let name = names[Math.floor(Math.random() * names.length)]
    let profileObject = {
        name: name,
        image: `/imgs/playersimgs/${name}.jpg`
    }
    UpdateProfileElements()
    function UpdateProfileElements(){
        let profileImage = playersUnoContainers[containerIndex].nextElementSibling.firstElementChild.lastElementChild
        profileImage.src = profileObject.image
        let profileName = playersUnoContainers[containerIndex].nextElementSibling.lastElementChild
        profileName.textContent = profileObject.name
    }
    return profileObject

}



