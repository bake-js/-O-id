import { paintCallback } from "../interfaces";

const repaint = (_target, _propertyKey, descriptor) => {
  const value = descriptor.value;

  Object.assign(descriptor, {
    async value(...args) {
      await Reflect.apply(value, this, args);
      this.isConnected && (await this[paintCallback]());
      return this;
    },
  });
};

export default repaint;
