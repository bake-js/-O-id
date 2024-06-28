/**
 * Decorator utilizado para definir um método como manipulador de pintura.
 * O método decorado será chamado antes do método `connectedCallback`.
 *
 * @param {any} target - O alvo do decorator.
 * @param {PropertyKey} propertyKey - A chave da propriedade.
 */
export declare function didPaint(target: any, propertyKey: PropertyKey): void;
