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

/**
 * Event Bus para comunicação entre componentes.
 *
 * @param Klass - A classe do Custom Element a ser estendida.
 * @returns A classe estendida com suporte ao Event Bus.
 */
const Echo = (Klass) =>
  class extends Klass {
    #controllers = {};

    // Observa os atributos definidos, incluindo o atributo `on`.
    static [observedAttributes] = [...(Klass[observedAttributes] ?? []), on];

    // Manipula as mudanças nos atributos observados.
    [attributeChangedCallback](name, oldValue, newValue) {
      if (name === on) {
        this[echoDisconnectedCallback](oldValue);
        this[echoConnectedCallback](newValue);
      }
      return this;
    }

    // Intercepta o momento em que o elemento é desconectado do DOM.
    [disconnectedCallback]() {
      Object.values(this.#controllers).forEach((controller) =>
        controller.abort(),
      );
      return this;
    }

    // Despacha eventos personalizados.
    [dispatchEvent](event) {
      super[dispatchEvent](event);
      const element = this.getAttribute(id) ?? this.localName;
      target.dispatchEvent(
        new CustomEvent(`${element}/${event.type}`, {
          detail: event.detail,
        }),
      );
    }

    // Conecta o protocolo de eventos, registrando os listeners.
    [echoConnectedCallback](protocol) {
      this.#controllers[protocol] = new AbortController();

      const [, topic, type, name] = protocol.match(
        /^([a-z0-9-_]+\/[a-z0-9-_]+):([a-z]+)\/([a-z0-9-_]+)$/i,
      );

      target.addEventListener(
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

    // Desconecta o protocolo de eventos, abortando os listeners.
    [echoDisconnectedCallback](protocol) {
      this.#controllers[protocol]?.abort();
      return this;
    }
  };

export default Echo;
