/**
 * Converte os dados de um formulário em um objeto.
 *
 * @param {Event} event - O evento que contém os dados do formulário.
 * @returns {Record<string, FormDataEntryValue>} Um objeto contendo os dados do formulário.
 *
 * @description
 * Este filtro cria um objeto a partir dos dados do formulário presente no evento,
 * facilitando o acesso e manipulação dos dados submetidos. A função utiliza a API
 * `FormData` para coletar os dados do formulário e a função `Object.fromEntries`
 * para converter os pares chave-valor em um objeto.
 *
 * @example
 * import { formData } from '@bake-js/-o-id/event';
 *
 * const handleSubmit = (event: Event) => {
 *   event.preventDefault();
 *   const data = formData(event);
 *   console.log(data); // { nome: 'João', idade: '30' }
 * };
 */
export declare const formData: (
  event: Event,
) => Record<string, FormDataEntryValue>;
