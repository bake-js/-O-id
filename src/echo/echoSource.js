import {
  attributeChangedCallback,
  echoConnectedCallback,
  echoDisconnectedCallback,
  observedAttributes,
  on,
} from "./interfaces";

class EchoSource extends HTMLElement {
  static get [observedAttributes]() {
    return [on];
  }

  [attributeChangedCallback](_name, oldValue, newValue) {
    setTimeout(
      () => (
        this.parentElement?.[echoDisconnectedCallback]?.(oldValue),
        this.parentElement?.[echoConnectedCallback]?.(newValue)
      ),
    );
    return this;
  }
}

customElements.define("be-echo-source", EchoSource);
