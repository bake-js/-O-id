/**
 * Decorator que adiciona lógica ao método `adoptedCallback` de um Custom Element.
 *
 * @param {Function} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} Um decorator que intercepta a chamada do `adoptedCallback`.
 *
 * @description
 * O decorator `adopted` permite que o método decorado seja chamado quando um Custom Element
 * é movido para um novo documento (ou seja, quando é adotado em um novo contexto de documento).
 * Ele usa o interceptor `intercept` para garantir que a lógica de `adoptedCallback` seja executada
 * de forma adequada, centralizando a lógica e mantendo a integridade dos métodos de callback.
 *
 * @example
 * // Exemplo de uso de `adopted` em um Custom Element
 * import { adopted } from '@bake-js/-o-id';
 *
 * class MyElement extends HTMLElement {
 *   @adopted
 *   adoptedCallback() {
 *     console.log('Elemento foi adotado.');
 *   }
 * }
 * customElements.define('my-element', MyElement);
 */
export declare function adopted(target: any, propertyKey: PropertyKey): void;
