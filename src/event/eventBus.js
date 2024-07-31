import { eventTarget } from "./eventTarget";
import {
  attributeChangedCallback,
  connectedCallback,
  disconnectedCallback,
  dispatchEvent,
  eventConnectedCallback,
  id,
  observedAttributes,
  on,
} from "./interfaces";

const EventBus = (Klass) =>
  class extends Klass {
    #controllers = {};

    static get [observedAttributes]() {
      return [...(Klass[observedAttributes] ?? []), on];
    }

    [dispatchEvent](event) {
      super[dispatchEvent](event);
      eventTarget.dispatchEvent(
        new CustomEvent(`${this.getAttribute(id)}/${event.type}`, {
          detail: event.detail,
        }),
      );
    }

    [attributeChangedCallback](name, _oldValue, newValue) {
      name === on && this[eventConnectedCallback](newValue);
      return this;
    }

    [eventConnectedCallback](protocol) {
      this.#controllers[protocol] = new AbortController();

      const [, topic, type, name] = protocol.match(
        /^([a-z]+\/[a-z]+):([a-z]+)\/([a-z]+)$/,
      );

      eventTarget.addEventListener(
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

    [disconnectedCallback]() {
      Object.values(this.#controllers).forEach((controller) =>
        controller.abort(),
      );
      return this;
    }
  };

export default EventBus;
