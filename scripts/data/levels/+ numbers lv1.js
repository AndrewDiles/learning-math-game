// + numbers lv1
import rand from "../../helpers/rand.js";

const level = {
  question: null,
  optionPatterns: [
    [0, -1, 2, 1],
    [2, 0, -1, 1],
    [1, -1, 0, 2],
    [-1, 2, 1, 0],
  ],
  questionGenerator: () => {
    const summand1 = rand(5, 0);
    const summand2 = rand(5, 0);
    const operand = "+";
    const answer = summand1 + summand2;
    const problemContainer = document.createElement("p");
    problemContainer.classList.add("centered");
    problemContainer.innerText = `${summand1} ${operand} ${summand2} = ?`;

    const optionPattern =
      level.optionPatterns[rand(level.optionPatterns.length - 1)];
    const options = optionPattern.map((modifier) => {
      return answer + modifier >= 0 ? answer + modifier : 3;
    });
    return {
      answer,
      problemContainer,
      options,
      query: summand1 + operand + summand2,
    };
  },
};

export default level;
