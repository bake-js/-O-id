/**
 * Cria uma função que executa um método específico de um objeto.
 *
 * @param {string} propertyKey - O nome do método a ser executado.
 * @returns {Function} - Uma função assíncrona que executa o método especificado no contexto do objeto.
 */
const exec = (propertyKey) =>
  /**
   * Executa o método especificado no contexto do objeto.
   *
   * @param {...any} args - Argumentos a serem passados para o método.
   * @returns {Promise} - Uma Promise que resolve quando o método for executado.
   */
  async function (...args) {
    // Executa o método especificado com os argumentos fornecidos
    await this[propertyKey](...args);
  };

export default exec;
