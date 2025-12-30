/**
 * @typedef {Object} Plugin
 * @property {string} name
 * @property {() => void} [init]
 * @property {(evt: SubmitEvent) => void} [onSubmit]
 */

/** @type {Plugin[]} */
const PLUGINS = [
  // Add plugins here
  {
    name: "CSS Variable Forms",
    init: () => {
      // Set current values in selector forms
      /** @type {NodeListOf<HTMLFormElement>} */
      const forms = document.querySelectorAll("form[data-target-selector]");
      // Set the current value of CSS variables in the curresponding input elements
      for (const form of forms) {
        const targetSelector = form.dataset.targetSelector;
        if (targetSelector === undefined) {
          continue;
        }
        const elements = document.querySelectorAll(targetSelector);
        const style = getComputedStyle(elements[0]);

        /** @type {NodeListOf<HTMLInputElement>} */
        const inputs = form.querySelectorAll("input[name]");
        for (const input of inputs) {
          const value = style.getPropertyValue(input.name).trim();
          if (value !== "") {
            // Remove unit if specified
            const unit = form.dataset.units
              ? JSON.parse(form.dataset.units)[input.name]
              : null;
            if (unit && value.endsWith(unit)) {
              input.value = value.slice(0, value.length - unit.length);
            } else {
              input.value = value;
            }
          }
        }
      }
    },
    onSubmit: (evt) => {
      const form = evt.target;
      if (
        form === null ||
        !(form instanceof HTMLFormElement) ||
        form.dataset.targetSelector === undefined
      ) {
        return;
      }
      // We got it from here
      evt.preventDefault();

      const selector = form.dataset.targetSelector;
      const formData = new FormData(form);
      const targetElements = document.querySelectorAll(selector);
      const units = JSON.parse(form.dataset.units ?? "{}");

      for (const el of targetElements) {
        if (!(el instanceof HTMLElement)) {
          continue;
        }
        for (const [key, value] of formData.entries()) {
          el.style.setProperty(key, `${value}${units[key] ?? ""}`);
        }
      }
    },
  },
];

addEventListener("keydown", keydown);
addEventListener("keyup", keyup);
addEventListener("DOMContentLoaded", DOMContentLoaded);
addEventListener("submit", submit);

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

/**
 * @param {SubmitEvent} evt
 */
function submit(evt) {
  for (const plugin of PLUGINS) {
    if (plugin.onSubmit) {
      plugin.onSubmit(evt);
    }
  }
}

const dummy = document.createElement("div");
function DOMContentLoaded() {
  document.body.append(dummy);
  dummy.style.width = "0";

  for (const plugin of PLUGINS) {
    if (plugin.init) {
      plugin.init();
    }
  }
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
