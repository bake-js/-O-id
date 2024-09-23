/**
 * Decorator para chamar o callback de pintura após a execução do método ou atualização de propriedade original.
 *
 * O decorator garante que o callback `paintCallback` seja chamado após a execução do método original
 * ou após a atribuição de um novo valor para uma propriedade, caso o elemento esteja conectado ao DOM.
 * É útil para garantir que ações de pintura sejam feitas no momento certo do ciclo de vida do componente.
 *
 * @param {Object} _target - O alvo do decorator (classe ou protótipo).
 * @param {string} _propertyKey - O nome da propriedade/método decorado.
 * @param {Object} descriptor - O descritor de propriedade/método.
 * @returns {void}
 *
 * @description
 * O decorator `repaint` é utilizado para assegurar que, após a execução de um método decorado
 * ou a atualização de uma propriedade decorada, o callback `paintCallback` seja chamado se o
 * elemento estiver conectado ao DOM. Isso permite que a lógica de pintura do componente seja invocada
 * de forma automática e no momento certo, garantindo a consistência visual e comportamental do Custom Element.
 *
 * Esse decorator é especialmente útil em cenários onde o componente precisa atualizar sua interface
 * visual ou realizar outras ações relacionadas à pintura, sempre que um método específico ou propriedade
 * for atualizado.
 *
 * @example
 * import { repaint } from '@bake-js/-o-id/dom';
 *
 * class MyComponent extends HTMLElement {
 *   paintCallback() {
 *     console.log('Callback de pintura chamado');
 *   }
 *
 *   // Usando em um método
 *   @repaint
 *   handlePaint() {
 *     console.log('Método original executado');
 *   }
 *
 *   // Usando em uma propriedade
 *   #color;
 *
 *   @repaint
 *   set color(value) {
 *     this.#color = value;
 *   }
 *
 *   get color() {
 *     return this.#color;
 *   }
 * }
 */
export declare function repaint(
  target: any,
  propertyKey: PropertyKey,
  descriptor: PropertyDescriptor,
): void;
