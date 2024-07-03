/**
 * Decorator utilizado para renderizar o conteúdo do elemento customizado.
 *
 * @param {Component} component - Uma função assíncrona que retorna o conteúdo HTML a ser renderizado.
 * @returns {Decorator} - Uma função que aplica o decorator a um elemento alvo.
 */
export declare function paint(component: Component): Decorator;

/**
 * Função que retorna o conteúdo HTML a ser renderizado.
 *
 * @param {any} target - O elemento alvo que será renderizado.
 * @returns {Promise<string> | string} - O conteúdo HTML a ser renderizado.
 */
type Component = (target: any) => Promise<string> | string;

/**
 * Função decoradora que aplica o decorator a um elemento alvo.
 *
 * @param {CustomElementConstructor} constructor - O construtor do elemento customizado.
 * @returns {void} - Não retorna nenhum valor.
 */
type Decorator = (constructor: CustomElementConstructor) => void;