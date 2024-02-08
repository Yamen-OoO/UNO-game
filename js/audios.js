let language = 'arabic'


export function setLanguage(lan) {
    language = lan
}




// ~~```~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~```
let audios = {
    P2: [7],
    P4: [6],
    R: [13],
    S: [8],
    uno: [15],
    Blocker: [2, 10, 10, 10, 12, 14, 22],
    NoBlocker: [4, 3, 5, 16, 23],
    // Normal: [11, 12, 14, 17, 18, 20],
    Normal: [11, 12, 14, 18],

}

let speackingObj = new Audio()
speackingObj.volume = .5

export function Speack(typeee) {
    let sayItOrNot = Math.floor(Math.random() * 10)
    if (typeee === 'uno') {
        sayItOrNot = 7
    }
    if (sayItOrNot < 2) {
        console.log('dont say it')
        return
    } else {
        let sentence = audios[typeee][Math.floor(Math.random() * audios[typeee].length)]
        // console.log('say', sentence)
        speackingObj.src = `/audio/${language}/${sentence}.mp3`
        speackingObj.muted = false
        speackingObj.play()

    }
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~``

let cardObj = new Audio()
cardObj.volume = .1

export function cardAudio(movment) {
    cardObj.src = `/audio/other/${movment}.mp3`
    cardObj.play()
}



// ~~```~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~```
let bakcgroundMusic = new Audio()
bakcgroundMusic.volume = .1

export function playMusic(page) {
    bakcgroundMusic.src = `/audio/music/${page}.mp3`
    bakcgroundMusic.play()
    bakcgroundMusic.loop = true
}


export function muteGameAudios() {
    bakcgroundMusic.volume = 0
    cardObj.volume = 0
    speackingObj.volume = 0
}
export function unMuteGameAudios() {
    bakcgroundMusic.volume = .1
    cardObj.volume = .1
    speackingObj.volume = .5
}

