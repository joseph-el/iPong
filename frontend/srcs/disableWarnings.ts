const originalWarn = console.warn;
const originalError = console.error;

console.warn = (...args) => {
};

console.error = (...args) => {
  // originalError.apply(console, args);
};

