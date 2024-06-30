import trait from "standard/trait";

function willPaint(target, propertyKey) {
  const willPaintCallback = target[trait.willPaint] ?? (() => undefined);

  Reflect.defineProperty(target, trait.willPaint, {
    async value() {
      await Reflect.apply(willPaintCallback, this, arguments);
      await this[propertyKey](...arguments);
      return this;
    },
    writable: true,
  });
}

export default willPaint;
