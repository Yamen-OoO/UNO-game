export function showPlayerCards(container, styless) {
    let unocontainer = container
    let from = -200
    let to = 0
    if (styless === 'top') {
        var keyframes = [
            { 'top': from + "px" },
            { 'top': to + "px" },
        ]
    }
    else {
        var keyframes = [
            { 'bottom': from + 'px' },
            { 'bottom': to + 'px' }
        ];
    }

    const options = {
        duration: 500,
        // iterations: 1,
        delay: 500,
        fill: "forwards"
    };

    unocontainer.animate(keyframes, options);
    // console.log('aannniiimmmaation')
}

export function hidePlayerCards(container, styless) {
    let unocontainer = container
    let from = 0
    let to = -200
    if (styless === 'top') {
        var keyframes = [
            { 'top': from + "px" },
            { 'top': to + "px" },
        ]
    }
    else {
        var keyframes = [
            { 'bottom': from + 'px' },
            { 'bottom': to + 'px' }
        ];
    }

    const options = {
        duration: 500,
        // iterations: 1,
        delay: 500,
        fill: "forwards"
    };

    unocontainer.animate(keyframes, options);
    // console.log('aannniiimmmaation')
}

export function bankCardAnimation(element, cardNumber) {
    let bankCard = element
    let frames = [
        { 'left': '0px', 'opacity': '1' },
        { 'left': '-70px', 'opacity': '.7' },
    ]
    const options = {
        duration: 200,
        iterations: cardNumber,
    }
    bankCard.animate(frames, options)
}


export function ThorwAnimation(element) {
    let thorwedCard = element
    let frames = [
        { 'opacity': '0', 'scale': '3' },
        { 'opacity': '1', 'scale': '1' }
    ]
    const options = {
        duration: 600,
    }
    thorwedCard.animate(frames, options)
}


export function showAddedCardAnimation(element, styleee) {
    let addedCard = element
    let frames
    if (styleee === 'bottom') {
        frames = [
            { 'bottom': '-200px' },
            { 'bottom': '0px' }
        ]
    }
    else {
        frames = [
            { 'top': '-200px' },
            { 'top': '0px' },
        ]
    }
    const options = {
        duration: 500,
        iterations: 1,
        // fill: "forwards"
    }
    element.animate(frames, options)
}

export function goDownAnimation(element, styleee) {
    let addedCard = element
    let frames
    if (styleee === 'bottom') {
        frames = [
            { 'bottom': '0px' },
            { 'bottom': '-200px' }
        ]
    }
    else {
        frames = [
            { 'top': '0px' },
            { 'top': '-200px' }
        ]
    }
    const options = {
        duration: 500,
        iterations: 1,
        fill: 'forwards'
    }
    addedCard.animate(frames, options)
}

export function fadeInPlaceHolder(element) {
    let placeHolder = element
    let frames
    frames = [
        { 'left': '200px' , 'opacity':'0' },
        { 'left': '50%' , 'opacity':'1' },
    ]

    const options = {
        duration: 500,
        iterations: 1,
        fill: 'forwards'
    }
    placeHolder.animate(frames, options)
}
// !*********************************************************************************************8