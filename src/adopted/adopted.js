import intercept, { exec } from "../intercept";
import { adoptedCallback } from "../interfaces";

/**
 * Decorator que adiciona lógica ao método `adoptedCallback` de um Custom Element.
 *
 * @param target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param propertyKey - O nome do método decorado.
 * @returns Um decorator que intercepta a chamada do `adoptedCallback`.
 */
const adopted = (target, propertyKey) => {
  // Cria uma instância do interceptor para o método `adoptedCallback`.
  const interceptor = intercept(adoptedCallback);

  // Adiciona o método decorado à lista de callbacks a serem executados.
  return interceptor
    .in(target) // Define o alvo do interceptor.
    .then(exec(propertyKey)); // Define o método a ser executado pelo interceptor.
};

export default adopted;
