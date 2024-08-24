import intercept, { exec } from "../intercept";
import { connectedCallback } from "../interfaces";

/**
 * Decorator que adiciona lógica ao método `connectedCallback` de um Custom Element.
 *
 * @param {Object} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} Um decorator que intercepta a chamada do `connectedCallback`.
 *
 * @description
 * O decorator `connected` é utilizado para adicionar lógica ao método `connectedCallback` de um Custom Element.
 * Quando o Custom Element é inserido no DOM, o método decorado é chamado. O decorator configura um interceptor
 * para que o método decorado seja executado quando o `connectedCallback` do Custom Element é invocado.
 *
 * @example
 * // Exemplo de uso do decorator `connected`
 * import { connected } from '@bake-js/-o-id';
 *
 * class MyElement extends HTMLElement {
 *   @connected
 *   handleConnected() {
 *     console.log('O elemento foi conectado ao DOM.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
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
