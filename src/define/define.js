const define = (name, options) => (constructor) =>
  customElements.define(name, constructor, options);

export default define;
