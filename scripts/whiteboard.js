const whiteboardContainer = document.querySelector('.whiteboard-container')
const generateSolutionButton = document.querySelector('.generate-soloution')
const solutionDisplay = document.querySelector('.soloution-display')

function resetWhiteboard() {
  const solutionDisplay = document.querySelector('.soloution-display')
  solutionDisplay.innerHTML = ''
}

function closestToTarget(target, numbers) {
  let bestResult = {
      value: null,
      steps: [],
      operations: Infinity  // Track the number of operations
  };

  function findClosest(currentValue, steps, availableNumbers, operations) {
      // Check if the current result is better
      const difference = Math.abs(currentValue - target);
      const bestDifference = bestResult.value === null ? Infinity : Math.abs(bestResult.value - target);

      if (difference < bestDifference || (difference === bestDifference && operations < bestResult.operations)) {
          bestResult.value = currentValue;
          bestResult.steps = steps.slice();  // Clone the steps array
          bestResult.operations = operations;
      }

      // Recursively try using the remaining available numbers
      for (let i = 0; i < availableNumbers.length; i++) {
          const newNumbers = availableNumbers.slice();
          const currentNumber = newNumbers.splice(i, 1)[0];

          // Addition
          findClosest(currentValue + currentNumber, [...steps, `${currentValue} + ${currentNumber} = ${currentValue + currentNumber}`], newNumbers, operations + 1);

          // Subtraction (only if result is non-negative)
          if (currentValue - currentNumber >= 0) {
              findClosest(currentValue - currentNumber, [...steps, `${currentValue} - ${currentNumber} = ${currentValue - currentNumber}`], newNumbers, operations + 1);
          }

          // Multiplication (only if the result doesn't exceed the target unless we're still moving towards it)
          if (currentValue * currentNumber <= target || currentValue === 1) {
              findClosest(currentValue * currentNumber, [...steps, `${currentValue} * ${currentNumber} = ${currentValue * currentNumber}`], newNumbers, operations + 1);
          }

          // Division (only if result is a whole number and not dividing by zero)
          if (currentNumber !== 0 && currentValue % currentNumber === 0) {
              findClosest(currentValue / currentNumber, [...steps, `${currentValue} / ${currentNumber} = ${Math.floor(currentValue / currentNumber)}`], newNumbers, operations + 1);
          }
      }
  }

  // Start with each number
  for (let i = 0; i < numbers.length; i++) {
      const currentNumber = numbers[i];
      const remainingNumbers = numbers.slice();
      remainingNumbers.splice(i, 1);

      findClosest(currentNumber, [`${currentNumber}`], remainingNumbers, 0);
  }

  return bestResult;
}

function displaySoloution() { 

  if (currentNumbers.length === 6 && targetNumber !== 0 && !numberPlaying) {
    let result = closestToTarget(targetNumber, currentNumbers)

    let bestApprox = document.createElement('div')
    bestApprox.className = 'best-approx'
    bestApprox.innerHTML = result.value
    solutionDisplay.appendChild(bestApprox)
  
    result.steps.forEach((step, index) => {
      if (index !== 0){
        let stepDiv = document.createElement('div')
        stepDiv.className = 'step-div'
        stepDiv.innerHTML = step
        solutionDisplay.appendChild(stepDiv)
      }
    })
  }
}

// Event listener
generateSolutionButton.addEventListener('click', () => {
  displaySoloution()

})