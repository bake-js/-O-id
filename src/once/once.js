function once(_target, _propertyKey, descriptor) {
  const value = descriptor.value;
  let executed = false;

  Object.assign(descriptor, {
    value() {
      if (executed) return this;
      executed = true;
      return Reflect.apply(value, this, arguments);
    },
  });
}

export default once;
