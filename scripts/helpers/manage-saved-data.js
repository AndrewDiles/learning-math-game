import {
  GAME_NAMES,
  STORAGE_KEY,
  TEMP_STORAGE_KEY,
} from "../data/constants.js";

const defaultSavedGame = GAME_NAMES.map((name, level) => ({
  level,
  name,
  best: 0,
}));

const verifyStorageFunctional = () => {
  try {
    window.localStorage.setItem("t", "Hello World");
    const worked = window.localStorage.getItem("t");
    if (worked) {
      window.localStorage.removeItem("t");
      return true;
    } else {
      throw new Error();
    }
  } catch (err) {
    console.log("uh oh - looks like the storage API is disabled");
    return false;
  }
};

export const storagePossible = verifyStorageFunctional();

export const saveGame = (gameData) => {
  storagePossible &&
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(gameData));
};

export const sessionSaveQuery = (query) => {
  storagePossible &&
    window.sessionStorage.setItem(TEMP_STORAGE_KEY, JSON.stringify(query));
};

export const backToBackQuestion = (query) => {
  if (!storagePossible) return false;
  const last = window.sessionStorage.getItem(TEMP_STORAGE_KEY);
  if (!last) return false;
  return JSON.parse(last) === query;
};

export const updateSaveGame = () => {
  if (!storagePossible) return;
  let save = window.localStorage.getItem(STORAGE_KEY);
  if (!save) {
    console.log("Error getting save");
    save = JSON.stringify(defaultSavedGame);
  }
  const parsedSave = JSON.parse(save);
  const currentGameName = heading.innerText;
  const currentGame = parsedSave.find((game) => game.name === currentGameName);
  if (!currentGame) return console.log("Error finding current game");
  const remainingLives = document.querySelectorAll(".full").length;
  if (remainingLives > currentGame.best) {
    currentGame.best = remainingLives;
    saveGame(parsedSave);
  }
};

const initializeSave = () => {
  if (!storagePossible) return defaultSavedGame;
  const savedGame = window.localStorage.getItem("math-save");
  if (!savedGame) {
    // create save if one isn't found
    saveGame(defaultSavedGame);
    return defaultSavedGame;
  }

  const parsedSave = JSON.parse(savedGame);
  if (
    GAME_NAMES.length !== parsedSave.length ||
    parsedSave.find(({ name }) => !GAME_NAMES.includes(name))
  ) {
    // game extended since last save, update
    const newSave = GAME_NAMES.map((name, level) => {
      const foundLevelRecord = parsedSave.find((level) => level.name === name);
      if (foundLevelRecord) foundLevelRecord.level = level;
      return (
        foundLevelRecord || {
          level,
          name,
          best: 0,
        }
      );
    });
    saveGame(newSave);
    return newSave;
  }
  return parsedSave;
};

export default initializeSave;
