// Importa constantes de interfaces para definir os callbacks e atributos
import {
  attributeChangedCallback,
  echoConnectedCallback,
  echoDisconnectedCallback,
  observedAttributes,
  on,
} from "../interfaces";

// Define a classe `Source` que estende `HTMLElement`
class Source extends HTMLElement {
  // Define quais atributos devem ser observados
  static get [observedAttributes]() {
    return [on];
  }

  // Define o comportamento quando um atributo observado é alterado
  async [attributeChangedCallback](name, oldValue, newValue) {
    // Garante que o elemento pai esteja definido
    await customElements.whenDefined(this.parentElement.localName);

    // Executa o callback de desconexão no elemento pai, se definido
    this.parentElement?.[echoDisconnectedCallback]?.(oldValue);

    // Executa o callback de conexão no elemento pai, se definido
    this.parentElement?.[echoConnectedCallback]?.(newValue);

    return this;
  }
}

// Registra o componente customizado com o nome 'o-id-echo-source'
customElements.define("o-id-echo-source", Source);
