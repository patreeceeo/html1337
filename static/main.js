const body = document.body;

const CONFIG = {
  fixedTimeStep: 1 / 100,
  maxAccumulator: 2,
};

/**
 * @typedef {(els: NodeListOf<HTMLElement>) => void} SelectorFrameHandler
 *
 * @typedef {Object} Plugin
 * @property {string} name
 * @property {() => void} [init]
 * @property {(evt: SubmitEvent) => void} [onSubmit]
 * @property {(evt: KeyboardEvent) => void} [onKeydown]
 * @property {(evt: KeyboardEvent) => void} [onKeyUp]
 * @property {Record<string, SelectorFrameHandler>} [onFrame]
 */

/** @type {Plugin[]} */
const PLUGINS = [
  {
    name: "Keyboard Input",
    onKeydown: (evt) => {
      body.classList.add(`key-${evt.key}-pressed`);
    },
    onKeyUp: (evt) => {
      body.classList.remove(`key-${evt.key}-pressed`);
    },
  },
  {
    name: "Velocity System",
    onFrame: {
      ".velocity": (els) => {
        for (const el of els) {
          applyVelocity(el, "x");
          applyVelocity(el, "y");
        }
      },
    },
  },
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
  for (const plugin of PLUGINS) {
    if (plugin.onKeydown) {
      plugin.onKeydown(evt);
    }
  }
}
/**
 * @param {KeyboardEvent} evt
 */
function keyup(evt) {
  for (const plugin of PLUGINS) {
    if (plugin.onKeyUp) {
      plugin.onKeyUp(evt);
    }
  }
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
  body.append(dummy);
  dummy.style.position = "absolute";

  for (const plugin of PLUGINS) {
    if (plugin.init) {
      plugin.init();
    }
  }
}

let lastTime = performance.now();
let accumulator = 0;
/**
 * @param {number} time
 */
const animationFrame = (time) => {
  const frameTime = Math.min((time - lastTime) / 1000, CONFIG.maxAccumulator);
  lastTime = time;
  accumulator += frameTime;
  while (accumulator >= CONFIG.fixedTimeStep) {
    update();
    accumulator -= CONFIG.fixedTimeStep;
  }
  requestAnimationFrame(animationFrame);
};
requestAnimationFrame(animationFrame);

function update() {
  for (const plugin of PLUGINS) {
    if (plugin.onFrame) {
      for (const selector in plugin.onFrame) {
        const handler = plugin.onFrame[selector];
        /** @type {NodeListOf<HTMLElement>} */
        const els = document.querySelectorAll(selector);
        if (els.length > 0) {
          handler(els);
        }
      }
    }
  }
}

/**
 * @param {string} value
 * @returns {string}
 */
function evaluateCssLength(value) {
  dummy.style.width = `calc(${value})`;
  const computed = dummy.style.width;
  dummy.style.width = "0";
  return computed;
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
  const newPos = evaluateCssLength(`${postion} + ${velocity}`);
  ent.style.setProperty(`--${dim}`, newPos);
}
