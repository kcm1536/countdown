const dictCornerButton = document.querySelector('.dict-corner-toggle')
const whiteboardButton = document.querySelector('.whiteboard-toggle')
const wordGameButton = document.querySelector('.word-game-button')
const numberGameButton = document.querySelector('.number-game-button')
const conundrumButton = document.querySelector('.conundrum-button')
const wordContainer = document.querySelector('.word-container')
const numberContainer = document.querySelector('.number-container')
const conundrumContainer = document.querySelector('.conundrum-container')

function swapGame(game) {

  if (game === 'word') {
    // hide number game
    if (whiteboardContainer.style.display !== 'none') {
      toggleWhiteboard()
    }
    numberReset()
    numberContainer.style.display = 'none'

    // hide conundrum game
    resetConundrum()
    conundrumContainer.style.display = 'none'

    //open word game
    if (dictCornerContainer.style.display !== 'none') {
      toggleDictCorner()
    }
    wordReset()
    wordContainer.style.display = 'flex'

    //change corner buttons so dictCorner shows
    dictCornerButton.style.display = 'flex'
    whiteboardButton.style.display = 'none'
  }

  if (game === 'number') {
    // hide word game
    if (dictCornerContainer.style.display !== 'none') {
      toggleDictCorner()
    }
    wordReset()
    wordContainer.style.display = 'none'

    // hide conundrum game
    resetConundrum()
    conundrumContainer.style.display = 'none'

    // open number game
    if (whiteboardContainer.style.display !== 'none') {
      toggleWhiteboard()
    }
    numberReset()
    numberContainer.style.display = 'flex'

    //change corner buttons so whiteboard button shows
    dictCornerButton.style.display = 'none'
    whiteboardButton.style.display = 'flex'
  }

  if (game === 'conundrum') {
    // hide word game
    if (dictCornerContainer.style.display !== 'none') {
      toggleDictCorner()
    }
    wordReset()
    wordContainer.style.display = 'none'

    // hide number game
    if (whiteboardContainer.style.display !== 'none') {
      toggleWhiteboard()
    }
    numberReset()
    numberContainer.style.display = 'none'

    // open conundrum game
    resetConundrum()
    conundrumContainer.style.display = 'flex'

    // change corner buttons so none show
    dictCornerButton.style.display = 'none'
    whiteboardButton.style.display = 'none'
  }
}


// Event Listener
wordGameButton.addEventListener('click', () => {
  swapGame('word')
})

numberGameButton.addEventListener('click', () => {
  swapGame('number')
})

conundrumButton.addEventListener('click', () => {
  swapGame('conundrum')
})