import buildMainMenu from "./buildMainMenu.js";
import { GAME_INFO, RAINBOW_COLORS } from "./constants.js";
import { updateSaveGame } from "./manage-saved-data.js";

const createExitButton = () => {
  const exitButton = document.createElement("button");
  exitButton.type = "button";
  exitButton.classList.add("menu-button", "exit-button");
  exitButton.innerText = "✖"; // ✖×x✕
  exitButton.addEventListener("click", buildMainMenu);
  main.appendChild(exitButton);
};

const createTryAgainButton = (victory) => {
  const tryAgainButton = document.createElement("button");
  tryAgainButton.type = "button";
  tryAgainButton.classList.add("menu-button");
  tryAgainButton.innerText = `${victory ? "play" : "try"} again`;
  tryAgainButton.style.marginBottom = "1rem";
  tryAgainButton.addEventListener("click", () => {
    launchGame();
  });
  return tryAgainButton;
};

const createReturnToMenuButton = () => {
  const returnToMenuButton = document.createElement("button");
  returnToMenuButton.type = "button";
  returnToMenuButton.classList.add("menu-button");
  returnToMenuButton.innerText = "menu";
  returnToMenuButton.addEventListener("click", buildMainMenu);
  return returnToMenuButton;
};

const createNextQuestionButton = (stepComplete) => {
  const nextQuestionButton = document.createElement("button");
  nextQuestionButton.type = "button";
  nextQuestionButton.classList.add("menu-button");
  nextQuestionButton.innerText = "next";
  nextQuestionButton.addEventListener("click", () => {
    const nextStepButton = document.getElementById(`step-${stepComplete + 1}`);
    nextStepButton.classList.add("blinking");
    nextStepButton.innerText = "◌";
    askAQuestion();
  });
  return nextQuestionButton;
};

const createCorrectMessage = (correctValue) => {
  const correctMessage = document.createElement("p");
  const correctContent = document.createElement("span");
  correctContent.innerText = correctValue;
  correctContent.classList.add("correct");
  correctMessage.appendChild(correctContent);
  const correctMessageText = document.createTextNode(" is correct!");
  correctMessage.appendChild(correctMessageText);
  return correctMessage;
};

const createProgressTracker = () => {
  // ◉ ○ ◌ ●
  const progressContainer = document.createElement("section");
  progressContainer.classList.add("progress");
  for (let i = 1; i < 11; i++) {
    const step = document.createElement("span");
    step.innerText = i === 1 ? "◌" : "○";
    if (i === 1) {
      step.classList.add("blinking");
    }
    step.id = `step-${i}`;
    progressContainer.appendChild(step);
    main.appendChild(progressContainer);
  }
};

const createLifeTracker = () => {
  const lifeContainer = document.createElement("section");
  for (let i = 1; i < 4; i++) {
    const life = document.createElement("img");
    life.alt = "Health heart";
    life.src = "./assets/full-heart.svg";
    life.style.height = "1em";
    life.classList.add("full");
    life.id = `life-${i}`;
    lifeContainer.appendChild(life);
    main.appendChild(lifeContainer);
  }
};

const askAQuestion = () => {
  const gameName = heading.innerText;
  const gameInfoByName = GAME_INFO[gameName];
  const { question } = gameInfoByName;
  const { answer, problemContainer, options } =
    gameInfoByName.questionGenerator();
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = "";
	if (question) {
		const query = document.createElement("h3");
		query.innerText = question;
		questionContainer.appendChild(query);
	}
  questionContainer.appendChild(problemContainer);
  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("options");
  options.forEach((option) => {
    const answerButton = document.createElement("button");
    answerButton.type = "button";
    answerButton.classList.add("answer-button");
    answerButton.innerText = option;
    answerButton.addEventListener("click", () => {
      if (option === answer) {
        // correct answer
        optionsContainer.remove();
        const currentlyBlinking = document.querySelector(".blinking");
        currentlyBlinking.classList.remove("blinking");
        currentlyBlinking.innerText = "●";
        const stepComplete = Number(currentlyBlinking.id.replace("step-", ""));
        currentlyBlinking.style.color = RAINBOW_COLORS[stepComplete - 1];
        questionContainer.appendChild(createCorrectMessage(option));
        if (stepComplete === 10) {
          // game won
          const winMessage = document.createElement("p");
          winMessage.innerText = "you win!";
          questionContainer.appendChild(winMessage);
          questionContainer.appendChild(createTryAgainButton(true));
          questionContainer.appendChild(createReturnToMenuButton());
          document.querySelector(".exit-button").remove();
          updateSaveGame();
        } else {
          // continue game
          questionContainer.appendChild(createNextQuestionButton(stepComplete));
        }
      } else {
        // incorrect answer
        const lives = document.querySelectorAll(".full");
        answerButton.disabled = true;
        const lifeToChange = lives[lives.length - 1];
        lifeToChange.classList.remove("full");
        lifeToChange.classList.add("empty");
        lifeToChange.src = "./assets/empty-heart.svg";
        if (lives.length === 1) {
          // game over
          document.querySelectorAll(".answer-button").forEach((button) => {
            button.disabled = true;
            if (button.innerText == answer) {
              button.classList.add("correct");
            }
          });
					const queryObject = document.querySelector("h3");
					if (queryObject) {
						document.querySelector("h3").innerText = "oops";
					} else {
						const query = document.createElement("h3");
						query.innerText = "oops";
						questionContainer.prepend(query);
					}
          
          questionContainer.appendChild(createTryAgainButton());
          questionContainer.appendChild(createReturnToMenuButton());
        }
      }
    });
    optionsContainer.appendChild(answerButton);
  });
  questionContainer.appendChild(optionsContainer);
};

const launchGame = (gameName = heading.innerText) => {
  main.innerHTML = "";
  heading.innerText = gameName;
  createExitButton();
  const gameInfoByName = GAME_INFO[gameName];
  if (!gameInfoByName) {
    const notMadeYetMessage = document.createElement("p");
    notMadeYetMessage.innerText = "Sorry, this game hasn't been made yet.";
    main.appendChild(notMadeYetMessage);
    return;
  }
  createProgressTracker();
  createLifeTracker();
  const questionContainer = document.createElement("section");
  questionContainer.id = "question-container";
  main.appendChild(questionContainer);
  askAQuestion();
};

export default launchGame;
