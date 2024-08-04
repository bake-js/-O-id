function prevent(_target, _prop, descriptor) {
  const substituted = descriptor.value ?? (() => undefined);

  Object.assign(descriptor, {
    value(event) {
      event instanceof Event && event.preventDefault();
      return Reflect.apply(substituted, this, [event]);
    },
  });
}

export default prevent;
