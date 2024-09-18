/**
 * Configura um event listener no `parentElement` e o aplica como um decorator ao método alvo.
 *
 * @param {string} type - O tipo do evento a ser ouvido (e.g., 'change', 'click').
 * @param {...Function} filters - Funções de filtro aplicadas ao evento antes de chamar o método decorado.
 * @returns {Function} - O decorator para adicionar lógica ao método decorado.
 *
 * @description
 * Este decorator adiciona um event listener no `parentElement` do Custom Element quando ele é conectado ao DOM
 * e o remove quando o elemento é desconectado. O event listener pode ser filtrado usando filtros opcionais
 * antes de chamar o método decorado. Ideal para escutar eventos disparados pelo `parentElement`.
 *
 * @example
 * class MyComponent extends HTMLElement {
 *   @relay.change(prevent, stop)
 *   handleParentChange(event) {
 *     console.log('Parent element change event:', event);
 *   }
 * }
 */
export declare const relay: {
  [event: string]: (
    ...filters: Array<(event: any) => any>
  ) => (target: any, propertyKey: PropertyKey) => void;
};
