/**
 * Decorator utilizado para definir um método como manipulador de pintura.
 * O método decorado será chamado depois do método decorado com `@paint`.
 *
 * @param {any} target - O alvo do decorator.
 * @param {PropertyKey} propertyKey - A chave da propriedade.
 */
export declare function willPaint(target: any, propertyKey: PropertyKey): void;
