/**
 * Cria um decorator para adicionar lógica ao método `formResetCallback` de um Custom Element.
 *
 * @description
 * O decorator `formReset` permite adicionar lógica personalizada ao método `formResetCallback` de um
 * Custom Element. Este método é chamado automaticamente quando o formulário ao qual o elemento pertence
 * é redefinido. O decorator possibilita a execução de uma função personalizada durante esse processo.
 *
 * @param {Object} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} Um decorator que intercepta a chamada do `formResetCallback`.
 *
 * @example
 * // Exemplo de uso:
 * @formReset
 * formResetCallback() {
 *   console.log('O formulário foi redefinido.');
 * }
 */
export declare function formReset(target: any, propertyKey: PropertyKey): void;
