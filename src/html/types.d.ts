/**
 * Função utilizada para construir strings HTML com interpolação.
 *
 * @param {TemplateStringsArray} strings - As partes literais da string template.
 * @param {...any[]} values - Os valores interpolados na string template.
 * @returns {string} - A string HTML interpolada e formatada.
 */
export declare function html(
  strings: TemplateStringsArray,
  ...values: any[]
): string;
