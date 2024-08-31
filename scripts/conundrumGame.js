const generateButton = document.querySelector('.conundrum-generate-button')
const conundrumResetButton = document.querySelector('.conundrum-reset-button')
const conundrumTimer = document.querySelector('.conundrum-timer')
const conundrumBoxesList = document.querySelectorAll('.conundrum-box')
const conundrumBoxes = Array.from(conundrumBoxesList)

let conundrumPlaying = false
let currentConundrum = []
let answer = ''
let nineLetterWordList = []


fetch('textFiles/nineLetterWordList.txt')
  .then(response => response.text())
  .then(text => {
    nineLetterWordList = text.split(/\r?\n/);
  })
  .catch(error => {
    console.error('Error fetching the file:', error);
  });

function checkGenerateOrReveal() {
  if (generateButton.textContent === 'Generate') {
    GenerateConundrum()
  } else {
    revealConundrum()
  }
}

function GenerateConundrum () {
  resetConundrum()
  countdownMusic.play()
  index = Math.ceil(Math.random() * (nineLetterWordList.length -1))
  answer = nineLetterWordList[index]
  nineLetterWordList.splice(index, 1)

  let selectedNineLetterWordArray = Array.from(answer)
  currentConundrum = shuffleArray(selectedNineLetterWordArray)
  conundrumPlay()
}

function conundrumPlay() {
  let timeLeft = 30
  const timerElement = document.querySelector('.conundrum-time-left')
  conundrumPlaying = true


  const countdown = setInterval(() => {
    if (conundrumPlaying) {
      timeLeft--
      timerElement.innerHTML = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(countdown)
        timerElement.textContent = '0'
        conundrumResetButton.innerHTML = 'New Game'
        conundrumPlaying = false

      }
    } else {
      clearInterval(countdown)
      timerElement.textContent = '30'
      conundrumResetButton.innerHTML = 'Reset'
    }
  }, 1000)

  generateButton.textContent = 'Reveal'

  currentConundrum.forEach((letter) => {
    for(let i = 0; i < currentConundrum.length; i++){
      if (conundrumBoxes[i].innerHTML === ''){
        conundrumBoxes[i].innerHTML = letter
        break
      }
    }
    })
}

function revealConundrum() {
  conundrumPlaying = false
  countdownMusic.load()
  generateButton.textContent = 'Generate'
  answerArr = Array.from(answer)

  conundrumBoxes.forEach((box) => {
    box.innerHTML = ''
  })

  answerArr.forEach((letter) => {
    for(let i = 0; i < conundrumBoxes.length; i++) {
      if (conundrumBoxes[i].innerHTML === ''){
        conundrumBoxes[i].innerHTML = letter
        break
      }
    } 
  })

  conundrumTimer.innerHTML = answer.toUpperCase()
}

function resetConundrum() {
  conundrumPlaying = false
  conundrumTimer.innerHTML = 'TIME LEFT: <span class="conundrum-time-left">30</span> seconds'
  const timerElement = document.querySelector('.conundrum-time-left')
  timerElement.innerHTML = '30'
  conundrumBoxes.forEach((box) => box.innerHTML = '')
  currentConundrum = []
  answer = ''
  generateButton.innerHTML = 'Generate'
  countdownMusic.load()
}

// Fisher-Yates (Knuth) Shuffle Algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Event Listner
generateButton.addEventListener('click', () => {
  checkGenerateOrReveal()
})

conundrumResetButton.addEventListener('click', () => {
  resetConundrum()
})
