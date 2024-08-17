import intercept, { exec } from "../intercept";
import { connectedCallback } from "../interfaces";

/**
 * Decorator que adiciona lógica ao método `connectedCallback` de um Custom Element.
 *
 * @param target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param propertyKey - O nome do método decorado.
 * @returns Um decorator que intercepta a chamada do `connectedCallback`.
 */
const connected = (target, propertyKey) => {
  // Cria uma instância do interceptor para o método `connectedCallback`.
  const interceptor = intercept(connectedCallback);

  // Adiciona o método decorado à lista de callbacks a serem executados.
  interceptor
    .in(target) // Define o alvo do interceptor.
    .then(exec(propertyKey)); // Define o método a ser executado pelo interceptor.
};

export default connected;
