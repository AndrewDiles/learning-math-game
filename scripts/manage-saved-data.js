import { GAME_NAMES, STORAGE_KEY, TEMP_STORAGE_KEY } from "./constants.js";

export const saveGame = (gameData) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(gameData));
};

export const sessionSaveQuery = (query) => {
	window.sessionStorage.setItem(TEMP_STORAGE_KEY, JSON.stringify(query));
}

export const updateSaveGame = () => {
  const save = window.localStorage.getItem(STORAGE_KEY);
	if (!save) return console.log("Error getting save");
	const parsedSave = JSON.parse(save);
	const currentGameName = heading.innerText;
	const currentGame = parsedSave.find(game => game.name === currentGameName);
	if (!currentGame) return console.log("Error finding current game");
	const remainingLives = document.querySelectorAll(".full").length;
	if (remainingLives > currentGame.best) {
		currentGame.best = remainingLives;
		saveGame(parsedSave)
	}
};

const initializeSave = () => {
  const savedGame = window.localStorage.getItem("math-save");
  if (!savedGame) {
    // create save if one isn't found
    const newSave = GAME_NAMES.map((name, level) => ({
      level,
      name,
      best: 0,
    }));
    saveGame(newSave);
    return newSave;
  }

  const parsedSave = JSON.parse(savedGame);
  if (GAME_NAMES.length !== parsedSave.length || parsedSave.find(({name}) => !GAME_NAMES.includes(name))) {
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
