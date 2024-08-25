import intercept, { exec } from "../intercept";
import { formDisabledCallback } from "../interfaces";

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
const formDisabled = (target, propertyKey) => {
  // Cria uma instância do interceptor para o método `formDisabledCallback`.
  const interceptor = intercept(formDisabledCallback);

  // Adiciona o método decorado à lista de callbacks a serem executados.
  return interceptor
    .in(target) // Define o alvo do interceptor.
    .then(exec(propertyKey)); // Define o método a ser executado pelo interceptor.
};

export default formDisabled;
