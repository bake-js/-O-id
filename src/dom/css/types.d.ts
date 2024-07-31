/**
 * Helper para criar uma instância de CSSStyleSheet a partir de um template literal.
 * Facilita a definição de estilos encapsulados para Web Components.
 *
 * @param {TemplateStringsArray} strings - As partes literais do template string.
 * @param {...any} values - Os valores interpolados no template string.
 * @returns {CSSStyleSheet} - A instância de CSSStyleSheet criada a partir do template literal.
 */
export declare function css(
  strings: TemplateStringsArray,
  ...values: any[]
): CSSStyleSheet;
