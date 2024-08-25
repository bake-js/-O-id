/**
 * Decorator utilizado para renderizar o conteúdo do elemento customizado.
 * O decorator permite definir o HTML e os estilos de um Custom Element de forma
 * declarativa, garantindo que os ciclos de vida de renderização sejam respeitados.
 *
 * @param {Component} component - Uma função que retorna o conteúdo HTML a ser renderizado.
 * @param {Style} [style] - Uma função opcional que retorna o conteúdo CSS a ser renderizado.
 * @returns {Decorator} - Uma função que aplica o decorator a um elemento alvo.
 *
 * @example
 * // Exemplo de uso do decorator
 * @paint(
 *   (element) => `<div>${element.someProperty}</div>`,
 *   (element) => [new CSSStyleSheet()]
 * )
 * class MyComponent extends HTMLElement {
 *   connectedCallback() {
 *     console.log('MyComponent conectado');
 *   }
 * }
 */
export declare function paint(component: Component, style?: Style): Decorator;

/**
 * Tipo para uma função que retorna o conteúdo HTML a ser renderizado.
 *
 * @param {any} self - O elemento alvo que será renderizado.
 * @returns {string} - O conteúdo HTML a ser renderizado.
 */
type Component = (self: any) => string;

/**
 * Tipo para uma função que retorna o conteúdo CSS a ser renderizado.
 *
 * @param {any} self - O elemento alvo que será renderizado.
 * @returns {CSSStyleSheet[]} - O conteúdo CSS a ser renderizado.
 */
type Style = (self: any) => CSSStyleSheet[];

/**
 * Tipo para a função decoradora que aplica o decorator a um elemento alvo.
 *
 * @param {CustomElementConstructor} constructor - O construtor do elemento customizado.
 * @returns {void} - Não retorna nenhum valor.
 */
type Decorator = (constructor: CustomElementConstructor) => void;
