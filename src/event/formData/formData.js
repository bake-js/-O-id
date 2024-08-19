/**
 * Filtro que converte os dados de um formulário em um objeto.
 *
 * @param event - O evento que contém os dados do formulário.
 * @returns Um objeto contendo os dados do formulário.
 */
const formData = (event) =>
  Object.fromEntries(new FormData(event.target, event.submitter));

export default formData;
