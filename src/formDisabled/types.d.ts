/**
 * Cria um decorator para adicionar lógica ao método `formDisabledCallback` de um Custom Element.
 *
 * @param {Object} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} Um decorator que intercepta a chamada do `formDisabledCallback`.
 *
 * @description
 * O decorator `formDisabled` permite adicionar lógica personalizada ao método `formDisabledCallback` de um
 * Custom Element. Este método é chamado automaticamente quando o elemento é desativado dentro de um formulário.
 * O decorator permite que você execute uma função personalizada durante esse processo.
 *
 * @example
 * import { formDisabled } from '@bake-js/-o-id';
 *
 * class MyElement extends HTMLElement {
 *   constructor() {
 *     super();
 *     this.attachShadow({ mode: 'open' });
 *   }
 *
 *   @formDisabled
 *   handleFormDisabled() {
 *     console.log('O elemento foi desativado no formulário.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
export declare function formDisabled(
  target: any,
  propertyKey: PropertyKey,
): void;
