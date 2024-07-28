const exec = (propertyKey) =>
  async function (...args) {
    await this[propertyKey](...args);
  };

export default exec;
