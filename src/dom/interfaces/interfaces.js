/**
 * Nomes dos callbacks para o ciclo de vida dos Custom Elements.
 *
 * Esses são os nomes padrão utilizados para os callbacks do ciclo de vida dos Custom Elements.
 *
 * @constant {string} connectedCallback - Nome do callback chamado quando um Custom Element é inserido no DOM.
 */
export const connectedCallback = "connectedCallback";

/**
 * Símbolos utilizados como callbacks para o ciclo de vida dos Custom Elements.
 *
 * Estes símbolos são usados para definir e identificar callbacks específicos relacionados ao
 * processo de pintura e renderização de Custom Elements. Eles ajudam a garantir que a lógica
 * de renderização seja organizada e aplicada no momento apropriado durante o ciclo de vida do componente.
 *
 * @constant {Symbol} didPaintCallback - Representa o callback chamado após o componente ser pintado.
 * @constant {Symbol} paintCallback - Representa o callback chamado durante o processo de pintura do componente.
 * @constant {Symbol} willPaintCallback - Representa o callback chamado antes do componente ser pintado.
 */
export const didPaintCallback = Symbol("didPaintCallback");
export const paintCallback = Symbol("paintCallback");
export const willPaintCallback = Symbol("willPaintCallback");
