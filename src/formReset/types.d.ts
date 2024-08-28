/**
 * Cria um decorator para adicionar lógica ao método `formResetCallback` de um Custom Element.
 *
 * @description
 * O decorator `formReset` permite adicionar lógica personalizada ao método `formResetCallback` de um
 * Custom Element. Este método é chamado automaticamente quando o formulário ao qual o elemento pertence
 * é redefinido. O decorator possibilita a execução de uma função personalizada durante esse processo.
 *
 * @param {Object} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} Um decorator que intercepta a chamada do `formResetCallback`.
 *
 * @example
 * import { formReset } from '@bake-js/-o-id';
 *
 * class MyElement extends HTMLElement {
 *   constructor() {
 *     super();
 *     this.attachShadow({ mode: 'open' });
 *   }
 *
 *   @formReset
 *   handleFormReset() {
 *     console.log('O formulário foi redefinido.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
export declare function formReset(target: any, propertyKey: PropertyKey): void;
