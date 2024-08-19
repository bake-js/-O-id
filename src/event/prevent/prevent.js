/**
 * Filtro que impede o comportamento padrão de um evento.
 *
 * @param event - O evento a ser filtrado.
 * @returns O próprio evento, após impedir o comportamento padrão.
 */
function prevent(event) {
  event.preventDefault();
  return event;
}

export default prevent;
