import {
  attributeChangedCallback,
  disconnectedCallback,
  dispatchEvent,
  echoConnectedCallback,
  echoDisconnectedCallback,
  id,
  observedAttributes,
  on,
} from "../interfaces";
import { target } from "../target";
import { asdf } from "./asdf";

/**
 * Mixin Echo para adicionar suporte a um Event Bus em um Custom Element.
 *
 * @param {typeof HTMLElement} Klass - A classe do Custom Element a ser estendida.
 * @returns {typeof HTMLElement} A classe estendida com suporte ao Event Bus.
 *
 * @description
 * Este mixin permite que um Custom Element participe de um Event Bus, escutando e emitindo eventos
 * de maneira centralizada. Atributos específicos, como `on`, são usados para definir as regras
 * de comunicação entre componentes.
 *
 * @example
 * import Echo from './echo';
 *
 * class MyComponent extends Echo(HTMLElement) {
 *   connectedCallback() {
 *     console.log('MyComponent conectado');
 *   }
 * }
 *
 * customElements.define('my-component', MyComponent);
 */
const Echo = (Klass) =>
  class extends Klass {
    /**
     * Armazena os controladores de eventos registrados.
     *
     * @type {Object<string, AbortController>}
     * @private
     *
     * @description
     * A propriedade `#controllers` armazena instâncias de `AbortController` para cada protocolo de evento
     * registrado, permitindo o cancelamento dos eventos quando o componente é desconectado.
     */
    #controllers = {};

    /**
     * Lista de atributos observados pelo Custom Element.
     * Inclui o atributo `on`, necessário para o funcionamento do Event Bus.
     *
     * @type {string[]}
     *
     * @description
     * A propriedade `observedAttributes` define quais atributos do elemento devem ser observados
     * para alterações. O atributo `on` é incluído automaticamente para gerenciar a comunicação
     * de eventos entre componentes.
     */
    static [observedAttributes] = [...(Klass[observedAttributes] ?? []), on];

    /**
     * Callback que é chamado quando um atributo observado é alterado.
     *
     * @param {string} name - Nome do atributo que foi alterado.
     * @param {string|null} oldValue - O valor anterior do atributo.
     * @param {string|null} newValue - O novo valor do atributo.
     * @returns {this} - A instância do elemento.
     *
     * @description
     * Este método manipula mudanças em atributos observados, especialmente o atributo `on`.
     * Quando o atributo `on` é alterado, o componente se desconecta do protocolo antigo e se
     * conecta ao novo protocolo.
     *
     * @example
     * const element = document.querySelector('my-component');
     * element.setAttribute('on', 'sender/message:method/handleMessage');
     */
    [attributeChangedCallback](name, oldValue, newValue) {
      if (name === on) {
        this[echoDisconnectedCallback](oldValue);
        this[echoConnectedCallback](newValue);
      }
      return this;
    }

    /**
     * Callback que é chamado quando o elemento é desconectado do DOM.
     * Aborta todos os controladores de eventos registrados.
     *
     * @returns {this} - A instância do elemento.
     *
     * @description
     * Este método é invocado quando o componente é removido do DOM. Ele garante que todos os
     * eventos associados ao componente sejam corretamente abortados, prevenindo vazamento de
     * memória ou comportamento indesejado.
     *
     * @example
     * const element = document.querySelector('my-component');
     * document.body.removeChild(element); // Dispara o disconnectedCallback.
     */
    [disconnectedCallback]() {
      super[disconnectedCallback]?.();
      Object.values(this.#controllers).forEach((controller) =>
        controller.abort(),
      );
      return this;
    }

    /**
     * Despacha um evento personalizado e notifica o Event Bus.
     *
     * @param {CustomEvent} event - O evento a ser despachado.
     *
     * @description
     * Este método estende o comportamento padrão de `dispatchEvent` para incluir a notificação
     * ao Event Bus, permitindo que outros componentes escutem e respondam ao evento.
     *
     * @example
     * const event = new CustomEvent('messageSent', { detail: 'Hello World' });
     * element.dispatchEvent(event);
     */
    [dispatchEvent](event) {
      super[dispatchEvent](event);
      const element = this.getAttribute(id) ?? this.localName;
      target.dispatchEvent(
        new CustomEvent(`${element}/${event.type}`, {
          detail: event.detail,
        }),
      );
    }

    /**
     * Conecta o protocolo de eventos, registrando listeners de eventos baseados no protocolo.
     *
     * @param {string} protocol - O protocolo de eventos a ser conectado. O formato deve ser
     * `target/event:method|attribute|setter/target-name|filter1=value1|filter2=value2`.
     * @returns {this} - A instância do elemento.
     *
     * @description
     * Este método conecta o componente ao Event Bus, registrando listeners de eventos de acordo
     * com o protocolo especificado. O protocolo define como os eventos devem ser manipulados e quais
     * métodos, atributos ou setters devem ser atualizados em resposta aos eventos.
     *
     * O protocolo é dividido em várias partes:
     * - `target/event`: Identifica o evento a ser ouvido.
     * - `method|attribute|setter`: Especifica como o evento deve afetar o componente.
     * - `target-name`: O nome do método, atributo ou setter a ser atualizado.
     * - `filter1=value1|filter2=value2`: Filtros adicionais que serão aplicados aos eventos.
     *
     * @example
     * // Supondo que `element` seja uma instância de um componente que utiliza o Echo.
     * element[echoConnectedCallback]('sender/message:method/handleMessage|filter1=value1');
     *
     * @example
     * // Exemplo com um filtro complexo.
     * element[echoConnectedCallback]('sender/event:attribute/attributeName|filter1=value1|filter2=value2');
     */
    [echoConnectedCallback](protocol) {
      // Inicializa o AbortController para gerenciar o cancelamento do evento.
      this.#controllers[protocol] = new AbortController();

      // Utiliza uma expressão regular para extrair partes do protocolo.
      const [, topic, type, name, filtes] =
        protocol.match(
          /^([a-z0-9-_]+\/[a-z0-9-_]+):([a-z]+)\/([a-z0-9-_]+)(\|.*)?$/i,
        ) || [];

      // Processa filtros, se existirem.
      const segments = (filtes || "").split("|").filter(Boolean);
      const handlers = segments.map((filter) => {
        const [func, val] = filter.split("=");
        return [asdf[func], val];
      });

      // Adiciona o listener de eventos com o AbortController para gerenciamento.
      target.addEventListener(
        topic,
        (event) => {
          // Aplica os filtros ao detalhe do evento.
          const value = handlers.reduce(
            (accumulated, [func, val]) => func(accumulated, val),
            event.detail,
          );

          // Atualiza o componente baseado no tipo especificado.
          if (/^method$/.test(type)) this[name](value);
          if (/^attribute$/.test(type)) this.setAttribute(name, value);
          if (/^setter$/.test(type)) this[name] = value;

          return this;
        },
        { signal: this.#controllers[protocol].signal },
      );

      return this;
    }

    /**
     * Desconecta o protocolo de eventos, abortando os listeners registrados.
     *
     * @param {string} protocol - O protocolo de eventos a ser desconectado.
     * @returns {this} - A instância do elemento.
     *
     * @description
     * Este método desativa a conexão do componente ao Event Bus, removendo os listeners de
     * eventos associados ao protocolo especificado. É chamado automaticamente quando o
     * atributo `on` é alterado ou o componente é desconectado do DOM.
     *
     * @example
     * element[echoDisconnectedCallback]('sender/message:method/handleMessage');
     */
    [echoDisconnectedCallback](protocol) {
      this.#controllers[protocol]?.abort();
      return this;
    }
  };

export default Echo;
