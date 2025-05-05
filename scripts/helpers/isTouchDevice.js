// https://stackoverflow.com/questions/4817029/whats-an-optimal-or-efficient-way-to-detect-a-touch-screen-device-using-javas

const isTouchDevice = () => (('ontouchstart' in window) ||
(navigator.maxTouchPoints > 0) ||
(navigator.msMaxTouchPoints > 0));

export default isTouchDevice