/**
 * Cria um decorator para adicionar lógica ao método `formDisabledCallback` de um Custom Element.
 *
 * @description
 * O decorator `formDisabled` permite adicionar lógica personalizada ao método `formDisabledCallback` de um
 * Custom Element. Este método é chamado automaticamente quando o elemento é desativado dentro de um formulário.
 * O decorator permite que você execute uma função personalizada durante esse processo.
 *
 * @param {Object} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} Um decorator que intercepta a chamada do `formDisabledCallback`.
 *
 * @example
 * // Exemplo de uso:
 * @formDisabled
 * formDisabledCallback() {
 *   console.log('O elemento foi desativado no formulário.');
 * }
 */
export declare function formDisabled(
  target: any,
  propertyKey: PropertyKey,
): void;
