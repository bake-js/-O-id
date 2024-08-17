# HTML

O `html` é uma função template que simplifica a criação de strings HTML formatadas em JavaScript. Este helper faz parte da biblioteca Element, projetada para facilitar o desenvolvimento de Web Components.

## Visão Geral

### Nome e Classificação

- **Nome:** HTML
- **Classificação:** Template Literal

### Objetivo

Facilitar a criação de strings HTML a partir de templates literais, proporcionando uma forma limpa e organizada de escrever HTML dentro do JavaScript.

## Motivação

A função `html` oferece as seguintes vantagens:

1. **Leitura Facilitada:** Permite escrever HTML de maneira clara e legível dentro do código JavaScript.
2. **Interpolação de Valores:** Suporta a inserção de variáveis e expressões dentro das strings HTML.

## Aplicabilidade

Utilize a função `html` em situações onde é necessário gerar HTML dinâmico. Exemplos incluem:

- **Componentes Web Dinâmicos:** Para gerar markup HTML dentro de componentes personalizados.
- **Templates Dinâmicos:** Quando for necessário criar templates HTML que dependem de dados em tempo real.

## Importação

Para utilizar a função `html`, importe-a da seguinte forma:

```javascript
import { html } from '@bake-js/-o-id/dom';
```

## Estrutura

A função `html` usa template literals para criar e formatar strings HTML, removendo quebras de linha e espaços extras para manter o conteúdo limpo e organizado.

## Implementação

```javascript
/**
 * Gera uma string HTML formatada a partir de template literals.
 * Remove quebras de linha e espaços extras para garantir uma saída limpa.
 *
 * @param {TemplateStringsArray} strings - Strings do template literal.
 * @param {...any} values - Valores interpolados no template literal.
 * @returns {string} - String HTML formatada e limpa.
 */
function html(strings, ...values) {
  // Combina valores interpolados e remove quebras de linha e espaços extras
  const combinedValues = values.map(value =>
    Array.isArray(value) ? value.join("") : value
  );

  let content = String.raw({ raw: strings }, ...combinedValues);
  content = content
    .replace(/[\n\r]+/g, " ") // Remove quebras de linha
    .replace(/\s+/g, " ") // Substitui múltiplos espaços por um único espaço
    .replace(/>\s+</g, "><"); // Remove espaços entre tags

  return content.trim();
}

export default html;
```

### Exemplo de Uso

```javascript
import { html } from '@bake-js/-o-id/dom';

// Criação de um template HTML dinâmico
const template = html`
  <div class="container">
    <h1>${title}</h1>
    <p>${description}</p>
  </div>
`;

console.log(template);
// <div class="container"><h1>Title Goes Here</h1><p>Description goes here.</p></div>
```

## Usos Conhecidos

- **Componentes Web Dinâmicos:** Ideal para gerar markup HTML dentro de Web Components.
- **Templates HTML Dinâmicos:** Útil para criar templates HTML com base em dados dinâmicos.

## Padrões Relacionados

- **Template Literals:** Utiliza a funcionalidade de template literals do JavaScript para interpolação de valores.
- **Tagged Template Literals:** A função `html` é um exemplo de tagged template literal, permitindo a manipulação de strings de template.

## Considerações Finais

A função `html` oferece uma maneira eficiente e organizada de criar strings HTML dentro de JavaScript. Ao facilitar a interpolação de valores e a limpeza do conteúdo HTML, ela melhora a legibilidade do código e a experiência de desenvolvimento.
