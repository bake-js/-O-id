import {
  abortController,
  connectedCallback,
  disconnectedCallback,
} from "../event/interfaces";
import intercept from "../intercept";

/**
 * Configura um event listener no `parentElement` e o aplica como um decorator ao método alvo.
 *
 * @param {string} type - O tipo do evento a ser escutado (e.g., 'changed', 'updated').
 * @param {...Function} filters - Funções de filtro aplicadas ao evento antes de chamar o método decorado.
 * @returns {Function} - O decorator que adiciona a lógica de escuta ao método decorado.
 *
 * @description
 * Este decorator adiciona um event listener ao `parentElement` quando o elemento é conectado ao DOM e o
 * remove quando o elemento é desconectado. O event listener pode ser filtrado usando funções de filtro opcionais
 * fornecidas antes de chamar o método decorado. É útil para gerenciar eventos de forma declarativa em Custom Elements,
 * permitindo que o componente escute eventos do elemento pai.
 *
 * @example
 * import relay from '@bake-js/-o-id/relay';
 *
 * class ChildComponent extends HTMLElement {
 *   @relay.changed(prevent, stop)
 *   handleChanged(event) {
 *     console.log('Evento "changed" recebido do parentElement');
 *   }
 * }
 */
const attachEventListener =
  (type, ...filters) =>
  (target, propertyKey) => {
    intercept(connectedCallback)
      .in(target)
      .then(function () {
        const controller = (this[abortController] ??= new AbortController());
        const options = { signal: controller.signal };

        const listener = (event) => {
          this[propertyKey](
            filters.reduce((target, filter) => filter(target), event),
          );
        };

        this.parentElement.addEventListener(type, listener, options);
      });

    intercept(disconnectedCallback)
      .in(target)
      .then(function () {
        this[abortController].abort();
      });
  };

/**
 * Proxy para gerar os decorators dinamicamente com base no tipo de evento.
 *
 * @description
 * O `relay` gera decorators que permitem que um componente filho escute eventos do `parentElement`.
 * Diferente do `on`, ele não requer um seletor (`query`), já que o evento será sempre escutado no pai do elemento.
 *
 * @example
 * class MyComponent extends HTMLElement {
 *   @relay.changed(stop)
 *   onParentChanged(event) {
 *     console.log('O pai emitiu um evento "changed"');
 *   }
 * }
 */
const relay = new Proxy(
  {},
  {
    get:
      (_, type) =>
      (...filters) =>
        attachEventListener(type, ...filters),
  },
);

export default relay;
