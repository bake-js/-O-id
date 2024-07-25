import trait from "../trait";

function willPaint(target, propertyKey) {
  const willPaintCallback = target[trait.willPaint] ?? (() => undefined);

  Reflect.defineProperty(target, trait.willPaintCallback, {
    async value() {
      await Reflect.apply(willPaintCallback, this, arguments);
      await this[propertyKey](...arguments);
      return this;
    },
    writable: true,
  });
}

export default willPaint;
