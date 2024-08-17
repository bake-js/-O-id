import intercept, { exec } from "../intercept";
import { formStateRestoreCallback } from "../interfaces";

/**
 * Cria um decorator para adicionar lógica ao método `formStateRestoreCallback` de um Custom Element.
 *
 * @param target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param propertyKey - O nome do método decorado.
 * @returns Um decorator que intercepta a chamada do `formStateRestoreCallback`.
 */
const formStateRestore = (target, propertyKey) => {
  // Cria uma instância do interceptor para o método `formStateRestoreCallback`.
  const interceptor = intercept(formStateRestoreCallback);

  // Adiciona o método decorado à lista de callbacks a serem executados.
  return interceptor
    .in(target) // Define o alvo do interceptor.
    .then(exec(propertyKey)); // Define o método a ser executado pelo interceptor.
};

export default formStateRestore;
