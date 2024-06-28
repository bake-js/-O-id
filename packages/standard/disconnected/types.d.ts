/**
 * Decorator utilizado para modificar o comportamento do método `disconnectedCallback` de um elemento customizado.
 * Permite a execução de ações adicionais ao desconectar o elemento do DOM.
 *
 * @param {any} target - O alvo do decorator.
 * @param {PropertyKey} propertyKey - A chave da propriedade.
 */
export declare function disconnected(
	target: any,
	propertyKey: PropertyKey,
): void;
