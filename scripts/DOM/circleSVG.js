export const makeCircle = () => {
  const newSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  newSVG.classList.add("circle");
  newSVG.setAttribute("width", "100");
  newSVG.setAttribute("height", "100");
  newSVG.setAttribute("viewBox", "0 0 100 100");

  const innerCircle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  innerCircle.setAttribute("r", "50");
  innerCircle.setAttribute("cx", "50");
  innerCircle.setAttribute("cy", "50");
  innerCircle.setAttribute("fill", "hsla(360 100% 100% / 0.25)");

  newSVG.appendChild(innerCircle);
  return newSVG;
};

export const addHorizontalLine = (svg) => {
  const horizontalLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  horizontalLine.setAttribute("x1", "0");
  horizontalLine.setAttribute("y1", "50");
  horizontalLine.setAttribute("x2", "100");
  horizontalLine.setAttribute("y2", "50");
  horizontalLine.setAttribute("stroke-dasharray", "4 4");
  svg.appendChild(horizontalLine);
};

export const addVerticalLine = (svg) => {
  const verticalLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  verticalLine.setAttribute("x1", "50");
  verticalLine.setAttribute("y1", "0");
  verticalLine.setAttribute("x2", "50");
  verticalLine.setAttribute("y2", "100");
  verticalLine.setAttribute("stroke-dasharray", "4 4");
  svg.appendChild(verticalLine);
};

export const add45Line = (svg) => {
  const newLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  newLine.setAttribute("x1", "14.64");
  newLine.setAttribute("y1", "14.64");
  newLine.setAttribute("x2", "85.36");
  newLine.setAttribute("y2", "85.36");
  newLine.setAttribute("stroke-dasharray", "4 4");
  svg.appendChild(newLine);
};
export const addNeg45Line = (svg) => {
  const newLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  newLine.setAttribute("x1", "85.36");
  newLine.setAttribute("y1", "14.64");
  newLine.setAttribute("x2", "14.64");
  newLine.setAttribute("y2", "85.36");
  newLine.setAttribute("stroke-dasharray", "4 4");
  svg.appendChild(newLine);
};

export const add60Line = (svg) => {
  const newLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  newLine.setAttribute("x1", "6.7");
  newLine.setAttribute("y1", "25");
  newLine.setAttribute("x2", "93.3");
  newLine.setAttribute("y2", "75");
  newLine.setAttribute("stroke-dasharray", "4 4");
  svg.appendChild(newLine);
};
export const addNeg60Line = (svg) => {
  const newLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  newLine.setAttribute("x1", "6.7");
  newLine.setAttribute("y1", "75");
  newLine.setAttribute("x2", "93.3");
  newLine.setAttribute("y2", "25");
  newLine.setAttribute("stroke-dasharray", "4 4");
  svg.appendChild(newLine);
};

export const addThirdLines = (svg) => {
  const halfLine1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  halfLine1.setAttribute("x1", "93.5");
  halfLine1.setAttribute("y1", "75");
  halfLine1.setAttribute("x2", "50");
  halfLine1.setAttribute("y2", "50");
  halfLine1.setAttribute("stroke-dasharray", "4 4");
  svg.appendChild(halfLine1);

  const halfLine2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  halfLine2.setAttribute("x1", "6.5");
  halfLine2.setAttribute("y1", "75");
  halfLine2.setAttribute("x2", "50");
  halfLine2.setAttribute("y2", "50");
  halfLine2.setAttribute("stroke-dasharray", "4 4");
  svg.appendChild(halfLine2);

  const verticalLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  verticalLine.setAttribute("x1", "50");
  verticalLine.setAttribute("y1", "0");
  verticalLine.setAttribute("x2", "50");
  verticalLine.setAttribute("y2", "50");
  verticalLine.setAttribute("stroke-dasharray", "4 4");
  svg.appendChild(verticalLine);
};

export const addQuarterLines = (svg) => {
  addHorizontalLine(svg);
  addVerticalLine(svg);
};
export const addSixthLines = (svg) => {
  addVerticalLine(svg);
  add60Line(svg);
  addNeg60Line(svg);
};

export const addEighthLines = (svg) => {
  addQuarterLines(svg);
  add45Line(svg);
  addNeg45Line(svg);
};

const makeLine = (x1, y1, x2, y2) => {
  const newLine = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  newLine.setAttribute("x1", x1);
  newLine.setAttribute("y1", y1);
  newLine.setAttribute("x2", x2);
  newLine.setAttribute("y2", y2);
  newLine.setAttribute("stroke-dasharray", "4 4");
  return newLine;
};

export const addTenthLines = (svg) => {
  // const points=[
  // 	{p1:[100,50], p2:[0,50]},
  // 	{p1:[90.45,79.39], p2:[9.55,20.61]},
  // 	{p1:[65.45,97.55], p2:[34.55,2.45]},
  // 	{p1:[34.55,97.55], p2:[65.45,2.45]},
  // 	{p1:[9.55,79.39], p2:[90.45,20.61]},
  // ]
  const points = [
    { p1: [97, 65.13], p2: [2.5, 34.5] },
    { p1: [96.11, 34.87], p2: [2.89, 65.13] },
    { p1: [78.53, 89.39], p2: [21.47, 10.61] },
    { p1: [50, 100], p2: [50, 0] },
    { p1: [21.47, 89.39], p2: [78.53, 10.61] },
  ];
  points.forEach(({ p1, p2 }) => {
    svg.appendChild(makeLine(...p1, ...p2));
  });
};

export const addSlice = (
  svg,
  color,
  percentSize,
  startingAngle,
  flipped = false
) => {
  const newSlice = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  newSlice.setAttribute("r", "25");
  newSlice.setAttribute("cx", "50");
  newSlice.setAttribute("cy", "50");
  newSlice.setAttribute("fill", "transparent");

  newSlice.setAttribute("stroke", color);
  newSlice.setAttribute("stroke-width", "50");
	const dashArraySizeOne = percentSize * 157.08 / 100;
  newSlice.setAttribute(
    "stroke-dasharray",
    `${dashArraySizeOne} 157.08`
  );
  newSlice.setAttribute("transform-origin", "center");
  let transform = `rotate(${startingAngle})`;

  if (flipped) {
    transform += ` scaleY(-1)`;
  }
  newSlice.setAttribute("transform", transform);
  svg.appendChild(newSlice);
};
