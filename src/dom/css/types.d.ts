/**
 * Cria uma folha de estilos CSS a partir de template literals.
 *
 * @param {TemplateStringsArray} strings - As partes literais da string do template.
 * @param {...any} values - Os valores interpolados na string do template.
 * @returns {CSSStyleSheet[]} Um array contendo a folha de estilos gerada.
 *
 * @description Esta função permite a criação dinâmica de folhas de estilo CSS utilizando
 * template literals, permitindo a interpolação de valores dentro da string CSS. Ela
 * retorna a folha de estilo gerada como um array de `CSSStyleSheet`.
 *
 * @example
 * import { css } from '@bake-js/-o-id/dom';
 *
 * const styles = css`
 *   body {
 *     background-color: ${backgroundColor};
 *   }
 * `;
 *
 * document.adoptedStyleSheets = [...document.adoptedStyleSheets, ...styles];
 */
export declare function css(
  strings: TemplateStringsArray,
  ...values: any[]
): CSSStyleSheet;
