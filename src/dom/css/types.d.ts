/**
 * Cria uma instância de CSSStyleSheet a partir de um template literal.
 * Facilita a definição de estilos encapsulados para Web Components.
 *
 * @function
 * @param {TemplateStringsArray} strings - As partes literais do template string.
 * @param {...any} values - Os valores interpolados no template string.
 * @returns {CSSStyleSheet} A instância de CSSStyleSheet criada a partir do template literal.
 * @description Este helper simplifica a criação de folhas de estilo encapsuladas usando template literals, ideal para uso em Web Components.
 * @example
 * // Exemplo de uso do helper css
 * const styles = css`
 *   :host {
 *     display: block;
 *   }
 *   .button {
 *     color: ${buttonColor};
 *   }
 * `;
 * shadowRoot.adoptedStyleSheets = [styles];
 */
export declare function css(
  strings: TemplateStringsArray,
  ...values: any[]
): CSSStyleSheet;
