import isTouchDevice from "./isTouchDevice.js";

const IS_TOUCH_DEVICE = isTouchDevice();

const focusIfNeeded = (query) => {
  if (IS_TOUCH_DEVICE) return;
  const target = document.querySelector(query);
  target && target.focus();
};

export default focusIfNeeded;
