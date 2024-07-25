import trait from "../trait";

function paint(component, style) {
  return (target) => {
    const connectedCallback =
      target.prototype.connectedCallback ?? (() => undefined);

    Reflect.defineProperty(target.prototype, trait.paintCallback, {
      async value() {
        await this[trait.willPaintCallback]?.();
        await new Promise((resolve) => {
          requestAnimationFrame(() => {
            (this.shadowRoot ?? document).adoptedStyleSheets = style
              ? [style(this)]
              : [];
            (this.shadowRoot ?? this).innerHTML = component(this);
            resolve();
          });
        });
        await this[trait.didPaintCallback]?.();
      },
      writable: true,
    });

    Reflect.defineProperty(target.prototype, "connectedCallback", {
      async value() {
        await Reflect.apply(connectedCallback, this, arguments);
        await this[trait.paintCallback]();
        return this;
      },
      writable: true,
    });
  };
}

export default paint;
