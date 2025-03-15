const GAME_INFO = {
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
      return { answer, problemContainer, options, query: answer };
    },
  },
  "+ fruit": {
    question: null,
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
        GAME_INFO[nameOfGame].optionPatterns[
          rand(GAME_INFO[nameOfGame].optionPatterns.length - 1)
        ];
      const options = optionPattern.map((modifier) => answer + modifier);
      return {
        answer,
        problemContainer,
        options,
        query: summand1 + operand + summand2,
      };
    },
  },
  "- fruit": {
    question: null,
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
        GAME_INFO[nameOfGame].optionPatterns[
          rand(GAME_INFO[nameOfGame].optionPatterns.length - 1)
        ];
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
  },
  "+ numbers lv1": {
    question: null,
    optionPatterns: [
      [0, -1, 2, 1],
      [2, 0, -1, 1],
      [1, -1, 0, 2],
      [-1, 2, 1, 0],
    ],
    questionGenerator: () => {
      const nameOfGame = "+ numbers lv1";
      const summand1 = rand(5, 0);
      const summand2 = rand(5, 0);
      const operand = "+";
      const answer = summand1 + summand2;
      const problemContainer = document.createElement("p");
      problemContainer.classList.add("centered");
      problemContainer.innerText = `${summand1} ${operand} ${summand2} = ?`;

      const optionPattern =
        GAME_INFO[nameOfGame].optionPatterns[
          rand(GAME_INFO[nameOfGame].optionPatterns.length - 1)
        ];
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
  },
  "+ numbers lv2": {
    question: null,
    optionPatterns: [
      [0, -1, 2, 1],
      [2, 0, -1, 1],
      [1, -1, 0, 2],
      [-1, 2, 1, 0],
    ],
    questionGenerator: () => {
      const nameOfGame = "+ numbers lv2";
      const summand1 = rand(10, 6);
      const summand2 = rand(10, 1);
      const operand = "+";
      const answer = summand1 + summand2;
      const problemContainer = document.createElement("p");
      problemContainer.classList.add("centered");
      problemContainer.innerText = `${summand1} ${operand} ${summand2} = ?`;

      const optionPattern =
        GAME_INFO[nameOfGame].optionPatterns[
          rand(GAME_INFO[nameOfGame].optionPatterns.length - 1)
        ];
      const options = optionPattern.map((modifier) => answer + modifier);
      return {
        answer,
        problemContainer,
        options,
        query: summand1 + operand + summand2,
      };
    },
  },
  "- numbers lv1": {
    question: null,
    optionPatterns: [
      [0, 1, -2, -1],
      [-2, 0, 1, -1],
      [-1, 1, 0, -2],
      [1, -2, -1, 0],
    ],
    questionGenerator: () => {
      const nameOfGame = "- numbers lv1";
      const initial = rand(10, 1);
      const reduction = rand(initial, 0) || rand(initial, 0); // twice to make it less likely to get 0
      const answer = initial - reduction;
      const operand = "-";
      const problemContainer = document.createElement("p");
      problemContainer.classList.add("centered");
      problemContainer.innerText = `${initial} ${operand} ${reduction} = ?`;

      const optionPattern =
        GAME_INFO[nameOfGame].optionPatterns[
          rand(GAME_INFO[nameOfGame].optionPatterns.length - 1)
        ];
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
  },
  "- numbers lv2": {
    question: null,
    optionPatterns: [
      [0, 1, -2, -1],
      [-2, 0, 1, -1],
      [-1, 1, 0, -2],
      [1, -2, -1, 0],
    ],
    questionGenerator: () => {
      const nameOfGame = "- numbers lv2";
      const initial = rand(20, 10);
      const reduction = rand(10, 2);
      const answer = initial - reduction;
      const operand = "-";
      const problemContainer = document.createElement("p");
      problemContainer.classList.add("centered");
      problemContainer.innerText = `${initial} ${operand} ${reduction} = ?`;

      const optionPattern =
        GAME_INFO[nameOfGame].optionPatterns[
          rand(GAME_INFO[nameOfGame].optionPatterns.length - 1)
        ];
      const options = optionPattern.map((modifier) => answer + modifier);
      return {
        answer,
        problemContainer,
        options,
        query: initial + operand + reduction,
      };
    },
  },
  "x numbers lv1": {
    question: "how many dots",
    optionPatterns: [
      [0, -1, "one", 1],
      [1, 0, -1, "one"],
      ["one", -1, 0, 1],
      [-1, 1, "one", 0],
    ],
    questionGenerator: () => {
      const nameOfGame = "x numbers lv1";
      let multiplicand = rand(5, 1);
      let multiplier = rand(5, 1);
      const operand = "x";
      const answer = multiplicand * multiplier;
      const problemContainer = document.createElement("div");
      problemContainer.classList.add("problem");
      problemContainer.style.gridTemplateColumns = `repeat(${Math.max(
        multiplicand,
        multiplier
      )}, 1fr)`;

      const equation = document.createElement("p");
      equation.classList.add("centered");
      equation.innerText = `${multiplicand} ${operand} ${multiplier} = ?`;
      equation.classList.add("full-width");
      problemContainer.appendChild(equation);

      for (let row = 1; row <= multiplier; row++) {
        for (let col = 1; col <= multiplicand; col++) {
          const newCell = document.createElement("span");
          newCell.classList.add("centered");
          newCell.innerText = "•";
          problemContainer.appendChild(newCell);
        }
      }
      const optionPattern =
        GAME_INFO[nameOfGame].optionPatterns[
          rand(GAME_INFO[nameOfGame].optionPatterns.length - 1)
        ];
      const options = optionPattern.map((modifier) => {
        if (modifier === "one") {
          if (multiplicand === 1 || multiplier === 1) {
            if (multiplicand === 1 && multiplier === 1) {
              return 3;
            } else if (multiplicand < 4 || multiplier < 4) {
              return answer + 4;
            } else {
              return answer + 1;
            }
          } else {
            return answer - 1;
          }
        }
        return answer + modifier * Math.min(multiplier, multiplicand);
      });
      return {
        answer,
        problemContainer,
        options,
        query: multiplicand + operand + multiplier,
      };
    },
  },
  "x numbers lv2": {
    question: null,
    optionPatterns: [
      [0, -1, "one", 1],
      [1, 0, -1, "one"],
      ["one", -1, 0, 1],
      [-1, 1, "one", 0],
    ],
    questionGenerator: () => {
      const nameOfGame = "x numbers lv2";
      let multiplicand = rand(10, 2);
      let multiplier = rand(10, 3);
      const operand = "x";
      const answer = multiplicand * multiplier;
      const problemContainer = document.createElement("p");
      problemContainer.classList.add("problem");
      problemContainer.innerText = `${multiplicand} ${operand} ${multiplier} = ?`;

      const optionPattern =
        GAME_INFO[nameOfGame].optionPatterns[
          rand(GAME_INFO[nameOfGame].optionPatterns.length - 1)
        ];
      const options = optionPattern.map((modifier) =>
        modifier === "one"
          ? answer - 1
          : answer +
            modifier * (Math.random() > 0.5 ? multiplier : multiplicand)
      );
      return {
        answer,
        problemContainer,
        options,
        query: multiplicand + operand + multiplier,
      };
    },
  },
};

export default GAME_INFO