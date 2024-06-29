function connected(target, propertyKey) {
  const connectedCallback = target.connectedCallback ?? (() => undefined);

  Reflect.defineProperty(target, "connectedCallback", {
    async value() {
      await Reflect.apply(connectedCallback, this, arguments);
      await this[propertyKey](...arguments);
    },
    writable: true,
  });
}

export default connected;
