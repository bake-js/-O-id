/**
 * Filtro que interrompe a propagação de um evento.
 *
 * @param event - O evento a ser filtrado.
 * @returns O próprio evento, após interromper a propagação.
 */
function stop(event) {
  event.stopPropagation();
  return event;
}

export default stop;
