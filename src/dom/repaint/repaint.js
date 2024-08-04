import { paintCallback } from "../interfaces";

const repaint = (_target, _propertyKey, descriptor) => {
  const substituted = descriptor.value ?? (() => undefined);

  Object.assign(descriptor, {
    async value(...args) {
      await Reflect.apply(substituted, this, args);
      this.isConnected && (await this[paintCallback]());
      return this;
    },
  });
};

export default repaint;
