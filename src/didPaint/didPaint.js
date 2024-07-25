import trait from "../trait";

function didPaint(target, propertyKey) {
  const didPaintCallback = target[trait.didPaintCallback] ?? (() => undefined);

  Reflect.defineProperty(target, trait.didPaintCallback, {
    async value() {
      await Reflect.apply(didPaintCallback, this, arguments);
      await this[propertyKey](...arguments);
      return this;
    },
    writable: true,
  });
}

export default didPaint;
