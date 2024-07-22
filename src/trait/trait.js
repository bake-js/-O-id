const trait = new Proxy(
  {},
  {
    get: (target, key) => (target[key] ??= Symbol(key)),
  },
);

export default trait;
