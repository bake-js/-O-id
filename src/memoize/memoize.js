function memoize(_target, _propertyKey, descriptor) {
  const method = descriptor.get ?? descriptor.value;
  let cache;

  Object.assign(descriptor, {
    [method]() {
      return (cache ??= Reflect.apply(value, this, arguments));
    },
  });
}

export default memoize;
