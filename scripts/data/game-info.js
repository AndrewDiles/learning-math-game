import countingFruit from "./levels/1 2 3 fruit.js";
import addingFruit from "./levels/+ fruit.js";
import subtractingFruit from "./levels/- fruit.js";
import additionLv1 from "./levels/+ numbers lv1.js";
import additionLv2 from "./levels/+ numbers lv2.js";
import subtractionLv1 from "./levels/- numbers lv1.js";
import subtractionLv2 from "./levels/- numbers lv2.js";
import multiplicationLv1 from "./levels/x numbers lv1.js";
import multiplicationLv2 from "./levels/x numbers lv2.js";

const GAME_INFO = {
  "1 2 3 fruit": countingFruit,
  "+ fruit": addingFruit,
  "- fruit": subtractingFruit,
  "+ numbers lv1": additionLv1,
  "+ numbers lv2": additionLv2,
  "- numbers lv1": subtractionLv1,
  "- numbers lv2": subtractionLv2,
  "x numbers lv1": multiplicationLv1,
  "x numbers lv2": multiplicationLv2,
};

export default GAME_INFO

export const GAME_NAMES = Object.keys(GAME_INFO);