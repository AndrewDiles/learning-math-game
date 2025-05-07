// + fractions lv1
import rand from "../../helpers/rand.js";

import { SCATTERED_COLORS } from "../constants.js";


import {
  makeCircle,
  addThirdLines,
  addQuarterLines,
  addSixthLines,
  addEighthLines,
  addTenthLines,
  addSlice,
	addVerticalLine,
} from "../../DOM/circleSVG.js";

import createFraction from "../../DOM/createFraction.js";

const answerArray = [
  {
    solution: 2,
    lineFunction: addVerticalLine,
    size: (100 * 1) / 2,
  },
  {
    solution: 3,
    lineFunction: addThirdLines,
    size: (100 * 1) / 3,
  },
  {
    solution: 4,
    lineFunction: addQuarterLines,
    size: (100 * 1) / 4,
  },
  {
    solution: 6,
    lineFunction: addSixthLines,
    size: (100 * 1) / 6,
  },
  {
    solution: 8,
    lineFunction: addEighthLines,
    size: (100 * 1) / 8,
  },
  {
    solution: 10,
    lineFunction: addTenthLines,
    size: (100 * 1) / 10,
  },
];

const level = {
  question: "how many pieces",
  optionPatterns: [
    [0, -1, 2, 1],
    [1, 0, -1, -2],
    [2, -1, 0, 1],
    [-1, 1, -2, 0],
  ],
  questionGenerator: () => {
    const answerObject = answerArray[rand(answerArray.length - 1, 0)];
    const answer = answerObject.solution;

    const problemContainer = document.createElement("div");
    problemContainer.classList.add("problem");
    const svg = makeCircle();
    const anglePerSlice = 360 / answer;
    for (let sliceNumber = 1; sliceNumber <= answer; sliceNumber++) {
      addSlice(
        svg,
        SCATTERED_COLORS[sliceNumber - 1],
        answerObject.size,
        270 + anglePerSlice * (sliceNumber - 1)
      );
    }
		answerObject.lineFunction(svg);
    problemContainer.appendChild(svg);

    const optionPattern =
      level.optionPatterns[rand(level.optionPatterns.length - 1)];
    const options = optionPattern.map((modifier) => {
      if (modifier === -2 && answer === 2) {
        return 3;
      } else {
        return modifier + answer;
      }
    });
		const clarification = document.createElement("div");
		clarification.classList.add("clarification")
		const fractionEquivalent = createFraction(1, answer);
		const singleSliceContainer = makeCircle();
		addSlice(
			singleSliceContainer,
			SCATTERED_COLORS[0],
			answerObject.size,
			270
		);
		clarification.appendChild(singleSliceContainer);
		const equalsTo = document.createElement("span");
		equalsTo.innerText = "=";
		equalsTo.classList.add("fractionEquals");
		clarification.appendChild(equalsTo);
		clarification.appendChild(fractionEquivalent);
    return {
      answer,
      problemContainer,
      options,
			query: answer,
			clarification
    };
  },
};

export default level;
