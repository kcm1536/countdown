const vowelButton = document.querySelector('.vowel-button')
const consonantButton = document.querySelector('.consonant-button')
const wordResetButton = document.querySelector('.word-reset-button')
const letterBoxesList = document.querySelectorAll('.letter-box')
const letterBoxes = Array.from(letterBoxesList)

const currentLetters = []
const gameVowels = vowels.slice()
const gameConsonants = consonants.slice()
let vowelCount = 0
let consonantCount = 0
let wordPlaying = false

function pickVowel () {
  const index = Math.ceil(Math.random() * (gameVowels.length - 1))
  let selectedVowel

  if (gameVowels.length > 9) {
    selectedVowel = gameVowels[index]
    gameVowels.splice(index, 1)
    vowelCount++
    currentLetters.push(selectedVowel.toLowerCase())
    letterCountChecker()
  } else {
    gameVowels = vowels.slice()
    selectedVowel = gameVowels[index]
    gameVowels.splice(index, 1)
    vowelCount++
    currentLetters.push(selectedVowel.toLowerCase())
    letterCountChecker()
  }

  for(let i = 0; i < letterBoxes.length; i++){
    if (letterBoxes[i].innerHTML === ''){
      letterBoxes[i].innerHTML = selectedVowel
      checkWordReady()
      break
    } 
  }
}

function pickConsonant () {
  const index = Math.ceil(Math.random() * (gameConsonants.length - 1))
  let selectedConsonant

  if (gameConsonants.length > 9) {
    selectedConsonant = gameConsonants[index]
    gameConsonants.splice(index, 1)
    consonantCount++
    currentLetters.push(selectedConsonant.toLowerCase())
    letterCountChecker()
  } else {
    gameConsonants = consonants.slice()
    selectedConsonant = gameConsonants[index]
    gameConsonants.splice(index, 1)
    consonantCount++
    currentLetters.push(selectedConsonant.toLowerCase())
    letterCountChecker()
  }

  for(let i = 0; i < letterBoxes.length; i++){
    if (letterBoxes[i].innerHTML === ''){
      letterBoxes[i].innerHTML = selectedConsonant
      checkWordReady()
      break
    } 
  }
}

function letterCountChecker() {
  if (vowelCount >= 5) {
    vowelButton.disabled = true;
  } else {
    vowelButton.disabled = false;
  }

  if (consonantCount >= 6) {
    consonantButton.disabled = true;
  } else {
    consonantButton.disabled = false;
  }
}

function wordReset() {
  wordPlaying = false
  wordResetButton.innerHTML = 'Reset'
  const timerElement = document.querySelector('.word-time-left')
  timerElement.innerHTML = '30'
  letterBoxes.forEach((box) => box.innerHTML = '')
  vowelCount = 0
  consonantCount = 0
  vowelButton.disabled = false
  consonantButton.disabled = false
  countdownMusic.load()
  resetDictionaryCorner()
  currentLetters.splice(0, currentLetters.length)
}

function checkWordReady () {
  let count = 0
  letterBoxes.forEach(function(box) {
    if (box.innerHTML !== '') {
      count++
    }
  })
  if (count === 9) {
    countdownMusic.play()
    playWordGame()
  }
}

function playWordGame () {
  let timeLeft = 30
  const timerElement = document.querySelector('.word-time-left')
  wordPlaying = true
  vowelButton.disabled = true
  consonantButton.disabled = true

  const countdown = setInterval(() => {
    if (wordPlaying) {
      timeLeft--
      timerElement.innerHTML = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(countdown)
        timerElement.textContent = '0'
        wordResetButton.innerHTML = 'New Game'
        wordPlaying = false

      }
    } else {
      clearInterval(countdown)
      timerElement.textContent = '30'
      wordResetButton.innerHTML = 'Reset'
    }
  }, 1000)
}

function toggleDictCorner() {
  if (dictCornerContainer.style.display === 'none') {
    dictCornerContainer.style.display = 'block'
  } else {
    dictCornerContainer.style.display = 'none'
  }
}

// Event Listeners
vowelButton.addEventListener('click', () => pickVowel())
consonantButton.addEventListener('click', () => pickConsonant())
wordResetButton.addEventListener('click', () => wordReset())
dictCornerButton.addEventListener('click', () => toggleDictCorner())
