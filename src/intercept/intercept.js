/**
 * Cria um interceptor para adicionar lógica a um método de um alvo.
 *
 * @param {string} propertyKey - O nome do método que será interceptado.
 * @returns {Object} - Um objeto com métodos para definir o alvo e adicionar lógica.
 */
const intercept = (propertyKey) => ({
  /**
   * Define o alvo do interceptor.
   *
   * @param {Object} target - O alvo do interceptor, geralmente a classe ou objeto.
   * @returns {Object} - Um objeto com o método `then` para adicionar lógica ao método interceptado.
   */
  in: (target) => ({
    /**
     * Adiciona a lógica a ser executada após o método original.
     *
     * @param {Function} substituent - A função que será executada após o método original.
     */
    then: (substituent) => {
      // Recupera o método original ou define um método padrão vazio
      const originalMethod = target[propertyKey] ?? (() => undefined);

      // Define um novo método no alvo que chama o método original e o substituente
      Reflect.defineProperty(target, propertyKey, {
        async value(...args) {
          // Executa o método original
          await Reflect.apply(originalMethod, this, args);
          // Executa o substituente
          await Reflect.apply(substituent, this, args);
          return this;
        },
        writable: true, // Permite que o método seja sobrescrito
      });
    },
  }),
});

export default intercept;
