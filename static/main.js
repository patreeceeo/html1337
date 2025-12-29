addEventListener("keydown", keydown);
addEventListener("keyup", keyup);
addEventListener("DOMContentLoaded", DOMContentLoaded);

/**
 * @param {KeyboardEvent} evt
 */
function keydown(evt) {
  document.body.classList.add(`key-${evt.key}-pressed`);
}
/**
 * @param {KeyboardEvent} evt
 */
function keyup(evt) {
  document.body.classList.remove(`key-${evt.key}-pressed`);
}

const dummy = document.createElement("div");
function DOMContentLoaded() {
  document.body.append(dummy);
  dummy.style.width = "0";
}

// TODO fixed time step
const animationFrame = () => {
  /** @type {HTMLElement[]} */
  const entList = [...document.querySelectorAll(".entity")];
  for (const ent of entList) {
    applyVelocity(ent, "x");
    applyVelocity(ent, "y");
  }
  requestAnimationFrame(animationFrame);
};
requestAnimationFrame(animationFrame);

/**
 * @param {HTMLElement} ent
 * @param {"x" | "y"} dim
 * @returns void
 */
function applyVelocity(ent, dim) {
  const style = getComputedStyle(ent);
  const velocity = style.getPropertyValue(`--velocity-${dim}`);
  if (!velocity) return;
  const postion = style.getPropertyValue(`--${dim}`);
  dummy.style.width = `calc(${postion} + ${velocity})`;
  ent.style.setProperty(`--${dim}`, dummy.style.width);
  dummy.style.width = "0";
}
