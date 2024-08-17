import intercept, { exec } from "../intercept";
import { didPaintCallback } from "../interfaces";

/**
 * Cria um decorator para adicionar lógica ao método `didPaintCallback` de um Custom Element.
 *
 * @param target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param propertyKey - O nome do método decorado.
 * @returns Um decorator que intercepta a chamada do `didPaintCallback`.
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
