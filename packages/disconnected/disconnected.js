function disconnected(target, propertyKey) {
  const disconnectedCallback = target.disconnectedCallback ?? (() => undefined);

  Reflect.defineProperty(target, "disconnectedCallback", {
    async value() {
      await Reflect.apply(disconnectedCallback, this, arguments);
      await this[propertyKey](...arguments);
      return this;
    },
    writable: true,
  });
}

export default disconnected;
