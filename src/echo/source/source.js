import {
  attributeChangedCallback,
  echoConnectedCallback,
  echoDisconnectedCallback,
  observedAttributes,
  on,
} from "../interfaces";

/**
 * A classe `Source` representa um elemento personalizado que interage com o Echo Event Bus para gerenciar eventos
 * com base nas alterações de atributos.
 *
 * @description
 * `Source` é um Custom Element que observa mudanças em atributos específicos, como `on`, e chama callbacks de
 * conexão e desconexão conforme o protocolo Echo. Ele é usado para permitir comunicação reativa entre componentes
 * baseados em eventos, como o exemplo do formulário com campos que reagem a resultados de APIs externas.
 *
 * @example
 * <o-text-field name="cidade" label="Cidade" readonly>
 *   <o-echo-source on="viaCEP/success:setter/value|prop=localidade"></o-echo-source>
 * </o-text-field>
 */
class Source extends HTMLElement {
  /**
   * Define quais atributos devem ser observados.
   *
   * @returns {string[]} Uma lista de nomes de atributos que serão observados pelo componente.
   *
   * @description
   * O `Source` observa o atributo `on`, que define a comunicação de eventos entre o Echo e o componente.
   * Isso permite que o componente execute ações baseadas em eventos definidos no Echo, como setar valores
   * ou chamar métodos com base nos resultados de eventos.
   */
  static get [observedAttributes]() {
    return [on];
  }

  /**
   * Callback chamado quando um atributo observado é alterado.
   *
   * @param {string} name - O nome do atributo que foi alterado.
   * @param {string|null} oldValue - O valor anterior do atributo antes da alteração.
   * @param {string|null} newValue - O novo valor do atributo após a alteração.
   * @returns {Promise<Source>} Uma Promise que resolve a instância do componente após a execução dos callbacks.
   *
   * @description
   * O `attributeChangedCallback` é disparado quando o valor do atributo `on` muda. O componente então
   * executa callbacks de conexão e desconexão no elemento pai, que são definidos pelo Echo Event Bus.
   * Isso garante que o componente se ajuste dinamicamente a eventos conforme o estado muda no sistema.
   *
   * @example
   * <o-echo-source on="viaCEP/success:setter/value|prop=logradouro"></o-echo-source>
   */
  async [attributeChangedCallback](name, oldValue, newValue) {
    // Garante que o elemento pai esteja definido no DOM
    await customElements.whenDefined(this.parentElement.localName);

    // Desconecta o evento anterior se houver um callback de desconexão definido no pai
    this.parentElement?.[echoDisconnectedCallback]?.(oldValue);

    // Conecta o novo evento se houver um callback de conexão definido no pai
    this.parentElement?.[echoConnectedCallback]?.(newValue);

    return this;
  }
}

customElements.get("o-echo-source") ??
  customElements.define("o-id-echo-source", Source);
