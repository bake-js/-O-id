/**
 * Helper para criar strings HTML limpas a partir de template literals.
 * Remove quebras de linha, espaços múltiplos e espaços entre tags.
 *
 * @param {TemplateStringsArray} strings - As partes literais do template string.
 * @param {...any} values - Os valores interpolados no template literal.
 * @returns {string} - String HTML formatada e limpa.
 *
 * @example
 * const content = html`<div>
 *   <p>${'Texto'}</p>
 * </div>`;
 * console.log(content); // "<div><p>Texto</p></div>"
 */
export declare function html(
  strings: TemplateStringsArray,
  ...values: any[]
): string;
