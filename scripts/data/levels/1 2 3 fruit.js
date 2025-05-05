// 1 2 3 fruit
import rand from "../../helpers/rand.js";
import getRandomFruit from "../../helpers/getRandomFruit.js";

const level = {
  question: "how many",
  optionPatterns: [
    [0, -1, 2, 1],
    [2, 0, -1, 1],
    [1, -1, 0, 2],
    [-1, 2, 1, 0],
  ],
  questionGenerator: () => {
    const answer = rand(10, 1);
    const problemContainer = document.createElement("div");
    problemContainer.classList.add("problem");
    problemContainer.style.gridTemplateColumns = `repeat(${rand(5, 2)}, 2rem)`;

    for (let fruitNumber = 0; fruitNumber < answer; fruitNumber++) {
      const newFruit = document.createElement("span");
      newFruit.innerText = getRandomFruit();
      newFruit.classList.add("centered");
      problemContainer.appendChild(newFruit);
    }
    const optionPattern =
      level.optionPatterns[rand(level.optionPatterns.length - 1)];
    const options = optionPattern.map((modifier) =>
      answer + modifier > 0 ? answer + modifier : 4
    );
    return { answer, problemContainer, options, query: answer };
  },
};

export default level;
