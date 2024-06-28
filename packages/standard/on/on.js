const on = new Proxy(
  {},
  {
    get (_, event) {
      return (query) => (target, propertyKey) => {
        const connectedCallback = target.connectedCallback ?? (() => undefined);

        const disconnectedCallback =
          target.disconnectedCallback ?? (() => undefined);

        function listener(this, event) {
          event.target.matches(query) && this[propertyKey](event);
        }

        Reflect.defineProperty(target, "connectedCallback", {
          async value() {
            listener.bind(this)
            await Reflect.apply(connectedCallback, this, arguments);
            await this.shadowRoot.addEventListener(event, listener);
          },
          writable: true,
        });

        Reflect.defineProperty(target, "disconnectedCallback", {
          async value() {
            await Reflect.apply(disconnectedCallback, this, arguments);
            await this.shadowRoot.removeEventListener(event, listener);
          },
          writable: true,
        });
      };
    },
  },
);

export default on;
