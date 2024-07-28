import intercept from "../intercept";
import { connectedCallback, disconnectedCallback } from "../interfaces";

const on = new Proxy(
  {},
  {
    get: (_, eventName) => (query) => (target, propertyKey) => {
      const controller = new AbortController();

      intercept(connectedCallback)
        .in(target)
        .then(function () {
          (this.shadowRoot ?? this).addEventListener(
            eventName,
            (event) => event.target.matches(query) && this[propertyKey](event),
            { signal: controller.signal },
          );
        });

      intercept(disconnectedCallback)
        .in(target)
        .then(() => controller.abort());
    },
  },
);

export default on;
