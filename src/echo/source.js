import {
  attributeChangedCallback,
  echoConnectedCallback,
  echoDisconnectedCallback,
  observedAttributes,
  on,
} from "./interfaces";

class Source extends HTMLElement {
  static get [observedAttributes]() {
    return [on];
  }

  async [attributeChangedCallback](_name, oldValue, newValue) {
    await customElements.whenDefined(this.parentElement.localName);
    this.parentElement?.[echoDisconnectedCallback]?.(oldValue);
    this.parentElement?.[echoConnectedCallback]?.(newValue);
    return this;
  }
}

customElements.define("o-id-echo-source", Source);
