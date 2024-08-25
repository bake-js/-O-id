/**
 * Decorator utilizado para definir um método como manipulador de pintura.
 * O método decorado será chamado antes do método decorado com `@paint`.
 *
 * Este decorator intercepta a chamada do `willPaintCallback` e garante que o método decorado
 * seja chamado antes do componente ser pintado. Isso permite que a lógica personalizada
 * seja executada antes que o componente seja renderizado.
 *
 * @param {any} target - O alvo do decorator, geralmente a classe do Custom Element onde o método está definido.
 * @param {PropertyKey} propertyKey - O nome do método decorado.
 * @returns {void}
 *
 * @example
 * // Exemplo de uso do decorator `willPaint`
 * class MeuComponente extends HTMLElement {
 *   @willPaint
 *   async minhaLogica() {
 *     // Lógica a ser executada antes do componente ser pintado
 *   }
 * }
 */
export declare function willPaint(target: any, propertyKey: PropertyKey): void;
