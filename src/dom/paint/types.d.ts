/**
 * Decorator que adiciona suporte para renderização e estilização de um componente.
 * Este decorator permite definir o HTML e os estilos de um Custom Element de forma
 * declarativa, garantindo que os ciclos de vida de renderização sejam respeitados.
 *
 * @param {Function} component - Função que retorna o HTML a ser renderizado.
 * @param {Function} [style] - Função opcional que retorna as folhas de estilo a serem aplicadas.
 * @returns {Function} - O decorator para ser aplicado à classe do componente.
 *
 * @description
 * O decorator `paint` facilita a criação de componentes personalizados,
 * permitindo que a lógica de renderização e aplicação de estilos seja centralizada.
 * Ele intercepta os callbacks de ciclo de vida (`paintCallback`, `willPaintCallback`,
 * `didPaintCallback` e `connectedCallback`) para garantir que o componente seja renderizado
 * de forma correta, utilizando `requestAnimationFrame` para otimizar a atualização visual.
 *
 * Este decorator é particularmente útil para componentes que precisam de uma renderização
 * controlada e eficiente, com suporte a estilos encapsulados via `adoptedStyleSheets`.
 *
 * @example
 * @paint(
 *   (element) => `<div>${element.someProperty}</div>`,
 *   (element) => [new CSSStyleSheet()]
 * )
 * class MyComponent extends HTMLElement {
 *   connectedCallback() {
 *     console.log('MyComponent conectado');
 *   }
 * }
 *
 * customElements.define('my-component', MyComponent);
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
