import intercept from "../../intercept";
import {
  abortController,
  connectedCallback,
  disconnectedCallback,
} from "../interfaces";

/**
 * Configura um event listener e o aplica como um decorator ao método alvo.
 *
 * @param {string} type - O tipo do evento a ser ouvido (e.g., 'click').
 * @param {string} query - Seletor CSS para filtrar o alvo do evento.
 * @param {...Function} filters - Funções de filtro aplicadas ao evento antes de chamar o método decorado.
 * @returns {Function} - O decorator para adicionar lógica ao método decorado.
 *
 * @description
 * Este decorator adiciona um event listener ao elemento quando ele é conectado ao DOM e o remove quando o
 * elemento é desconectado. O event listener é filtrado usando filtros opcionais fornecidos antes de chamar o
 * método decorado. É útil para gerenciar eventos de forma declarativa em Custom Elements.
 *
 * @example
 * class MyComponent extends HTMLElement {
 *   @on.click('button', prevent, stop)
 *   handleClick(event) {
 *     console.log('Botão clicado');
 *   }
 * }
 */
const attachEventListener =
  (type, query, ...filters) =>
  (target, propertyKey) => {
    intercept(connectedCallback)
      .in(target)
      .then(function () {
        const controller = (this[abortController] ??= new AbortController());
        const options = { signal: controller.signal };

        const listener = (event) => {
          if (event.target.matches(query)) {
            this[propertyKey](
              filters.reduce((target, filter) => filter(target), event),
            );
          }
        };

        this.addEventListener(type, listener, options);
      });

    intercept(disconnectedCallback)
      .in(target)
      .then(function () {
        this[abortController].abort();
      });
  };

// Proxy para gerar os decorators dinamicamente com base no tipo de evento
const event = new Proxy(
  {},
  {
    get:
      (_, type) =>
      (query, ...filters) =>
        attachEventListener(type, query, ...filters),
  },
);

export default event;
