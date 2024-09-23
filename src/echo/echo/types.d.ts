/**
 * Mixin Echo para adicionar suporte a um Event Bus em um Custom Element.
 *
 * @param {typeof HTMLElement} Klass - A classe do Custom Element a ser estendida.
 * @returns {typeof HTMLElement} A classe estendida com suporte ao Event Bus.
 *
 * @description
 * Este mixin permite que um Custom Element participe de um Event Bus, escutando e emitindo eventos
 * de maneira centralizada. Atributos específicos, como `on`, são usados para definir as regras
 * de comunicação entre componentes.
 *
 * @example
 * import Echo from '@bake-js/-o-id/echo';
 *
 * class MyComponent extends Echo(HTMLElement) {
 *   connectedCallback() {
 *     console.log('MyComponent conectado');
 *   }
 * }
 *
 * customElements.define('my-component', MyComponent);
 */
export declare function Echo<T extends typeof HTMLElement>(Klass: T): T;
