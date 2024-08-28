/**
 * Decorator que adiciona lógica ao método `connectedCallback` de um Custom Element.
 *
 * @param {Object} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} Um decorator que intercepta a chamada do `connectedCallback`.
 *
 * @description
 * O decorator `connected` é utilizado para adicionar lógica ao método `connectedCallback` de um Custom Element.
 * Quando o Custom Element é inserido no DOM, o método decorado é chamado. O decorator configura um interceptor
 * para que o método decorado seja executado quando o `connectedCallback` do Custom Element é invocado.
 *
 * @example
 * import { connected } from '@bake-js/-o-id';
 *
 * class MyElement extends HTMLElement {
 *   @connected
 *   handleConnected() {
 *     console.log('O elemento foi conectado ao DOM.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
export declare function connected(target: any, propertyKey: PropertyKey): void;
