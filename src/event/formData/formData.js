/**
 * Converte os dados de um formulário em um objeto.
 *
 * @param {Event} event - O evento que contém os dados do formulário.
 * @returns {Object} Um objeto contendo os dados do formulário.
 *
 * @description
 * Este filtro cria um objeto a partir dos dados do formulário presente no evento,
 * facilitando o acesso e manipulação dos dados submetidos. A função utiliza a API
 * `FormData` para coletar os dados do formulário e a função `Object.fromEntries`
 * para converter os pares chave-valor em um objeto.
 *
 * @example
 * const handleSubmit = (event) => {
 *   event.preventDefault();
 *   const data = formData(event);
 *   console.log(data); // { nome: 'João', idade: '30' }
 * };
 */
const formData = (event) =>
  Object.fromEntries(new FormData(event.target, event.submitter));

export default formData;
