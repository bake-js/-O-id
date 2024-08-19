/**
 * Filtro que extrai o valor de um campo de entrada associado ao evento.
 *
 * @param event - O evento que contém o campo de entrada.
 * @returns O valor do campo de entrada.
 */
function value(event) {
  return event?.target?.value;
}

export default value;
