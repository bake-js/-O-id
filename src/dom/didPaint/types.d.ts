/**
 * Cria um decorator que intercepta e adiciona lógica ao método `didPaintCallback` de um Custom Element.
 *
 * @param {Object} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {void} Um decorator que intercepta a chamada do `didPaintCallback`.
 *
 * @description
 * O decorator `didPaint` permite que desenvolvedores de Custom Elements adicionem
 * lógica adicional ao ciclo de vida do componente, especificamente após a renderização.
 *
 * @example
 * import { didPaint } from '@bake-js/-o-id/dom';
 *
 * class MyComponent extends HTMLElement {
 *   @didPaint
 *   handleDidPaint() {
 *     console.log('O componente foi pintado!');
 *   }
 * }
 */
export declare function didPaint(target: any, propertyKey: PropertyKey): void;
