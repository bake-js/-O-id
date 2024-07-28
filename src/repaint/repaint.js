import { paintCallback } from "../interfaces";

const repaint = (_target, _propertyKey, descriptor) => {
  const value = descriptor.value;

  Object.assign(descriptor, {
    async value() {
      await Reflect.apply(value, this, arguments);
      this.isConnected && (await this[paintCallback]());
      return this;
    },
  });
};

export default repaint;
