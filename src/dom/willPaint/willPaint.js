import intercept, { exec } from "../../intercept";
import { willPaintCallback } from "../interfaces";

/**
 * Cria um decorator para adicionar lógica ao método `willPaintCallback` de um Custom Element.
 *
 * Este decorator intercepta a chamada do `willPaintCallback` e garante que o método decorado
 * seja chamado antes do callback `willPaintCallback` ser executado. Isso permite que a lógica
 * personalizada seja executada antes que o componente seja pintado.
 *
 * @param {Function} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} - O decorator que intercepta a chamada do `willPaintCallback`.
 *
 * @description
 * O decorator `willPaint` é utilizado para adicionar lógica personalizada ao ciclo de vida
 * de um componente, interceptando o `willPaintCallback`. Isso permite que o método decorado
 * seja executado antes do componente ser pintado, garantindo que qualquer lógica necessária
 * seja processada no momento adequado. É útil para preparar o componente ou modificar seu estado
 * antes que a renderização ocorra, assegurando que todas as condições necessárias estejam atendidas
 * antes da pintura.
 *
 * @example
 * // Exemplo de uso do decorator `willPaint`
 * class MeuComponente extends HTMLElement {
 *   @willPaint
 *   handleWillPaint() {
 *     // Lógica a ser executada antes do componente ser pintado
 *   }
 * }
 */
const willPaint = (target, propertyKey) => {
  // Cria uma instância do interceptor para o método `willPaintCallback`.
  const interceptor = intercept(willPaintCallback);

  // Adiciona o método decorado à lista de callbacks a serem executados.
  return interceptor
    .in(target) // Define o alvo do interceptor.
    .then(exec(propertyKey)); // Define o método a ser executado pelo interceptor.
};

export default willPaint;
