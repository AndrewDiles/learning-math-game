import buildMainMenu from "./build-main-menu.js";
import enableKeyboardNavigation from "./keyboardNavigation.js";
import isTouchDevice from "./isTouchDevice.js";

if (!isTouchDevice()) enableKeyboardNavigation()
buildMainMenu()
