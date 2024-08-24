/**
 * Decorator para definir um Custom Element.
 *
 * @param {string} name - O nome do Custom Element a ser registrado.
 * @param {ElementDefinitionOptions} [options] - Opções adicionais para a definição do Custom Element.
 * @returns {Function} Um decorator que define o Custom Element.
 *
 * @description
 * O decorator `define` registra uma classe como um Custom Element com o nome e opções fornecidos.
 * Quando aplicado a uma classe, ele chama `customElements.define` para registrar a classe como um Custom Element
 * com o nome especificado. As opções adicionais podem ser usadas para fornecer configurações adicionais para a definição
 * do Custom Element.
 *
 * @example
 * // Exemplo de uso do decorator `define`
 * import { define } from '@bake-js/-o-id';
 *
 * @define('my-element', { extends: 'div' })
 * class MyElement extends HTMLDivElement {
 *   constructor() {
 *     super();
 *     this.textContent = 'Hello, world!';
 *   }
 * }
 */
export declare function define(
  name: string,
  options?: ElementDefinitionOptions,
): (constructor: CustomElementConstructor) => void;
