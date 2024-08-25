/**
 * Cria uma folha de estilos CSS a partir de template literals.
 *
 * @function
 * @param {TemplateStringsArray} strings - As partes literais da string do template.
 * @param {...any} values - Os valores interpolados na string do template.
 * @returns {CSSStyleSheet[]} Um array contendo a folha de estilos gerada.
 * @description Esta função permite a criação dinâmica de folhas de estilo CSS utilizando template literals, permitindo a interpolação de valores dentro da string CSS. Ela retorna a folha de estilo gerada como um array de `CSSStyleSheet`.
 * @example
 * // Exemplo de uso da função css
 * const styles = css`
 *   body {
 *     background-color: ${backgroundColor};
 *   }
 * `;
 * document.adoptedStyleSheets = [...document.adoptedStyleSheets, ...styles];
 */
const css = (strings, ...values) => {
  // Cria uma nova instância de CSSStyleSheet.
  const styleSheet = new CSSStyleSheet();

  // Concatena as partes literais e os valores interpolados para formar o conteúdo CSS.
  const cssText = String.raw({ raw: strings }, ...values);

  // Substitui o conteúdo da folha de estilos com o texto CSS gerado.
  styleSheet.replaceSync(cssText);

  // Retorna um array com a folha de estilos criada.
  return [styleSheet];
};

export default css;
