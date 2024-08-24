/**
 * Nomes dos callbacks para o ciclo de vida dos Custom Elements.
 *
 * Esses são os nomes padrão utilizados para os callbacks do ciclo de vida dos Custom Elements.
 *
 * @constant {string} adoptedCallback - Nome do callback chamado quando um Custom Element é adotado por um novo documento.
 * @constant {string} attributeChangedCallback - Nome do callback chamado quando um atributo de um Custom Element é alterado.
 * @constant {string} connectedCallback - Nome do callback chamado quando um Custom Element é inserido no DOM.
 * @constant {string} disconnectedCallback - Nome do callback chamado quando um Custom Element é removido do DOM.
 */
export const adoptedCallback = "adoptedCallback";
export const attributeChangedCallback = "attributeChangedCallback";
export const connectedCallback = "connectedCallback";
export const disconnectedCallback = "disconnectedCallback";

/**
 * Nomes dos callbacks específicos para a interação com formulários.
 *
 * Esses são os nomes padrão utilizados para os callbacks que interagem com formulários.
 *
 * @constant {string} formAssociatedCallback - Nome do callback chamado quando um Custom Element é associado a um formulário.
 * @constant {string} formDisabledCallback - Nome do callback chamado quando um formulário é desativado.
 * @constant {string} formResetCallback - Nome do callback chamado quando um formulário é redefinido.
 * @constant {string} formStateRestoreCallback - Nome do callback chamado quando o estado do formulário é restaurado.
 */
export const formAssociatedCallback = "formAssociatedCallback";
export const formDisabledCallback = "formDisabledCallback";
export const formResetCallback = "formResetCallback";
export const formStateRestoreCallback = "formStateRestoreCallback";

/**
 * Nome do atributo para observação de atributos no Custom Element.
 *
 * Este é o nome padrão utilizado para armazenar os atributos observados em um Custom Element.
 *
 * @constant {string} observedAttributes - Nome do atributo que contém a lista de atributos observados.
 */
export const observedAttributes = "observedAttributes";
