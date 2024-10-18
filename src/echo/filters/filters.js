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
        `return data${/^\[/.test(propertyPath) ? "" : "."}${propertyPath}`,
      )(object);
    } catch (_error) {
      return undefined;
    }
  },

  /**
   * Inverte o valor booleano de um objeto.
   *
   * @param {*} object - O valor a ser invertido. Pode ser de qualquer tipo.
   * @returns {boolean} O valor booleano inverso do objeto fornecido.
   *
   * @description
   * A função `not` recebe qualquer tipo de valor e retorna o seu inverso booleano. Isso é útil para fazer
   * verificações rápidas em condições, onde você deseja saber se o valor é falsy (`null`, `undefined`, `0`, `false`, `''`, etc.).
   *
   * @example
   * const isActive = true;
   * console.log(filters.not(isActive)); // false
   *
   * const user = null;
   * console.log(filters.not(user)); // true
   */
  not: (object) => !object,
};

export default filters;
