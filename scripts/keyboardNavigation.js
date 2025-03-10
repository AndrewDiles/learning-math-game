const enableKeyboardNavigation = () => {
  window.addEventListener("keydown", (ev) => {
		const { code } = ev;
    // prevent scrolling
    if (code === "ArrowDown" || code === "ArrowUp") {
      ev.preventDefault();
    }
    const buttons = document.querySelectorAll("button");
    if (code === "Escape") {
      // back to menu if possible on Escape
      const escapeButton = document.querySelector(".exit-button");
      if (escapeButton) return escapeButton.click();
      let menuButton = null;
      buttons.forEach((button) => {
        if (button.innerText === "menu") {
          menuButton = button;
        }
      });
      if (menuButton) menuButton.click();
      return;
    }
    if (!selectionCodesRespondedTo.includes(code)) return;

    let indexOfCurrentFocus = null;
    buttons.forEach((button, index) => {
      if (button === document.activeElement) indexOfCurrentFocus = index;
    });
    // if not focused or on exit, focus first button
    if (indexOfCurrentFocus === null) {
			if (document.querySelector(".exit-button")) {
				return buttons[1].focus();
			} else {
				return buttons[0].focus();
			}
    }

    if (buttons.length === 2) {
      // between questions
      if (indexOfCurrentFocus === 0) {
        return buttons[1].focus();
      } else {
        return buttons[0].focus();
      }
    }

    if (buttons.length === 5) {
      // answeringQuestion

      // test direction
      const upFromTopRow =
        (indexOfCurrentFocus === 1 || indexOfCurrentFocus === 2) &&
        (code === "ArrowUp" || code === "KeyW");
      const downFromBottomRow =
        (indexOfCurrentFocus === 3 || indexOfCurrentFocus === 4) &&
        (code === "ArrowDown" || code === "KeyS");
      if (upFromTopRow || downFromBottomRow) {
        return buttons[0].focus();
      }
      const left = code === "ArrowLeft" || code === "KeyA";
      const right = code === "ArrowRight" || code === "KeyD";
      const up = code === "ArrowUp" || code === "KeyW";
      const down = code === "ArrowDown" || code === "KeyS";
      // go to 2 if: L/R of 1 || U of 4
      if (
        (indexOfCurrentFocus === 1 && (left || right)) ||
        (up && indexOfCurrentFocus === 4)
      ) {
        return buttons[2].focus();
      }
      // go to 3 if: L/R of 4 || D of 1
      if (
        (indexOfCurrentFocus === 4 && (left || right)) ||
        (down && indexOfCurrentFocus === 1)
      ) {
        return buttons[3].focus();
      }
      // go to 4 if: L/R of 3 || D of 2
      if (
        (indexOfCurrentFocus === 3 && (left || right)) ||
        (down && indexOfCurrentFocus === 2)
      ) {
        return buttons[4].focus();
      }
      // otherwise go to 1
      return buttons[1].focus();
    }
    // end of game or main menu
    const goingUp =
      code === "ArrowUp" ||
      code === "KeyW" ||
      code === "ArrowLeft" ||
      code === "KeyA";
    let newIndex = goingUp ? indexOfCurrentFocus - 1 : indexOfCurrentFocus + 1;
    if (newIndex < 0) {
      newIndex = buttons.length - 1;
    } else if (newIndex > buttons.length - 1) {
      newIndex = 0;
    }
    buttons[newIndex].focus();
  });
};

export default enableKeyboardNavigation;

const selectionCodesRespondedTo = [
  "ArrowUp",
  "ArrowLeft",
  "ArrowDown",
  "ArrowRight",
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
];
