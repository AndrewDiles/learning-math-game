import buildMainMenu from "./build-main-menu.js";
import { RAINBOW_COLORS, MAX_STEPS } from "../data/constants.js";
import GAME_INFO from "../data/game-info.js";
import {
  sessionSaveQuery,
  updateSaveGame,
  backToBackQuestion,
} from "../helpers/manage-saved-data.js";
import focusIfNeeded from "../helpers/focusIfNeeded.js";

const createExitButton = () => {
  const exitButton = document.createElement("button");
  exitButton.type = "button";
  exitButton.classList.add("menu-button", "exit-button", "centered");
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
    nextStepButton.innerText = "●";
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
  const foundQuery = document.querySelector("p.centered");
  if (foundQuery && foundQuery.innerText.includes("?")) {
    foundQuery.innerText = foundQuery.innerText.slice(0, -1) + correctValue;
  }
  return correctMessage;
};

const createProgressTracker = () => {
  // ◉ ○ ◌ ●
  const progressContainer = document.createElement("section");
  progressContainer.classList.add("centered");
  progressContainer.classList.add("progress");
  for (let i = 1; i <= MAX_STEPS; i++) {
    const step = document.createElement("span");
    step.innerText = i === 1 ? "●" : "○";
    step.classList.add("centered");
    if (i === 1) {
      step.classList.add("blinking");
    }
    step.id = `step-${i}`;
    progressContainer.appendChild(step);
    main.appendChild(progressContainer);
  }
};

const createLifeImage = (optionalId) => {
  const life = document.createElement("img"); // ❤️
  life.alt = "Health heart";
  life.src = "./assets/full-heart.svg";
  life.style.height = "1em";
  life.classList.add("full");
  if (optionalId) life.id = optionalId;
  return life;
};

const createLifeTracker = () => {
  const lifeContainer = document.createElement("section");
  for (let i = 1; i < 4; i++) {
    lifeContainer.appendChild(createLifeImage(`life-${i}`));
  }
  main.appendChild(lifeContainer);
};

const disableAnswersAtGameOver = (answer) => {
  document.querySelectorAll(".answer-button").forEach((button) => {
    button.disabled = true;
    if (button.innerText == answer) {
      button.classList.add("correct");
    }
  });
};

const oopsMessage = (questionContainer) => {
  const queryMessage = document.querySelector("h3");
  if (queryMessage) {
    queryMessage.innerText = "oops";
  } else {
    const queryMessage = document.createElement("h3");
    queryMessage.innerText = "oops";
    questionContainer.prepend(queryMessage);
  }
};

const stopBlinkingTracker = () => {
  const blinking = document.querySelector(".blinking");
  if (blinking) {
    blinking.style.color = "black";
    blinking.classList.remove("blinking");
  }
};

const gameOver = (answer, questionContainer) => {
  disableAnswersAtGameOver(answer);
  oopsMessage(questionContainer);
  stopBlinkingTracker();
  questionContainer.appendChild(createTryAgainButton());
  focusIfNeeded(".menu-button:not(.exit-button)");
  questionContainer.appendChild(createReturnToMenuButton());
};

const winGame = (questionContainer) => {
  removeQuestion();
  convertHeartsToStars();
  questionContainer.appendChild(createWinMessage());
  questionContainer.appendChild(createTryAgainButton(true));
  questionContainer.appendChild(createReturnToMenuButton());
  document.querySelector(".exit-button").remove();
  focusIfNeeded(".menu-button");
  updateSaveGame();
};

const createAnswers = (questionContainer, options, answer) => {
  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("options");
  options.forEach((option, index) => {
    const answerButton = document.createElement("button");
    answerButton.type = "button";
    answerButton.classList.add("answer-button");
    answerButton.innerText = option;
    answerButton.addEventListener("click", () => {
      // attempt at answering question from user
      if (option === answer) {
        // correct answer
        optionsContainer.remove();
        const stepComplete = manageProgressAndGetStep();
        questionContainer.appendChild(createCorrectMessage(option));
        if (stepComplete === MAX_STEPS) {
          winGame(questionContainer);
        } else {
          // continue game
          questionContainer.appendChild(createNextQuestionButton(stepComplete));
          focusIfNeeded(".menu-button:not(.exit-button)");
        }
      } else {
        // incorrect answer
        const lives = document.querySelectorAll(".full");
        answerButton.disabled = true;
        takeAwayLife(lives);
        if (lives.length === 1) {
          gameOver(answer, questionContainer);
        } else {
          focusIfNeeded(".answer-button:not(:disabled)");
        }
      }
    });
    optionsContainer.appendChild(answerButton);
  });
  return optionsContainer;
};

const takeAwayLife = (lives) => {
  const lifeToChange = lives[lives.length - 1];
  const fadingLife = createLifeImage();
  fadingLife.classList.add("fading-heart");
  fadingLife.classList.remove("full");
  const { x, y } = lifeToChange.getBoundingClientRect();
  fadingLife.style.left = x + "px";
  fadingLife.style.top = y + "px";
  main.appendChild(fadingLife);
  setTimeout(() => fadingLife.remove(), 3000);
  lifeToChange.classList.remove("full");
  lifeToChange.classList.add("empty");
  lifeToChange.src = "./assets/empty-heart.svg";
};

const manageProgressAndGetStep = () => {
  const currentlyBlinking = document.querySelector(".blinking");
  currentlyBlinking.classList.remove("blinking");
  currentlyBlinking.innerText = "●";
  const stepComplete = Number(currentlyBlinking.id.replace("step-", ""));
  currentlyBlinking.style.color = RAINBOW_COLORS[stepComplete - 1];
  return stepComplete;
};

const removeQuestion = () => {
  const queryMessage = document.querySelector("h3");
  if (queryMessage) queryMessage.remove();
};

const createWinMessage = () => {
  const winMessage = document.createElement("p");
  ["y", "o", "u", " ", "w", "i", "n", "!"].forEach((letter, index) => {
    const letterSpan = document.createElement("span");
    letterSpan.innerText = letter;
    letterSpan.classList.add("rainbow-color");
    letterSpan.classList.add("correct");
    letterSpan.style.animationDelay = `${-200 * index}ms`;
    winMessage.appendChild(letterSpan);
  });
  return winMessage;
};

const convertHeartsToStars = () => {
  [".full", ".empty"].forEach((heartClass) => {
    document.querySelectorAll(heartClass).forEach((heart) => {
      heart.alt = "Victory star";
      heart.src =
        heartClass === ".full" ? "./assets/full-star.svg" : "./assets/star.svg";
      heart.style.height = "1em";
      heart.classList.add("growing");
    });
  });
};

const askAQuestion = () => {
  const gameName = heading.innerText;
  const gameInfoByName = GAME_INFO[gameName];
  const { question } = gameInfoByName;
  const { answer, problemContainer, options, query } =
    gameInfoByName.questionGenerator();
  if (backToBackQuestion(query)) {
    return askAQuestion();
  }
  sessionSaveQuery(query);
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = "";
  if (question) {
    const query = document.createElement("h3");
    query.innerText = question;
    questionContainer.appendChild(query);
  }
  questionContainer.appendChild(problemContainer);
  questionContainer.appendChild(
    createAnswers(questionContainer, options, answer)
  );
  focusIfNeeded(".answer-button");
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
