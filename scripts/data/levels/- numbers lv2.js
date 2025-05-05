// - numbers lv2
import rand from "../../helpers/rand.js";

const level = {
	question: null,
	optionPatterns: [
		[0, 1, -2, -1],
		[-2, 0, 1, -1],
		[-1, 1, 0, -2],
		[1, -2, -1, 0],
	],
	questionGenerator: () => {
		const initial = rand(20, 10);
		const reduction = rand(10, 2);
		const answer = initial - reduction;
		const operand = "-";
		const problemContainer = document.createElement("p");
		problemContainer.classList.add("centered");
		problemContainer.innerText = `${initial} ${operand} ${reduction} = ?`;

		const optionPattern =
			level.optionPatterns[
				rand(level.optionPatterns.length - 1)
			];
		const options = optionPattern.map((modifier) => answer + modifier);
		return {
			answer,
			problemContainer,
			options,
			query: initial + operand + reduction,
		};
	},
};

export default level;
