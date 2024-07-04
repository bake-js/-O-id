Object.assign(self, {
  customElements: {
    define() {},
  },

  requestAnimationFrame(callback) {
    setTimeout(callback, 0);
  },
});
