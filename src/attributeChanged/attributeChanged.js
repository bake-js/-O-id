function attributeChanged(attributeName) {
  return (target, propertyKey) => {
    const attributeChangedCallback =
      target.attributeChangedCallback ?? (() => undefined);

    Object.assign(target.constructor, {
      observedAttributes: [
        attributeName,
        ...(target.constructor.observedAttributes ?? []),
      ],
    });

    Reflect.defineProperty(target, "attributeChangedCallback", {
      async value(name, oldValue, newValue) {
        await Reflect.apply(attributeChangedCallback, this, arguments);
        name === attributeName &&
          oldValue !== newValue &&
          (await this[propertyKey](newValue, oldValue));
        return this;
      },
      writable: true,
    });
  };
}

export default attributeChanged;
