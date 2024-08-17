import intercept, { exec } from "../intercept";
import { formAssociatedCallback } from "../interfaces";

/**
 * Cria um decorator para adicionar lógica ao método `formAssociatedCallback` de um Custom Element.
 *
 * @param target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param propertyKey - O nome do método decorado.
 * @returns Um decorator que intercepta a chamada do `formAssociatedCallback`.
 */
const formAssociated = (target, propertyKey) => {
  // Cria uma instância do interceptor para o método `formAssociatedCallback`.
  const interceptor = intercept(formAssociatedCallback);

  // Adiciona o método decorado à lista de callbacks a serem executados.
  return interceptor
    .in(target) // Define o alvo do interceptor.
    .then(exec(propertyKey)); // Define o método a ser executado pelo interceptor.
};

export default formAssociated;
