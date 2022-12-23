const typingText = document.querySelector('.typing-text p')
const inpField = document.querySelector('.container .input-field')
const timeTag = document.querySelector('.timer span b')
const mistakeTag = document.querySelector('.mistake span')
const wpmTag = document.querySelector('.wpm span')
const cpmTag = document.querySelector('.cpm span')
const reTry = document.querySelector('button')

let timer
let maxTime = 60
let timeLeft = maxTime

let charIndex = 0
let mistakes = 0
let isTyping = 0

function randomText() {
    let randIndex = Math.floor(Math.random() * texts.length)
    typingText.innerHTML = ''
    texts[randIndex].split('').forEach(span => {
        let spanTag = `<span>${span}</span>`
        typingText.innerHTML += spanTag
    })

    typingText.querySelectorAll('span')[0].classList.add('active')
    document.addEventListener('keydown', () => inpField.focus())
    document.addEventListener('click', () => inpField.focus())
}

function initTyping() {
    const characters = typingText.querySelectorAll('span')
    let typedChar = inpField.value.split('')[charIndex]
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000)
            isTyping = true
        }
        if (typedChar == null) {
            charIndex--
            if (characters[charIndex].classList.contains('incorrect')) {
                mistakes--
            }
            characters[charIndex].classList.remove('correct', 'incorrect')
        } else {
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add('correct')
                    // console.log('correct')
            } else {
                mistakes++
                characters[charIndex].classList.add('incorrect')
                    // console.log('incorrect')
            }
            charIndex++
        }
        characters.forEach(span => span.classList.remove('active'))
        characters[charIndex].classList.add('active')

        mistakeTag.innerText = mistakes

        let wpm = Math.round(
            ((charIndex - mistakes) / 5 / (maxTime - timeLeft)) * 60
        )
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm
        wpmTag.innerText = wpm

        cpmTag.innerText = charIndex - mistakes
    } else {
        inpField.value = ''
        clearInterval(timer)
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--
        timeTag.innerText = timeLeft
    } else {
        clearInterval(timer)
    }
}

function resetTest() {
    randomText()
    inpField.value = ''
    clearInterval(timer)
    timeLeft = maxTime
    charIndex = mistakes = isTyping = 0
    timeTag.innerText = timeLeft
    mistakeTag.innerText = mistakes
    wpmTag.innerText = 0
    cpmTag.innerText = 0
}

randomText()
inpField.addEventListener('input', initTyping)
reTry.addEventListener('click', resetTest)