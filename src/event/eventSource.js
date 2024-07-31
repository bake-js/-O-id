import {
  attributeChangedCallback,
  eventConnectedCallback,
  observedAttributes,
  on,
} from "./interfaces";

class EventSource extends HTMLElement {
  static get [observedAttributes]() {
    return [on];
  }

  [attributeChangedCallback](_name, _oldValue, newValue) {
    setTimeout(() => this.parentElement?.[eventConnectedCallback]?.(newValue));
    return this;
  }
}

customElements.define("be-event-source", EventSource);
