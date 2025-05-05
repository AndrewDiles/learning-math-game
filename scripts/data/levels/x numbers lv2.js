// x numbers lv2
import rand from "../../helpers/rand.js";

const level = {
	question: null,
	optionPatterns: [
		[0, -1, "one", 1],
		[1, 0, -1, "one"],
		["one", -1, 0, 1],
		[-1, 1, "one", 0],
	],
	questionGenerator: () => {
		let multiplicand = rand(10, 2);
		let multiplier = rand(10, 3);
		const operand = "x";
		const answer = multiplicand * multiplier;
		const problemContainer = document.createElement("p");
		problemContainer.classList.add("problem");
		problemContainer.innerText = `${multiplicand} ${operand} ${multiplier} = ?`;

		const optionPattern =
			level.optionPatterns[
				rand(level.optionPatterns.length - 1)
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
};

export default level;
