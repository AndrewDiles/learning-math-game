// x numbers lv1
import rand from "../../helpers/rand.js";

const level = {
	question: "how many dots",
	optionPatterns: [
		[0, -1, "one", 1],
		[1, 0, -1, "one"],
		["one", -1, 0, 1],
		[-1, 1, "one", 0],
	],
	questionGenerator: () => {
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
			level.optionPatterns[
				rand(level.optionPatterns.length - 1)
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
};

export default level;
