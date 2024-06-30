function joinCut(method) {
  return (_target, _propertyKey, descriptor) => {
    const value = descriptor.value;

    Object.assign(descriptor, {
      async value() {
        await Reflect.apply(value, this, arguments);
        await this[method]?.();
        return this;
      },
    });
  };
}

export default joinCut;
