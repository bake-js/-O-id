function debounce(wait = 250) {
  return (_target, _propertyKey, descriptor) => {
    const value = descriptor.value;
    let timeout;

    Object.assign(descriptor, {
      value() {
        clearTimeout(timeout);
        timeout = setTimeout(() => Reflect.apply(value, this, arguments), wait);
        return this;
      },
    });
  };
}

export default debounce;
