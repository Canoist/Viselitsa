const _words = [
  "Чужестранец",
  "Жужжалка",
  "Прокрастинация",
  "Сватовство",
  "Парадигма",
  "Код",
  "Скороход",
  "Тринитротолуол",
  "Сверхдержава",
  "Сковорода",
  "Маятник",
  "Молоко",
  "Стремя",
  "Стрела",
  "Фуникулёр",
  "Выхухоль",
  "Медоеод",
  "Весло",
  "Лыжи",
  "Велосипед",
];

const game = document.querySelector(".game");
const gameBoard = document.querySelector(".game__board");
const gameBoardWord = document.querySelector(".game__board__word");
const gameLives = document.querySelector(".game__lives");
const modalWindow = document.querySelector(".modal__window");
const spanAll = document.querySelectorAll("span");
const inputs = document.querySelectorAll("input");
const input = inputs[0];
const btn = inputs[1];
const warning = document.querySelector(".game__board__warning");
const form = document.querySelector("form");
let difficult = null;
const regExp = /[а-яА-ЯёЁ]/;
const digitRegExp = /\d/;
let letters = new Set();

let word = "";

spanAll.forEach((element) => {
  element.addEventListener("click", (event) => {
    const { target } = event;
    difficult = target.getAttribute("id");
    if (difficult === "easy") {
      renderLives(7);
      game.style.height = `283px`;
    } else if (difficult === "normal") {
      renderLives(5);
      game.style.height = `233px`;
    } else {
      renderLives(3);
      game.style.height = `183px`;
    }
    word = getRandomWord(_words).toUpperCase();
    render();
    modalWindow.classList.add("modal__window_hidden");
  });
});

function getRandomWord(words) {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}

function render() {
  gameBoardWord.innerHTML = "";
  for (let i = 0; i < word.length; i++) {
    gameBoardWord.innerHTML += `<div class="game__board__word__letter">*</div>`;
  }
  gameBoardWord.style.width = `${20 * word.length + 5 * (word.length - 1)}px`;
}

function renderLives(lives) {
  for (let i = 0; i < lives; i++) {
    gameLives.innerHTML += `<div class="game__lives__item" id = "live_${
      i + 1
    }"></div>`;
  }
}

function removeLive() {
  const lives = document.querySelectorAll(".game__lives__item");
  const lastLive = document.querySelector("#live_1");
  if (lives.length == 2) {
    lastLive.classList.add("animation");
  }
  if (lives.length === 1) {
    alert("Вы проиграли!");
    lastLive.classList.remove("animation");
    modalWindow.classList.remove("modal__window_hidden");
    letters = new Set();
  } else {
    lives[lives.length - 1].remove();
  }
}

function showLetter(letter) {
  const lettersWord = gameBoardWord.querySelectorAll(
    ".game__board__word__letter"
  );
  const lastLive = document.querySelector("#live_1");
  let position = -1;
  const completedLetters = [];

  while ((position = word.indexOf(letter, position + 1)) != -1) {
    lettersWord[position].textContent = word[position];
  }

  for (let i = 0; i < lettersWord.length; i++) {
    if (lettersWord[i].textContent !== "*") {
      completedLetters.push(lettersWord[i].textContent);
    }
  }

  if (word.length === completedLetters.length) {
    setTimeout(() => {
      alert(`Вы выиграли, слово - ${word}`);
      modalWindow.classList.remove("modal__window_hidden");
      lastLive.classList.remove("animation");
      letters = new Set();
    }, 100);
  }
}

function submit(value) {
  value = value.trim().toUpperCase();
  if (!letters.has(value)) {
    letters.add(value);
    warning.textContent = "";
    btn.removeAttribute("disabled");
  } else {
    warning.textContent = "Данный символ уже был введен";
  }
  if (regExp.test(value)) {
    word.indexOf(value) !== -1 ? showLetter(value) : removeLive();
  }
  input.value = "";
}

input.addEventListener("onChange", (event) => {
  const { target } = event;
  value = target.value.trim();
  if (value.length >= 1 && digitRegExp.test(Number(value))) {
    console.log("number");
    warning.textContent = "Цифр в слове точно нет";
    btn.setAttribute("disabled", true);
  } else if (value.length > 1) {
    console.log("value>1");
    warning.textContent = "В поле ввода должен быть всего один символ";
    btn.setAttribute("disabled", true);
  }
});

btn.addEventListener("click", (event) => {
  event.preventDefault();
  submit(input.value);
});
