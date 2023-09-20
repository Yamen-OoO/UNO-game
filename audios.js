let language = 'arabic'


export function setLanguage(lan){
    language = lan
}




// ~~```~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~```
let audios = {
    P4: [7,16],
    P2: [6,16] , 
    R : [13],
    S : [8,16],
    uno:[15],
    Blocker: [2,4,10,10,10,12,22],
    NoBlocker: [3,5,16,23],
    Normal :[11,12,14,16,17,18,20]

}

let speackingObj = new Audio()
speackingObj.volume = .5

export function Speack(typeee){
    let sayItOrNot = Math.floor(Math.random() * 10)
    if(sayItOrNot < 2){
        console.log('dont say it')
        return
    }else{
        let sentence = audios[typeee][Math.floor(Math.random() * audios[typeee].length)]
        // console.log('say', sentence)
        speackingObj.src = `/audio/${language}/${sentence}.mp3`
        speackingObj.muted = false
        speackingObj.play()

    }
}
window.onload = function(){
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~``

let cardObj = new Audio()
cardObj.volume = .5

export function cardAudio(movment){
    cardObj.src = `/audio/other/${movment}`
    cardObj.play()
}



// ~~```~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~```
let bakcgroundMusic = new Audio()
bakcgroundMusic.volume = .5

export function playMusic(page){
    bakcgroundMusic.src = `/audio/music/${page}`
    bakcgroundMusic.play()
    bakcgroundMusic.loop = true
}


export function muteGameAudios(){
    bakcgroundMusic.volume = 0
    cardObj.volume = 0
    speackingObj.volume = 0
}
export function unMuteGameAudios(){
    bakcgroundMusic.volume = .5
    cardObj.volume = .5
    speackingObj.volume = .5
}