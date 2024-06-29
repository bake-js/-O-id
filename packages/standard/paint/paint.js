const willPaint = Symbol.for("willPaint");
const paintCallback = Symbol.for("paint");
const didPaint = Symbol.for("didPaint");

function paint(component) {
  return (target) => {
    const connectedCallback = target.connectedCallback ?? (() => undefined);

    Reflect.defineProperty(target, paintCallback, {
      async value() {
        await this[willPaint]?.();
        (this.shadownRoot ?? this).innerHTML = await component(this);
        await this[didPaint]?.();
      },
    });

    Reflect.defineProperty(target, "connectedCallback", {
      async value() {
        await Reflect.apply(connectedCallback, this, arguments);
        await this[paintCallback]();
      },
      writable: true,
    });
  };
}

export default paint;
