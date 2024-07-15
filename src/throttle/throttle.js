function throttle(wait = 250) {
  return (_target, _propertyKey, descriptor) => {
    const value = descriptor.value;
    let executed = false;
    let timeout;

    Object.assign(descriptor, {
      value() {
        clearTimeout(timeout);
        timeout = setTimeout(() => (executed = false), wait);

        if (!executed) {
          executed = true;
          Reflect.apply(value, this, arguments);
        }

        return this;
      },
    });
  };
}

export default throttle;
