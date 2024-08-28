/**
 * Cria um decorator para adicionar lógica ao método `formStateRestoreCallback` de um Custom Element.
 *
 * @param {Object} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} Um decorator que intercepta a chamada do `formStateRestoreCallback`.
 *
 * @description
 * O decorator `formStateRestore` permite que um método seja executado quando o estado do formulário
 * é restaurado para o Custom Element. O método decorado é chamado automaticamente quando o estado
 * do formulário é restaurado, permitindo a execução de lógica personalizada durante esse processo.
 *
 * @example
 * import { formStateRestore } from '@bake-js/-o-id';
 *
 * class MyElement extends HTMLElement {
 *   constructor() {
 *     super();
 *     this.attachShadow({ mode: 'open' });
 *   }
 *
 *   @formStateRestore
 *   handleFormStateRestore() {
 *     console.log('O estado do formulário foi restaurado.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
export declare function formStateRestore(
  target: any,
  propertyKey: PropertyKey,
): void;
