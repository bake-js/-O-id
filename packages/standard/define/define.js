function define(tagName, options) {
	return (constructor) => customElements.define(tagName, constructor, options);
}

export default define;
