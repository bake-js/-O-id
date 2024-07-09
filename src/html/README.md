# HTML

Bem-vindo à documentação do `html`, uma função template que facilita a criação de strings HTML em JavaScript. Este pacote é parte integrante da biblioteca Element, que visa simplificar o desenvolvimento de Web Components.

## Documentação do Código

### Nome e Classificação

**Nome:** HTML

**Classificação:** Template Literal

### Interação e Objetivo

**Interação:** Esta função template é utilizada para criar strings HTML formatadas de maneira limpa e legível a partir de templates literais.

**Objetivo:** Facilitar a criação de strings HTML dentro de código JavaScript, mantendo o código legível e organizado.

### Também conhecido como

- Template de HTML
- Literal de HTML

### Motivação

A motivação para usar a função `html` é simplificar a construção de strings HTML em código JavaScript, permitindo:

1. **Leitura Facilitada:** Permite escrever HTML dentro de JavaScript de forma mais limpa e legível.
2. **Interpolação de Valores:** Suporta a interpolação de valores dentro da string HTML.

### Aplicabilidade

A função `html` é aplicável em situações onde é necessário gerar HTML dinâmico dentro de código JavaScript. É útil em cenários como:

- **Componentes Web Dinâmicos:** Para gerar markup HTML dentro de componentes web.
- **Templates Dinâmicos:** Quando é necessário criar templates HTML dinâmicos baseados em dados de runtime.

### Estrutura

A estrutura da função `html` é simples, utilizando template literals para construir e retornar a string HTML.

### Participantes

1. **Função Template (`html`)**:
   - **Descrição:** Gera strings HTML a partir de template literals.
   - **Responsabilidade:** Facilitar a criação de HTML dinâmico e legível em código JavaScript.

### Colaborações

A função `html` pode ser usada em conjunto com outras funções e decorators da biblioteca Element para criar componentes web dinâmicos e interativos.

### Consequências

#### Impactos Positivos

- **Legibilidade do Código:** Permite escrever HTML de forma legível e organizada dentro de JavaScript.
- **Facilidade de Interpolação:** Suporta interpolação de variáveis, tornando fácil a criação de HTML dinâmico.

#### Impactos Negativos

- **Complexidade em HTML Complexo:** Para HTML muito complexo, a string resultante pode se tornar difícil de gerenciar.

### Implementação

```javascript
function html(strings, ...values) {
  return String.raw({ raw: strings }, ...values).trim();
}

export default html;
```

### Exemplo de Uso

```javascript
import html from '@bake-js/element';

const template = html`
  <div class="container">
    <h1>${title}</h1>
    <p>${description}</p>
  </div>
`;

console.log(template);
// <div class="container">
//   <h1>Title Goes Here</h1>
//   <p>Description goes here.</p>
// </div>
```

### Usos Conhecidos

- **Componentes Web Dinâmicos:** Ideal para gerar markup HTML dinâmico dentro de componentes web.
- **Templates HTML Dinâmicos:** Útil para criar templates HTML dinâmicos baseados em dados de runtime.

### Padrões Relacionados

- **Template Literals:** Utiliza a funcionalidade de template literals do JavaScript para interpolação de valores.
- **Tagged Template Literals:** A função `html` é um exemplo de tagged template literal, permitindo manipulação de templates literais.

### Considerações Finais

A função `html` oferece uma solução eficaz para criar strings HTML de maneira legível e organizada dentro de código JavaScript. Ao permitir a interpolação de valores e a criação de HTML dinâmico, ela promove uma experiência de desenvolvimento mais simples e eficiente.
