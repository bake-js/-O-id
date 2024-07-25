import trait from "../trait";

function repaint(_target, _propertyKey, descriptor) {
  const value = descriptor.value;

  Object.assign(descriptor, {
    async value() {
      await Reflect.apply(value, this, arguments);
      this.isConnected && (await this[trait.paintCallback]());
      return this;
    },
  });
}

export default repaint;
