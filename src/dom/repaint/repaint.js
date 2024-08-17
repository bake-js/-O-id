import { paintCallback } from "../interfaces";

/**
 * Decorator para chamar o callback de pintura após a execução do método original.
 *
 * @param {Object} _target - O alvo do decorator (classe ou protótipo).
 * @param {string} _propertyKey - O nome da propriedade/método decorado.
 * @param {Object} descriptor - O descritor de propriedade/método.
 * @returns {void}
 */
const repaint = (_target, _propertyKey, descriptor) => {
  // Obtém o valor original do método ou define uma função padrão vazia
  const originalMethod = descriptor.value ?? (() => undefined);

  // Modifica o descritor para adicionar a lógica de chamada do callback de pintura
  Object.assign(descriptor, {
    async value(...args) {
      // Executa o método original
      await Reflect.apply(originalMethod, this, args);

      // Se o elemento estiver conectado, chama o callback de pintura
      if (this.isConnected) {
        await this[paintCallback]();
      }

      // Retorna a instância do componente
      return this;
    },
  });
};

export default repaint;
