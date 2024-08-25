/**
 * Decorator utilizado para definir um método como manipulador de pintura.
 * O método decorado será chamado após o método decorado com `@paint`.
 *
 * @function
 * @param {any} target - O alvo do decorator, geralmente a classe ou protótipo do Custom Element.
 * @param {PropertyKey} propertyKey - A chave da propriedade, normalmente o nome do método.
 * @returns {void}
 * @description O decorator `didPaint` permite que métodos específicos sejam executados como parte do ciclo de vida de um Custom Element, logo após a renderização.
 * @example
 * // Exemplo de uso do decorator didPaint
 * class MyComponent extends HTMLElement {
 *   @didPaint
 *   didPaintCallback() {
 *     console.log('O componente foi pintado!');
 *   }
 * }
 */
export declare function didPaint(target: any, propertyKey: PropertyKey): void;
