import trait from "standard/trait";

function repaint(_target, _propertyKey, descriptor) {
  const value = descriptor.value;

  Object.assign(descriptor, {
    async value() {
      await Reflect.apply(value, this, arguments);
      await this[trait.paint]?.();
      return this;
    },
  });
}

export default repaint;
