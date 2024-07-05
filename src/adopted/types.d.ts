/**
 * Decorator utilizado para modificar o comportamento do método `adoptedCallback` de um elemento customizado.
 * Permite a execução de ações adicionais ao adotar o elemento por outro documento.
 *
 * @param {any} target - O protótipo da classe do elemento customizado.
 * @param {PropertyKey} propertyKey - A chave da propriedade.
 */
export declare function adopted(target: any, propertyKey: PropertyKey): void;
