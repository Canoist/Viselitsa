const words = ['Чужестранец', 'Жужжалка', 'Прокрастинация', 'Сватовство', 'Парадигма', 'Код', 'Скороход'];

const gameBoard = document.querySelector('.game__board')
const gameLives = document.querySelector('.game__lives')

const modalWindow = document.querySelector('.modal__window')
const ul = document.querySelector('ul')

let difficult = null;
ul.addEventListener('click', (event) => {
   const { target } = event;
   difficult = target.getAttribute('id');
   modalWindow.classList.add('modal__window_hidden')
})

function getRandomWord(words) {
   const index = Math.floor(Math.random() * words.length)
   return words[index]
}
let word = getRandomWord(words).toUpperCase()

function render() {
   for (let i = 0; i < word.length; i++) {
      gameBoard.innerHTML += `<div class="game__board__letter">${word[i]}</div>`
   }
   gameBoard.style.width = `${20 * word.length + 5 * (word.length - 1)}px`
}
render()


function renderLives(lives) {
   for (let i = 0; i < lives; i++) {
      gameLives.innerHTML += `<div class="game__lives__item" id = "live_${i + 1}"></div>`
   }
}

renderLives(4)