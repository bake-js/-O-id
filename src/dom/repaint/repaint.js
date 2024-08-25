import { paintCallback } from "../interfaces";

/**
 * Decorator para chamar o callback de pintura após a execução do método original.
 *
 * O decorator garante que o callback `paintCallback` seja chamado após a execução do método original,
 * caso o elemento esteja conectado ao DOM. É útil para garantir que ações de pintura sejam feitas
 * no momento certo do ciclo de vida do componente.
 *
 * @param {Object} _target - O alvo do decorator (classe ou protótipo).
 * @param {string} _propertyKey - O nome da propriedade/método decorado.
 * @param {Object} descriptor - O descritor de propriedade/método.
 * @returns {void}
 *
 * @example
 * class MyComponent extends HTMLElement {
 *   @repaint
 *   async someMethod() {
 *     console.log('Método original executado');
 *   }
 *
 *   async paintCallback() {
 *     console.log('Callback de pintura chamado');
 *   }
 * }
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
