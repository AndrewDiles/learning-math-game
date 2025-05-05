const createFraction = (numerator, denominator) => {
	const newFraction = document.createElement("span");
	newFraction.classList.add("fraction");
	if (numerator > 9) {
		newFraction.classList.add("largeNumerator")
	}
	const numeratorSpan = document.createElement("span");
	numeratorSpan.classList.add("numerator");
	numeratorSpan.innerText = numerator;
	newFraction.appendChild(numeratorSpan);
	const denominatorSpan = document.createElement("span");
	denominatorSpan.classList.add("denominator");
	denominatorSpan.innerText = denominator;
	newFraction.appendChild(denominatorSpan);
	return newFraction
}

export default createFraction