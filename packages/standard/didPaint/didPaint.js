function didPaint(target, propertyKey) {
	const method = Symbol.for("didPaint");
	const didPaintCallback = target[method] ?? (() => undefined);

	Reflect.defineProperty(target, method, {
		async value() {
			await Reflect.apply(didPaintCallback, this, arguments);
			await this[propertyKey](...arguments);
		},
		writable: true,
	});
}

export default didPaint;
