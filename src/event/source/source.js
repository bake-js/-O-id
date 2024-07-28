import {
  attributeChangedCallback,
  observedAttributes,
  on,
  subscribeCallback,
} from "../interfaces";

class Source extends HTMLElement {
  static get [observedAttributes]() {
    return [on];
  }

  [attributeChangedCallback](_name, _oldValue, newValue) {
    setTimeout(() => this.parentElement?.[subscribeCallback]?.(newValue));
    return this;
  }
}

customElements.define("be-event-source", Source);
