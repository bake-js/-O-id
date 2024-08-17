/**
 * Cria uma folha de estilos CSS a partir de template literals.
 *
 * @param {TemplateStringsArray} strings - As partes literais da string do template.
 * @param {...any} values - Os valores interpolados na string do template.
 * @returns {CSSStyleSheet[]} Um array contendo a folha de estilos gerada.
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
