addEventListener("keydown", keydown);
addEventListener("keyup", keyup);

/**
 * @param {KeyboardEvent} evt
 */
function keydown(evt) {
  document.body.classList.add(`key-${evt.key}-pressed`);
}
function keyup(evt) {
  document.body.classList.remove(`key-${evt.key}-pressed`);
}
