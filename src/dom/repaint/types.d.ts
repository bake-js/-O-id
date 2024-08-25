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
export declare function repaint(
  target: any,
  propertyKey: PropertyKey,
  descriptor: PropertyDescriptor,
): void;
