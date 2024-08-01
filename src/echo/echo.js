import { echoTarget } from "./echoTarget";
import {
  attributeChangedCallback,
  connectedCallback,
  disconnectedCallback,
  dispatchEvent,
  echoConnectedCallback,
  echoDisconnectedCallback,
  id,
  observedAttributes,
  on,
} from "./interfaces";

const Echo = (Klass) =>
  class extends Klass {
    #controllers = {};

    static get [observedAttributes]() {
      return [...(Klass[observedAttributes] ?? []), on];
    }

    [attributeChangedCallback](name, oldValue, newValue) {
      name === on &&
        (this[echoDisconnectedCallback](oldValue),
        this[echoConnectedCallback](newValue));
      return this;
    }

    [disconnectedCallback]() {
      Object.values(this.#controllers).forEach((controller) =>
        controller.abort(),
      );
      return this;
    }

    [dispatchEvent](event) {
      super[dispatchEvent](event);
      echoTarget.dispatchEvent(
        new CustomEvent(`${this.getAttribute(id)}/${event.type}`, {
          detail: event.detail,
        }),
      );
    }

    [echoConnectedCallback](protocol) {
      this.#controllers[protocol] = new AbortController();

      const [, topic, type, name] = protocol.match(
        /^([a-z]+\/[a-z]+):([a-z]+)\/([a-z]+)$/,
      );

      echoTarget.addEventListener(
        topic,
        (event) => {
          if (/^method$/.test(type)) this[name](event.detail);
          if (/^attribute$/.test(type)) this.setAttribute(name, event.detail);
          if (/^setter$/.test(type)) this[name] = event.detail;
          return this;
        },
        { signal: this.#controllers[protocol].signal },
      );
      return this;
    }

    [echoDisconnectedCallback](protocol) {
      this.#controllers[protocol]?.abort();
      return this;
    }
  };

export default Echo;