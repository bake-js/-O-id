Object.assign(self, {
  customElements: {
    define() {},
  },

  document: self,

  requestAnimationFrame(callback) {
    setTimeout(callback, 0);
  },
});
