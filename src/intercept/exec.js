/**
 * Cria uma função que executa um método específico de um objeto.
 *
 * @param {string} propertyKey - O nome do método a ser executado.
 * @returns {Function} Uma função assíncrona que executa o método especificado no contexto do objeto.
 *
 * @description
 * A função `exec` é um utilitário que facilita a execução de métodos de um objeto em um contexto assíncrono.
 * Ele retorna uma função que pode ser chamada com argumentos específicos para executar o método designado.
 * Isso é especialmente útil quando se precisa encapsular a execução de um método em diferentes partes do código
 * sem perder o contexto original do objeto.
 *
 * @example
 * const executeMyMethod = exec('myMethod');
 * await executeMyMethod.call(myObject, arg1, arg2);
 */
const exec = (propertyKey) =>
  async function (...args) {
    // Executa o método especificado com os argumentos fornecidos
    await this[propertyKey](...args);
  };

export default exec;
