import intercept from "../../intercept";
import { bus } from "../bus";
import {
  attributeChangedCallback,
  disconnectedCallback,
  dispatchEvent,
  observedAttributes,
  on,
  subscribeCallback,
} from "../interfaces";
import protocol from "../protocol";

const eventConnect = (target) => {
  const controller = new AbortController();

  Object.assign(target, {
    [observedAttributes]: [on, ...(target[observedAttributes] ?? [])],
  });

  intercept(disconnectedCallback)
    .in(target.prototype)
    .then(() => controller.abort());

  intercept(attributeChangedCallback)
    .in(target.prototype)
    .then(async function (name, oldValue, newValue) {
      name === on &&
        newValue !== oldValue &&
        (await this[subscribeCallback](newValue));
    });

  intercept(subscribeCallback)
    .in(target.prototype)
    .then(function (value) {
      const { name, topic, type } = protocol.from(value);

      console.log(value);

      bus.addEventListener(
        topic,
        (event) => {
          if (/^method$/.test(type)) this[name](event.detail);
          if (/^attribute$/.test(type)) this.setAttribute(name, event.detail);
          if (/^setter$/.test(type)) this[name] = event.detail;
          return this;
        },
        { signal: controller.signal },
      );
    });
};

export default eventConnect;
