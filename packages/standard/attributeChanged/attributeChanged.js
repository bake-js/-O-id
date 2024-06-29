function attributeChanged(attributeName) {
  return (target, propertyKey) => {
    const attributeChangedCallback =
      target.attributeChangedCallback ?? (() => undefined);

    Reflect.defineProperty(target, "attributeChangedCallback", {
      async value(name, oldValue, newValue) {
        await Reflect.apply(attributeChangedCallback, this, arguments);
        name === attributeName && (await this[propertyKey](newValue, oldValue));
      },
      writable: true,
    });
  };
}

export default attributeChanged;
