// + fruit
import rand from "../../helpers/rand.js";
import getRandomFruit from "../../helpers/getRandomFruit.js";

const level = {
  question: null,
  optionPatterns: [
    [0, -1, 2, 1],
    [2, 0, -1, 1],
    [1, -1, 0, 2],
    [-1, 2, 1, 0],
  ],
  questionGenerator: () => {
    const summand1 = rand(5, 1);
    const summand2 = rand(5, 1);
    const operand = "+";
    const answer = summand1 + summand2;
    const problemContainer = document.createElement("div");
    problemContainer.classList.add("problem");
    problemContainer.style.gridTemplateColumns = `repeat(5, 2rem)`;
    const equation = document.createElement("p");
    equation.classList.add("centered");
    equation.innerText = `${summand1} ${operand} ${summand2} = ?`;
    equation.classList.add("full-width");
    problemContainer.appendChild(equation);
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
      level.optionPatterns[rand(level.optionPatterns.length - 1)];
    const options = optionPattern.map((modifier) => answer + modifier);
    return {
      answer,
      problemContainer,
      options,
      query: summand1 + operand + summand2,
    };
  },
};

export default level;
