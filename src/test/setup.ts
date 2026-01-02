import "@testing-library/jest-dom";

// Mock global pour le scroll car JSDOM ne le gère pas
let scrollLeftStore = 0;

Object.defineProperty(HTMLElement.prototype, 'scrollLeft', {
  configurable: true,
  get: () => scrollLeftStore,
  set: (v) => { scrollLeftStore = v; }
});

Object.defineProperty(HTMLElement.prototype, 'offsetLeft', {
  configurable: true,
  get: () => 0
});
