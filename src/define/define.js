function define(name, options) {
  return (constructor) => customElements.define(name, constructor, options);
}

export default define;
