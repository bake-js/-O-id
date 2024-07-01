const trait = new Proxy(
  {},
  {
    get: (_, key) => Symbol.for(key),
  },
);

export default trait;
