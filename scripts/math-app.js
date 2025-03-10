import buildMainMenu from "./build-main-menu.js";
import enableKeyboardNavigation from "./keyboardNavigation.js";
import isTouchDevice from "./isTouchDevice.js";

if (!isTouchDevice()) enableKeyboardNavigation()
buildMainMenu()

console.log("Welcome to: %cLearning Math Game",
  "font-size: 2rem; font-weight: bold; background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet); -webkit-background-clip: text; color: transparent;"
);
console.log("A most excellent name, yes, I know 🤪");