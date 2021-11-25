const words = ['Чужестранец', 'Жужжалка', 'Прокрастинация', 'Сватовство', 'Парадигма', 'Код', 'Скороход'];

const gameBoard = document.querySelector('.game__board')
const gameLifes = document.querySelector('.game__lifes')

const modalWindow = document.querySelector('.modal__window')
modalWindow.addEventListener('click', (event) => {
   const { target } = event;
   console.log(target);
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
      gameLifes.innerHTML += `<div class="game__lives__item" id = "live_${i + 1}"></div>`
   }
}

renderLives(4)