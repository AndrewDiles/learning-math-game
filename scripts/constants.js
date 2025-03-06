import rand from "./rand.js";

export const STORAGE_KEY = "math-save";

export const MAX_STEPS = 2;

export const RAINBOW_COLORS = [
  "#FF0000",
  "#FF4500",
  "#FF7F00",
  "#FFBF00",
  "#FFFF00",
  "#80FF00",
  "#00FF00",
  "#008080",
  "#0000FF",
  "#4B0082",
  "#8B00FF",
];

const fruit = [
  "🍈",
  "🥭",
  "🍍",
  "🍊",
  "🍐",
  "🍉",
  "🍇",
  "🍅",
  "🍑",
  "🍒",
  "🍌",
  "🍏",
  "🍎",
];

const getRandomFruit = () => fruit[rand(fruit.length - 1)];

export const GAME_INFO = {
  "1 2 3 fruit": {
    question: "how many",
    optionPatterns: [
      [0, -1, 2, 1],
      [2, 0, -1, 1],
      [1, -1, 0, 2],
      [-1, 2, 1, 0],
    ],
    questionGenerator: () => {
      const nameOfGame = "1 2 3 fruit";
      const answer = rand(10, 1);
      const problemContainer = document.createElement("div");
      problemContainer.classList.add("problem");
      problemContainer.style.gridTemplateColumns = `repeat(${rand(
        5,
        2
      )}, 2rem)`;

      for (let fruitNumber = 0; fruitNumber < answer; fruitNumber++) {
        const newFruit = document.createElement("span");
        newFruit.innerText = getRandomFruit();
        newFruit.classList.add("centered");
        problemContainer.appendChild(newFruit);
      }
      const optionPattern =
        GAME_INFO[nameOfGame].optionPatterns[
          rand(GAME_INFO[nameOfGame].optionPatterns.length - 1)
        ];
      const options = optionPattern.map((modifier) =>
        answer + modifier > 0 ? answer + modifier : 4
      );
      return { answer, problemContainer, options };
    },
  },
  "+ fruit": {
    question: "",
    optionPatterns: [
      [0, -1, 2, 1],
      [2, 0, -1, 1],
      [1, -1, 0, 2],
      [-1, 2, 1, 0],
    ],
    questionGenerator: () => {
      const nameOfGame = "+ fruit";
      const summand1 = rand(5, 1);
      const summand2 = rand(5, 1);
      const operand = "+";
      const answer = summand1 + summand2;
      const problemContainer = document.createElement("div");
      problemContainer.classList.add("problem");
      problemContainer.style.gridTemplateColumns = `repeat(5, 2rem)`;

      for (let fruitNumber = 0; fruitNumber < 5; fruitNumber++) {
        const newCell = document.createElement("span");
        if (fruitNumber < summand1) {
          newCell.innerText = getRandomFruit();
          newCell.classList.add("centered");
        }
        problemContainer.appendChild(newCell);
      }
      for (let cellNumber = 0; cellNumber < 5; cellNumber++) {
        const newCell = document.createElement("span");
        if (cellNumber === 2) {
          newCell.innerText = operand;
          newCell.style.scale = 2;
          newCell.classList.add("centered");
        }
        problemContainer.appendChild(newCell);
      }
      for (let fruitNumber = 0; fruitNumber < 5; fruitNumber++) {
        const newCell = document.createElement("span");
        if (fruitNumber < summand2) {
          newCell.innerText = getRandomFruit();
          newCell.classList.add("centered");
        }
        problemContainer.appendChild(newCell);
      }

      const optionPattern =
        GAME_INFO[nameOfGame].optionPatterns[
          rand(GAME_INFO[nameOfGame].optionPatterns.length - 1)
        ];
      const options = optionPattern.map((modifier) => answer + modifier);
      return { answer, problemContainer, options };
    },
  },
  "+ numbers": {
    question: null,
    optionPatterns: [
      [0, -1, 2, 1],
      [2, 0, -1, 1],
      [1, -1, 0, 2],
      [-1, 2, 1, 0],
    ],
    questionGenerator: () => {
      const nameOfGame = "+ numbers";
      const summand1 = rand(5, 0);
      const summand2 = rand(5, 0);
      const operand = "+";
      const answer = summand1 + summand2;
      const problemContainer = document.createElement("div");
      problemContainer.classList.add("centered");
      problemContainer.innerText = `${summand1} ${operand} ${summand2} = ?`;

      const optionPattern =
        GAME_INFO[nameOfGame].optionPatterns[
          rand(GAME_INFO[nameOfGame].optionPatterns.length - 1)
        ];
      const options = optionPattern.map((modifier) => {
        return answer + modifier >= 0 ? answer + modifier : 3;
      });
      return { answer, problemContainer, options };
    },
  },
  "- fruit": {
    question: "",
    optionPatterns: [
      [0, 1, -2, -1],
      [-2, 0, 1, -1],
      [-1, 1, 0, -2],
      [1, -2, -1, 0],
    ],
    questionGenerator: () => {
      const nameOfGame = "- fruit";
      const initial = rand(10, 2);
      const reduction = rand(initial, 1);
      const answer = initial - reduction;
      console.log(initial, reduction, answer);

      const operand = "-";
      const problemContainer = document.createElement("div");
      problemContainer.classList.add("problem");
      problemContainer.style.gridTemplateColumns = `repeat(5, 2rem)`;
      for (let fruitNumber = 0; fruitNumber < 5; fruitNumber++) {
        const newCell = document.createElement("span");
        if (fruitNumber < initial) {
          newCell.innerText = getRandomFruit();
          newCell.classList.add("centered");
        }
        problemContainer.appendChild(newCell);
      }
      if (initial > 5) {
        for (let fruitNumber = 5; fruitNumber < 10; fruitNumber++) {
          const newCell = document.createElement("span");
          if (fruitNumber < initial) {
            newCell.innerText = getRandomFruit();
            newCell.classList.add("centered");
          }
          problemContainer.appendChild(newCell);
        }
      }
      for (let cellNumber = 0; cellNumber < 5; cellNumber++) {
        const newCell = document.createElement("span");
        if (cellNumber === 2) {
          newCell.innerText = operand;
          newCell.style.scale = 2;
          newCell.classList.add("centered");
        }
        problemContainer.appendChild(newCell);
      }
      for (let fruitNumber = 0; fruitNumber < 5; fruitNumber++) {
        const newCell = document.createElement("span");
        if (fruitNumber < reduction) {
          newCell.innerText = problemContainer.children[fruitNumber].innerText;
          newCell.classList.add("centered");
        }
        problemContainer.appendChild(newCell);
      }
      if (reduction > 5) {
        for (let fruitNumber = 5; fruitNumber < 10; fruitNumber++) {
          const newCell = document.createElement("span");
          if (fruitNumber < reduction) {
            newCell.innerText =
              problemContainer.children[fruitNumber].innerText;
            newCell.classList.add("centered");
          }
          problemContainer.appendChild(newCell);
        }
      }
      const optionPattern =
        GAME_INFO[nameOfGame].optionPatterns[
          rand(GAME_INFO[nameOfGame].optionPatterns.length - 1)
        ];
      const options = optionPattern.map((modifier) =>
        answer + modifier >= 0 ? answer + modifier : modifier === -2 ? 3 : 2
      );
      return { answer, problemContainer, options };
    },
  },
  "- numbers": {
    question: null,
    optionPatterns: [
      [0, 1, -2, -1],
      [-2, 0, 1, -1],
      [-1, 1, 0, -2],
      [1, -2, -1, 0],
    ],
    questionGenerator: () => {
      const nameOfGame = "- numbers";
      const initial = rand(10, 1);
      let reduction = rand(initial, 0) || rand(initial, 0); // twice to make it less likely to get 0
      const answer = initial - reduction;
      const operand = "-";
      const problemContainer = document.createElement("div");
      problemContainer.classList.add("centered");
      problemContainer.innerText = `${initial} ${operand} ${reduction} = ?`;

      const optionPattern =
        GAME_INFO[nameOfGame].optionPatterns[
          rand(GAME_INFO[nameOfGame].optionPatterns.length - 1)
        ];
      const options = optionPattern.map((modifier) =>
        answer + modifier >= 0 ? answer + modifier : modifier === -2 ? 3 : 2
      );
      return { answer, problemContainer, options };
    },
  },
};

export const GAME_NAMES = Object.keys(GAME_INFO)