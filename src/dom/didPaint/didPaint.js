import intercept, { exec } from "../../intercept";
import { didPaintCallback } from "../interfaces";

/**
 * Cria um decorator que intercepta e adiciona lógica ao método `didPaintCallback` de um Custom Element.
 *
 * @function
 * @param {Object} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {void} Um decorator que intercepta a chamada do `didPaintCallback`.
 * @description O decorator `didPaint` permite que desenvolvedores de Custom Elements adicionem lógica adicional ao ciclo de vida do componente, especificamente após a renderização.
 * @example
 * // Exemplo de uso do decorator didPaint
 * class MyComponent extends HTMLElement {
 *   @didPaint
 *   didPaintCallback() {
 *     console.log('O componente foi pintado!');
 *   }
 * }
 */
const didPaint = (target, propertyKey) => {
  // Cria uma instância do interceptor para o método `didPaintCallback`.
  const interceptor = intercept(didPaintCallback);

  // Adiciona o método decorado à lista de callbacks a serem executados.
  return interceptor
    .in(target) // Define o alvo do interceptor.
    .then(exec(propertyKey)); // Define o método a ser executado pelo interceptor.
};

export default didPaint;
