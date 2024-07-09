function throttle(wait = 250) {
  return (_target, _propertyKey, descriptor) => {
    const value = descriptor.value;
    let executed = false;

    Object.assign(descriptor, {
      value() {
        if (executed) return this;
        executed = true;
        setTimeout(() => (executed = false), wait);
        return Reflect.apply(value, this, arguments);
      },
    });
  };
}

export default throttle;
