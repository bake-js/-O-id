class CSSStyleSheet {
  constructor() {
    this.cssRules = [];
  }

  replaceSync(textContent) {
    this.cssRules = [
      {
        cssText: textContent
          .replace(/[\n\r]+/g, "")
          .replace(/\s+/g, " ")
          .trim(),
      },
    ];
  }
}

function requestAnimationFrame(callback) {
  return setTimeout(callback, 0);
}

Object.assign(self, {
  CSSStyleSheet,
  requestAnimationFrame,
});
