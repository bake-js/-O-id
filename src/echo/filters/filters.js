/**
 * Objeto `filters` que contém diversas funções utilitárias para manipulação de dados.
 *
 * @description
 * O objeto `filters` agrupa várias funções que podem ser usadas para acessar ou manipular propriedades
 * de objetos de forma dinâmica. Ele pode ser estendido com novos filtros conforme necessário.
 *
 * @example
 * const user = {
 *   name: 'Alice',
 *   address: {
 *     city: 'Wonderland',
 *   },
 * };
 *
 * // Acessa a propriedade 'address.city' usando o filtro `prop`
 * const cityName = filters.prop(user, 'address.city');
 * console.log(cityName); // 'Wonderland'
 */
const filters = {
  /**
   * Acessa uma propriedade aninhada de um objeto com base em um caminho de string.
   *
   * @param {Object} object- O objeto alvo de onde a propriedade será extraída.
   * @param {string} propertyPath - O caminho da propriedade no formato de string. Pode incluir notação de ponto ou colchetes.
   * @returns {*} O valor da propriedade acessada ou `undefined` se o caminho não for válido.
   *
   * @description
   * A função `prop` permite acessar propriedades aninhadas de um objeto de forma dinâmica, com base
   * em um caminho de string. O caminho pode ser composto por notação de ponto (por exemplo, `address.city`)
   * ou colchetes (por exemplo, `address['city']`). Caso o caminho seja inválido ou a propriedade não exista,
   * `undefined` será retornado.
   *
   * @example
   * const user = {
   *   name: 'Alice',
   *   address: {
   *     city: 'Wonderland',
   *   },
   * };
   *
   * const cityName = filters.prop(user, 'address.city');
   * console.log(cityName); // 'Wonderland'
   *
   * const invalidProp = filters.prop(user, 'address.country');
   * console.log(invalidProp); // undefined
   */
  prop: (object, propertyPath) => {
    try {
      return new Function(
        "data",
        `return data${/(^\[$)/.test(propertyPath) ? "" : "."}${propertyPath}`,
      )(object);
    } catch (_error) {
      return undefined;
    }
  },

  value: (_object, value) => value,
};

export default filters;
