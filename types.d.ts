/**
 * Função decoradora para definir elementos personalizados.
 *
 * @param {string} tagName - O nome do elemento personalizado.
 * @param {ElementDefinitionOptions} options - As opções para definir o elemento personalizado.
 * @returns {Function} - Uma função decoradora para definir a classe do elemento personalizado.
 */
export declare function define(
	tagName: string,
	options?: ElementDefinitionOptions,
): (constructor: CustomElementConstructor) => void;
