const on = new Proxy(
  {},
  {
    get(_, event) {
      return (query) => (target, propertyKey) => {
        const connectedCallback = target.connectedCallback ?? (() => undefined);

        const disconnectedCallback =
          target.disconnectedCallback ?? (() => undefined);

        function listener(event) {
          event.target.matches(query) && this[propertyKey](event);
        }

        Reflect.defineProperty(target, "connectedCallback", {
          async value() {
            await Reflect.apply(connectedCallback, this, arguments);
            (this.shadowRoot ?? this).addEventListener(
              event,
              listener.bind(this),
            );
            return this;
          },
          writable: true,
        });

        Reflect.defineProperty(target, "disconnectedCallback", {
          async value() {
            await Reflect.apply(disconnectedCallback, this, arguments);
            (this.shadowRoot ?? this).removeEventListener(
              event,
              listener.bind(this),
            );
            return this;
          },
          writable: true,
        });
      };
    },
  },
);

export default on;
