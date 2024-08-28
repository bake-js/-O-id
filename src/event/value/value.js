/**
 * Extrai o valor de um campo de entrada associado ao evento.
 *
 * @param {Event} event - O evento que contém o campo de entrada.
 * @returns {string|undefined} O valor do campo de entrada, ou `undefined` se o campo não estiver presente.
 *
 * @description
 * Este filtro acessa o campo de entrada do evento e retorna seu valor. Se o evento ou o campo de entrada não
 * estiverem presentes, a função retornará `undefined`. É útil para obter rapidamente o valor de campos de entrada
 * em manipuladores de eventos.
 *
 * @example
 * function handleInput(event) {
 *   const inputValue = value(event);
 *   console.log('Valor do campo de entrada:', inputValue);
 * }
 */
function value(event) {
  return event.target.value;
}

export default value;
