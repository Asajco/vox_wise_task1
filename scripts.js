// Default prizes
let prizes = ['Prize 1', 'Prize 2', 'Prize 3']

function renderPrizes() {
  const prizeList = document.getElementById('prizeList')
  prizeList.innerHTML = ''
  prizes.forEach((prize, index) => {
    const li = document.createElement('li')
    const prizeText = document.createElement('span')
    prizeText.textContent = prize
    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'X'
    deleteButton.addEventListener('click', () => {
      deletePrize(index)
    })
    li.appendChild(prizeText)
    li.appendChild(deleteButton)
    prizeList.appendChild(li)
  })
}
// Function to render the prizes on the wheel

function renderWheelPrizes() {
  const wheel = document.getElementById('wheel')
  wheel.innerHTML = ''
  const prizeCount = prizes.length
  const angle = 360 / prizeCount

  for (let i = 0; i < prizeCount; i++) {
    const wheelSection = document.createElement('div')
    wheelSection.classList.add('wheel-section')
    wheelSection.textContent = prizes[i]
    wheelSection.style.transform = `rotate(${angle * i}deg)`
    wheel.appendChild(wheelSection)
  }
}

// Spin wheel function
function spinWheel() {
  const wheel = document.getElementById('wheel')
  const spinButton = document.getElementById('spin')
  const previousResult = document.getElementById('previousResult')

  // Disable spin button during animation
  spinButton.disabled = true

  // Randomly select a prize
  const randomIndex = Math.floor(Math.random() * prizes.length)
  const selectedPrize = prizes[randomIndex]

  // Animation
  let currentRotation = 0
  const totalRotation = 1080 + randomIndex * (360 / prizes.length) // Adjust for random prize

  const rotateWheel = setInterval(() => {
    currentRotation += 5
    if (currentRotation >= totalRotation) {
      clearInterval(rotateWheel)
      spinButton.disabled = false // Enable spin button
      previousResult.textContent = `Previous Result: ${selectedPrize}` // Update previous result
    }
    wheel.style.transform = `rotate(${currentRotation}deg)`
  }, 20)
}

// Add option function
function addOption() {
  const newOption = window.prompt('Enter the new option:')
  if (newOption) {
    prizes.push(newOption)
    renderPrizes() // Re-render the sidebar
    renderWheelPrizes() // Re-render the wheel
  }
}

function deletePrize(index) {
  if (index >= 0 && index < prizes.length) {
    prizes.splice(index, 1)
    renderPrizes() // Re-render the sidebar
    renderWheelPrizes() // Re-render the wheel
  }
}

// Initialize the page
renderWheelPrizes()
renderPrizes()

// Initialize event listeners
document.getElementById('spin').addEventListener('click', spinWheel)
document.getElementById('addOption').addEventListener('click', addOption)
