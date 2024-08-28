import intercept, { exec } from "../intercept";
import { adoptedCallback } from "../interfaces";

/**
 * Decorator que adiciona lógica ao método `adoptedCallback` de um Custom Element.
 *
 * @function
 * @param {Function} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} Um decorator que intercepta a chamada do `adoptedCallback`.
 *
 * @description
 * O decorator `adopted` permite que o método decorado seja chamado quando um Custom Element
 * é movido para um novo documento (ou seja, quando é adotado em um novo contexto de documento).
 * Ele usa o interceptor `intercept` para garantir que a lógica de `adoptedCallback` seja executada
 * de forma adequada, centralizando a lógica e mantendo a integridade dos métodos de callback.
 *
 * @example
 * import { adopted } from '@bake-js/-o-id';
 *
 * class MyElement extends HTMLElement {
 *   @adopted
 *   handleAdoption() {
 *     console.log('Elemento foi adotado.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
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
