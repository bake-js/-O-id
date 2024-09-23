/**
 * Configura um event listener e o aplica como um decorator ao método alvo.
 *
 * @param {string} type - O tipo do evento a ser ouvido (e.g., 'click').
 * @param {string} query - Seletor CSS para filtrar o alvo do evento.
 * @param {...Function} filters - Funções de filtro aplicadas ao evento antes de chamar o método decorado.
 * @returns {Function} - O decorator para adicionar lógica ao método decorado.
 *
 * @description
 * Este decorator adiciona um event listener ao elemento quando ele é conectado ao DOM e o remove quando o
 * elemento é desconectado. O event listener é filtrado usando filtros opcionais fornecidos antes de chamar o
 * método decorado. É útil para gerenciar eventos de forma declarativa em Custom Elements.
 *
 * @example
 * import on, { prevent, stop } from '@bake-js/-o-id/event';
 *
 * class MyComponent extends HTMLElement {
 *   @on.click('button', prevent, stop)
 *   handleClick(event) {
 *     console.log('Botão clicado');
 *   }
 * }
 */
export declare const on: {
  [event: string]: (
    query: string,
    ...filters: Array<(target: any) => any>
  ) => (target: any, propertyKey: PropertyKey) => void;
};
