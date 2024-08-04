import intercept from "./intercept";
import { connectedCallback, disconnectedCallback } from "./interfaces";

const on = new Proxy(
  {},
  {
    get: (_, type) => (query) => (target, propertyKey) => {
      const controller = new AbortController();
      const options = { signal: controller.signal };

      intercept(connectedCallback)
        .in(target)
        .then(function () {
          const listener = (event) =>
            event.target.matches(query) && this[propertyKey](event);

          this.addEventListener(type, listener, options);
          this.shadowRoot?.addEventListener(type, listener, options);
        });

      intercept(disconnectedCallback)
        .in(target)
        .then(() => controller.abort());
    },
  },
);

export default on;
