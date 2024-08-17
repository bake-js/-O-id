/**
 * Decorator para definir um Custom Element.
 *
 * Este decorator registra uma classe como um Custom Element com o nome e opções fornecidos.
 *
 * @param {string} name - O nome do Custom Element a ser registrado.
 * @param {ElementDefinitionOptions} [options] - Opções adicionais para a definição do Custom Element.
 * @returns {Function} Um decorator que define o Custom Element.
 */
const define = (name, options) => (constructor) => {
  // Define o Custom Element com o nome e opções fornecidos.
  customElements.define(name, constructor, options);
};

export default define;
