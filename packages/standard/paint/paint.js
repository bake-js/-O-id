import trait from "standard/trait";

function paint(component) {
  return (target) => {
    const connectedCallback = target.connectedCallback ?? (() => undefined);

    Reflect.defineProperty(target, trait.paint, {
      async value() {
        await this[trait.willPaint]?.();
        (this.shadownRoot ?? this).innerHTML = await component(this);
        await this[trait.didPaint]?.();
      },
      writable: true,
    });

    Reflect.defineProperty(target, "connectedCallback", {
      async value() {
        await Reflect.apply(connectedCallback, this, arguments);
        await this[trait.paint]();
        return this;
      },
      writable: true,
    });
  };
}

export default paint;
