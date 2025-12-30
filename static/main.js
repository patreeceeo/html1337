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

const fixedTimeStep = 1 / 100;
const maxAccumulator = 2;
let lastTime = performance.now();
let accumulator = 0;
/**
 * @param {number} time
 */
const animationFrame = (time) => {
  const frameTime = Math.min((time - lastTime) / 1000, maxAccumulator);
  lastTime = time;
  accumulator += frameTime;
  let stepCount = 0;
  while (accumulator >= fixedTimeStep) {
    update();
    accumulator -= fixedTimeStep;
    stepCount++;
  }
  requestAnimationFrame(animationFrame);
};
requestAnimationFrame(animationFrame);

function update() {
  /** @type {NodeListOf<HTMLElement>} */
  const entList = document.querySelectorAll(".entity");
  for (const ent of entList) {
    applyVelocity(ent, "x");
    applyVelocity(ent, "y");
  }
}

/**
 * @param {HTMLElement} ent
 * @param {"x" | "y"} dim
 * @returns void
 */
function applyVelocity(ent, dim) {
  const style = getComputedStyle(ent);
  const velocity = style.getPropertyValue(`--velocity-${dim}`);
  if (velocity === "") return;
  const postion = style.getPropertyValue(`--${dim}`);
  dummy.style.width = `calc(${postion} + ${velocity})`;
  ent.style.setProperty(`--${dim}`, dummy.style.width);
  dummy.style.width = "0";
}
