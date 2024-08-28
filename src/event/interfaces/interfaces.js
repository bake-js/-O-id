/**
 * Nomes dos callbacks para o ciclo de vida dos Custom Elements.
 *
 * Esses são os nomes padrão utilizados para os callbacks do ciclo de vida dos Custom Elements,
 * facilitando a padronização e a implementação consistente dos métodos relacionados ao ciclo de vida.
 *
 * @constant {string} connectedCallback - Nome do callback chamado quando um Custom Element é inserido no DOM.
 * @constant {string} disconnectedCallback - Nome do callback chamado quando um Custom Element é removido do DOM.
 */
export const connectedCallback = "connectedCallback";
export const disconnectedCallback = "disconnectedCallback";

/**
 * Símbolo utilizado para controlar e abortar eventos associados a um Custom Element.
 *
 * Este símbolo é usado para associar um `AbortController` a um Custom Element, permitindo o gerenciamento e
 * a interrupção de eventos quando o elemento é removido do DOM. É útil para evitar vazamentos de memória e
 * garantir que os eventos não sejam processados após o elemento ser desconectado.
 *
 * @constant {Symbol} abortController - Símbolo usado para armazenar e acessar o AbortController associado.
 */
export const abortController = Symbol("abortController");
