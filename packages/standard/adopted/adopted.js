function adopted(target, propertyKey) {
	const adoptedCallback = target.adoptedCallback ?? (() => undefined);

	Object.defineProperty(target, "adoptedCallback", {
		async value() {
			await Reflect.apply(adoptedCallback, this, arguments);
			await this[propertyKey](...arguments);
		},
		writable: true,
	});
}

export default adopted;
