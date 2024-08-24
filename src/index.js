/**
 * Exporta decorators para gerenciamento de Custom Elements e suas interações.
 *
 * Estes decorators adicionam lógica a métodos específicos dos Custom Elements e
 * facilitam a integração com formulários e o ciclo de vida dos elementos.
 *
 * @module
 */

/**
 * Exporta o decorator `adopted` para adicionar lógica ao método `adoptedCallback`.
 *
 * @type {Function}
 * @default
 */
export { default as adopted } from "./adopted";

/**
 * Exporta o decorator `attributeChanged` para adicionar lógica ao método `attributeChangedCallback`.
 *
 * @type {Function}
 * @default
 */
export { default as attributeChanged } from "./attributeChanged";

/**
 * Exporta o decorator `connected` para adicionar lógica ao método `connectedCallback`.
 *
 * @type {Function}
 * @default
 */
export { default as connected } from "./connected";

/**
 * Exporta o decorator `define` para registrar um Custom Element.
 *
 * @type {Function}
 * @default
 */
export { default as define } from "./define";

/**
 * Exporta o decorator `disconnected` para adicionar lógica ao método `disconnectedCallback`.
 *
 * @type {Function}
 * @default
 */
export { default as disconnected } from "./disconnected";

/**
 * Exporta o decorator `formAssociated` para adicionar lógica ao método `formAssociatedCallback`.
 *
 * @type {Function}
 * @default
 */
export { default as formAssociated } from "./formAssociated";

/**
 * Exporta o decorator `formDisabled` para adicionar lógica ao método `formDisabledCallback`.
 *
 * @type {Function}
 * @default
 */
export { default as formDisabled } from "./formDisabled";

/**
 * Exporta o decorator `formReset` para adicionar lógica ao método `formResetCallback`.
 *
 * @type {Function}
 * @default
 */
export { default as formReset } from "./formReset";

/**
 * Exporta o decorator `formStateRestore` para adicionar lógica ao método `formStateRestoreCallback`.
 *
 * @type {Function}
 * @default
 */
export { default as formStateRestore } from "./formStateRestore";
