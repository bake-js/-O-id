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
   * Verifica se dois valores são iguais.
   *
   * @param {*} target - O valor a ser comparado.
   * @param {*} value - O valor de comparação.
   * @returns {boolean} `true` se os valores forem iguais, caso contrário, `false`.
   *
   * @example
   * console.log(filters.equals(5, 5)); // true
   * console.log(filters.equals('5', 5)); // true
   */
  equals: (target, value) => target == value,

  /**
   * Verifica se dois valores são diferentes.
   *
   * @param {*} target - O valor a ser comparado.
   * @param {*} value - O valor de comparação.
   * @returns {boolean} `true` se os valores forem diferentes, caso contrário, `false`.
   *
   * @example
   * console.log(filters.different(5, 6)); // true
   * console.log(filters.different('5', 5)); // false
   */
  different: (target, value) => target != value,

  /**
   * Verifica se um valor é maior que outro.
   *
   * @param {*} target - O valor a ser comparado.
   * @param {*} value - O valor de comparação.
   * @returns {boolean} `true` se o valor `target` for maior que `value`, caso contrário, `false`.
   *
   * @example
   * console.log(filters.gt(10, 5)); // true
   * console.log(filters.gt(5, 10)); // false
   */
  gt: (target, value) => target > value,

  /**
   * Verifica se um valor é maior ou igual a outro.
   *
   * @param {*} target - O valor a ser comparado.
   * @param {*} value - O valor de comparação.
   * @returns {boolean} `true` se o valor `target` for maior ou igual a `value`, caso contrário, `false`.
   *
   * @example
   * console.log(filters.gte(10, 10)); // true
   * console.log(filters.gte(5, 10)); // false
   */
  gte: (target, value) => target >= value,

  /**
   * Retorna o número de chaves em um objeto.
   *
   * @param {object} target - O objeto do qual contar as chaves.
   * @returns {number} O número de chaves no objeto.
   *
   * @example
   * const obj = { a: 1, b: 2, c: 3 };
   * console.log(filters.len(obj)); // 3
   */
  len: (target) => Object.keys(target)?.length,

  /**
   * Verifica se um valor é menor que outro.
   *
   * @param {*} target - O valor a ser comparado.
   * @param {*} value - O valor de comparação.
   * @returns {boolean} `true` se o valor `target` for menor que `value`, caso contrário, `false`.
   *
   * @example
   * console.log(filters.lt(5, 10)); // true
   * console.log(filters.lt(10, 5)); // false
   */
  lt: (target, value) => target < value,

  /**
   * Verifica se um valor é menor ou igual a outro.
   *
   * @param {*} target - O valor a ser comparado.
   * @param {*} value - O valor de comparação.
   * @returns {boolean} `true` se o valor `target` for menor ou igual a `value`, caso contrário, `false`.
   *
   * @example
   * console.log(filters.lte(5, 5)); // true
   * console.log(filters.lte(10, 5)); // false
   */
  lte: (target, value) => target <= value,

  /**
   * Inverte o valor booleano de um objeto.
   *
   * @param {*} target - O valor a ser invertido. Pode ser de qualquer tipo.
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
  not: (target) => !target,

  /**
   * Acessa uma propriedade aninhada de um objeto com base em um caminho de string.
   *
   * @param {object} target- O objeto alvo de onde a propriedade será extraída.
   * @param {string} path - O caminho da propriedade no formato de string. Pode incluir notação de ponto ou colchetes.
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
  prop: (target, path) => {
    try {
      return new Function(
        "target",
        `return target${/^\[/.test(path) ? "" : "."}${path}`,
      )(target);
    } catch (_error) {
      return undefined;
    }
  },
};

export default filters;
