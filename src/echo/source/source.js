import {
  attributeChangedCallback,
  echoConnectedCallback,
  echoDisconnectedCallback,
  observedAttributes,
  on,
} from "../interfaces";

/**
 * Esta classe representa um elemento personalizado que utiliza os callbacks do Echo para gerenciar eventos
 * com base nas alterações de atributos.
 *
 * @extends HTMLElement
 *
 * @description
 * A `Source` é um Custom Element que observa mudanças em atributos específicos e, com base nessas mudanças,
 * executa callbacks de conexão e desconexão definidos no elemento pai. É particularmente útil em sistemas que
 * utilizam o Echo como Event Bus para comunicação entre componentes.
 */
class Source extends HTMLElement {
  /**
   * Define quais atributos devem ser observados.
   *
   * @returns {string[]} A lista de nomes dos atributos observados.
   *
   * @description
   * O `Source` observa o atributo definido como `on` para gerenciar a conexão e desconexão de eventos
   * de acordo com o protocolo do Echo.
   */
  static get [observedAttributes]() {
    return [on];
  }

  /**
   * Este método é chamado sempre que um dos atributos definidos em `observedAttributes` é alterado.
   * Ele garante que o elemento pai esteja definido e chama os callbacks de conexão e desconexão no elemento pai,
   * se eles existirem.
   *
   * @param {string} name - O nome do atributo que foi alterado.
   * @param {string|null} oldValue - O valor antigo do atributo antes da alteração.
   * @param {string|null} newValue - O novo valor do atributo após a alteração.
   * @returns {Promise<Source>} Uma promessa que resolve a instância atual após a execução do callback.
   *
   * @description
   * O `attributeChangedCallback` gerencia a resposta do elemento às mudanças nos atributos observados, como
   * a desconexão e reconexão de protocolos de eventos no Echo, garantindo que o comportamento do elemento
   * seja sempre consistente com as mudanças no DOM.
   */
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

customElements.define("o-id-echo-source", Source);
