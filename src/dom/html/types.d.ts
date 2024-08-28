/**
 * Helper para criar strings HTML limpas a partir de template literals.
 * Remove quebras de linha, espaços múltiplos e espaços entre tags.
 *
 * @param {TemplateStringsArray} strings - As partes literais do template string.
 * @param {...any} values - Os valores interpolados no template literal.
 * @returns {string} String HTML formatada e limpa.
 *
 * @description
 * A função `html` facilita a construção de strings HTML a partir de template literals,
 * otimizando o conteúdo ao remover espaços em excesso e quebras de linha desnecessárias.
 * Ela é útil para garantir que o HTML gerado seja compacto e bem formatado,
 * especialmente quando se trabalha com código dinâmico ou templates que são
 * renderizados a partir de várias partes. Além de melhorar a legibilidade do HTML,
 * também contribui para a performance ao reduzir o tamanho do conteúdo final.
 *
 * @example
 * const content = html`
 *   <div>
 *     <p>${'Texto'}</p>
 *   </div>
 * `;
 *
 * console.log(content); // "<div><p>Texto</p></div>"
 */
export declare function html(
  strings: TemplateStringsArray,
  ...values: any[]
): string;
