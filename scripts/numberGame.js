const smallNumberButton = document.querySelector('.small-number-button')
const bigNumberButton = document.querySelector('.big-number-button')
const numberResetButton = document.querySelector('.number-reset-button')
const targetNumberDisplay = document.querySelector('.target-number')
const numberBoxesList = document.querySelectorAll('.number-box')
const numberBoxes = Array.from(numberBoxesList)


const currentNumbers = []
let gameSmallNumbers = smallNumbers.slice()
let gameBigNumbers = bigNumbers.slice()
let bigNumberCount = 0
let numberPlaying = 0
let targetNumber = 0

function pickSmallNumber() {
  const index = Math.ceil(Math.random() * (gameSmallNumbers.length - 1))
  let selectedSmallNumber = gameSmallNumbers[index]
  gameSmallNumbers.splice(index, 1)
  currentNumbers.push(selectedSmallNumber)

  for(let i = 0; i < numberBoxes.length; i++) {
    if (numberBoxes[i].innerHTML === '') {
      numberBoxes[i].innerHTML = selectedSmallNumber
      checkNumberReady()
      break
    }
  }
}

function pickBigNumber() {
  const index = Math.ceil(Math.random() * (gameBigNumbers.length - 1))
  let selectedBigNumber = gameBigNumbers[index]
  gameBigNumbers.splice(index, 1)
  bigNumberCount++
  currentNumbers.push(selectedBigNumber)
  numberCountChecker()

  for(let i = 0; i < numberBoxes.length; i++) {
    if (numberBoxes[i].innerHTML === '') {
      numberBoxes[i].innerHTML = selectedBigNumber
      checkNumberReady()
      break
    }
  }
}

function numberCountChecker() {
  if (bigNumberCount >= 4) {
    bigNumberButton.disabled = true
  } else {
    bigNumberButton.disabled = false
  }
}

function numberReset() {
  numberPlaying = false
  numberResetButton.innerHTML = 'Reset'
  const timerElement = document.querySelector('.number-time-left')
  timerElement.innerHTML = '30'
  numberBoxes.forEach((box) => box.innerHTML = '')
  gameSmallNumbers = smallNumbers.slice()
  gameBigNumbers = bigNumbers.slice()
  bigNumberCount = 0
  smallNumberButton.disabled = false
  bigNumberButton.disabled = false
  countdownMusic.load()
  resetWhiteboard()
  currentNumbers.splice(0, currentNumbers.length)
  targetNumberDisplay.innerHTML = '000'
  targetNumber = 0
}

function checkNumberReady() {
  let count = 0
  numberBoxes.forEach((box) => {
    if (box.innerHTML !== '') {
      count++
    }
  })
  if (count === 6) {
    countdownMusic.play()
    playNumberGame()
  }
}

function playNumberGame() {
  let timeLeft = 30
  const timerElement = document.querySelector('.number-time-left')
  numberPlaying = true
  smallNumberButton.disabled = true
  bigNumberButton.disabled = true
  generateRandomNumber()

  const countdown = setInterval(() => {
    if (numberPlaying) {
      timeLeft--
      timerElement.innerHTML = timeLeft

      if (timeLeft <= 0){
        clearInterval(countdown)
        timerElement.textContent = '0'
        numberResetButton.innerHTML = 'New Game'
        numberPlaying = false
      }
    } else {
      clearInterval(countdown)
      timerElement.textContent = '30'
      numberResetButton.innerHTML = 'Reset'
    }
  }, 1000)
}

function toggleWhiteboard(){
  if (whiteboardContainer.style.display === 'none') {
    whiteboardContainer.style.display = 'block'
  } else {
    whiteboardContainer.style.display = 'none'
  }
}

function generateRandomNumber(){
  targetNumber = (Math.floor(Math.random() * 900) + 100)
  targetNumberDisplay.innerHTML = targetNumber
}


// Event listner
smallNumberButton.addEventListener('click', () => {
  pickSmallNumber()
})

bigNumberButton.addEventListener('click', () => {
  pickBigNumber()
})

numberResetButton.addEventListener('click', () => {
  numberReset()
})

whiteboardButton.addEventListener('click', () => {
  toggleWhiteboard()
})