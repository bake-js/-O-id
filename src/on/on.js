const on = new Proxy(
  {},
  {
    get(_, event) {
      return (query) => (target, propertyKey) => {
        const connectedCallback = target.connectedCallback ?? (() => undefined);
        const disconnectedCallback =
          target.disconnectedCallback ?? (() => undefined);
        const controller = new AbortController();

        Reflect.defineProperty(target, "connectedCallback", {
          async value() {
            await Reflect.apply(connectedCallback, this, arguments);
            (this.shadowRoot ?? this).addEventListener(
              event,
              (event) =>
                event.target.matches(query) && this[propertyKey](event),
              { signal: controller.signal },
            );
            return this;
          },
          writable: true,
        });

        Reflect.defineProperty(target, "disconnectedCallback", {
          async value() {
            await Reflect.apply(disconnectedCallback, this, arguments);
            controller.abort();
            return this;
          },
          writable: true,
        });
      };
    },
  },
);

export default on;
