Object.assign(self, {
  CSSStyleSheet,

  customElements: {
    define() {},
  },

  document: self,

  requestAnimationFrame(callback) {
    setTimeout(callback, 0);
  },
});

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
