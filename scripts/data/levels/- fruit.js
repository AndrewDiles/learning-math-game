// - fruit
import rand from "../../helpers/rand.js";
import getRandomFruit from "../../helpers/getRandomFruit.js";

const level = {
  question: null,
  optionPatterns: [
    [0, 1, -2, -1],
    [-2, 0, 1, -1],
    [-1, 1, 0, -2],
    [1, -2, -1, 0],
  ],
  questionGenerator: () => {
    const initial = rand(10, 2);
    const reduction = rand(initial, 1);
    const answer = initial - reduction;
    const operand = "-";
    const problemContainer = document.createElement("div");
    problemContainer.classList.add("problem");
    problemContainer.style.gridTemplateColumns = `repeat(5, 2rem)`;
    const equation = document.createElement("p");
    equation.classList.add("centered");
    equation.innerText = `${initial} ${operand} ${reduction} = ?`;
    equation.classList.add("full-width");
    problemContainer.appendChild(equation);
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
        newCell.innerText =
          problemContainer.children[fruitNumber + 1].innerText;
        newCell.classList.add("centered");
      }
      problemContainer.appendChild(newCell);
    }
    if (reduction > 5) {
      for (let fruitNumber = 5; fruitNumber < 10; fruitNumber++) {
        const newCell = document.createElement("span");
        if (fruitNumber < reduction) {
          newCell.innerText =
            problemContainer.children[fruitNumber + 1].innerText;
          newCell.classList.add("centered");
        }
        problemContainer.appendChild(newCell);
      }
    }
    const optionPattern =
      level.optionPatterns[rand(level.optionPatterns.length - 1)];
    const options = optionPattern.map((modifier) =>
      answer + modifier >= 0 ? answer + modifier : modifier === -2 ? 3 : 2
    );
    return {
      answer,
      problemContainer,
      options,
      query: initial + operand + reduction,
    };
  },
};

export default level;
