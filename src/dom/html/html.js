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
const html = (strings, ...values) => {
  // Combina os valores interpolados, unindo arrays e convertendo-os para strings
  const combinedValues = values.map((value) =>
    Array.isArray(value) ? value.join("") : value,
  );

  // Cria o conteúdo final do template literal com valores interpolados
  let content = String.raw({ raw: strings }, ...combinedValues);

  // Remove quebras de linha, múltiplos espaços e espaços entre tags
  content = content
    .replace(/[\n\r]+/g, " ") // Remove quebras de linha
    .replace(/\s+/g, " ") // Substitui múltiplos espaços por um único espaço
    .replace(/>\s+</g, "><"); // Remove espaços entre tags

  // Retorna o conteúdo final, garantindo que espaços ao redor sejam removidos
  return content.trim();
};

export default html;
