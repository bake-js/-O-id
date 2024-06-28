/**
 * Decorator utilizado para modificar o comportamento do método `connectedCallback` de um elemento customizado.
 * Permite a execução de ações adicionais ao conectar o elemento ao DOM.
 *
 * @param {any} target - O alvo do decorator.
 * @param {PropertyKey} propertyKey - A chave da propriedade.
 */
export declare function connected(target: any, propertyKey: PropertyKey): void;
