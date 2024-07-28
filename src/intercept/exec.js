const exec = (propertyKey) =>
  function (...args) {
    this[propertyKey](...args);
  };

export default exec;
