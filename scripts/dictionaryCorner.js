const validWordInput = document.querySelector('.valid-word-input')
const longestWordDisplay = document.querySelector('.best-word-display')
const findBestWordsButton = document.querySelector('.find-best-words-button')
const dictCornerContainer = document.querySelector('.dict-corner-container')

let wordList = []
const longestWordsOrdered = []

fetch('textFiles/wordList.txt')
  .then(response => response.text())
  .then(text => {
    wordList = text.split(/\r?\n/);
  })
  .catch(error => {
    console.error('Error fetching the file:', error);
  });


async function checkWordAndGetDefinition(word) {
  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  const validWordDefinition = document.querySelector('.valid-word-definition')
  validWordDefinition.innerHTML = ''
  
  try {
      let response = await fetch(apiUrl);
      if (response.ok) {
          let data = await response.json();

          let definitionsArray = [] //create an array with definitions
          data[0].meanings.forEach((meaning, index) => {
              definitionsArray.push(`${index + 1}. (${meaning.partOfSpeech}) ${meaning.definitions[0].definition}`);
          });

          //display definitions
          definitionsArray.forEach(definition => {
            let definitionParagraph = document.createElement('div')
            definitionParagraph.className = 'definition-element'
            definitionParagraph.textContent = definition;
            validWordDefinition.appendChild(definitionParagraph)
          })
      } else {

        if (word === '') {
          validWordDefinition.innerHTML = '<div class="definition-element">Input word to check</div>'
        } else {
          let unfoundMessage = document.createElement('div')
          unfoundMessage.className = 'definition-element'
          unfoundMessage.textContent = `The word "${word}" is not a valid English word.`
          validWordDefinition.appendChild(unfoundMessage)
        }
      }
  } catch (error) {
      validWordDefinition.innerHTML = "There was an error fetching the word data:", error;
  }
}

function findLongestWords(words, letters) {

  if (currentLetters.length === 9 && wordPlaying === false) {
    // Helper function to check if a word can be formed with the given letters
    function canFormWord(word, letterArray) {
      let letterCount = {};
      
      // Count occurrences of each letter in letterArray
      for (let letter of letterArray) {
          letterCount[letter] = (letterCount[letter] || 0) + 1;
      }
      
      // Check if each letter in the word can be matched with available letters
      for (let letter of word) {
          if (!letterCount[letter] || letterCount[letter] <= 0) {
              return false; // Cannot form word
          }
          letterCount[letter]--;
      }
      return true; // Can form word
    }

    // Filter valid words that can be formed with the given letters
    let validWords = words.filter(word => canFormWord(word, letters));
    // Sort words by length in descending order
    validWords.sort((a, b) => b.length - a.length);

    // Get the top 10 longest words
    const longestWordList = validWords.slice(0, 20)

    longestWordList.forEach((word, index) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    isInDict(url, word)
    })
  }
}

async function isInDict(url, word) {
  try {
    const response = await fetch(url)
    if (response.ok) {
      longestWordDisplay.innerHTML = ''
      let longestWord = document.createElement('div')
      longestWord.className = 'definition-element'
      longestWord.textContent = `${word} (${word.length})`
      longestWordsOrdered.push(longestWord)
      longestWordsOrdered.sort((a, b) => b.innerHTML.length - a.innerHTML.length)
      longestWordsOrdered.forEach((item) => {
      longestWordDisplay.appendChild(item)
      })
    } else {
    }
  } catch(error) {
  }
}

function resetDictionaryCorner(){
  const validWordDefinition = document.querySelector('.valid-word-definition')
  validWordInput.value = ''
  validWordDefinition.innerHTML = '<div class="definition-element">Input word to check</div>'
  longestWordDisplay.innerHTML = ''
  longestWordsOrdered.splice(0, longestWordsOrdered.length)
}

// Event listeners
validWordInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    checkWordAndGetDefinition(validWordInput.value)
  }
})

findBestWordsButton.addEventListener('click', () => {
  findLongestWords(wordList, currentLetters)
})
