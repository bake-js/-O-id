# Guia de Uso: Função `html`

A função `html` facilita a criação de templates HTML otimizados dentro de Web Components. Utilizando template literals, ela permite a inserção de variáveis diretamente no HTML, melhorando a legibilidade e a manutenção do código.

### Quando Usar

- **Templates Dinâmicos**: Ideal para gerar conteúdo HTML que muda conforme as propriedades do componente.
- **Interpolação de Variáveis**: Permite a inclusão de variáveis JavaScript diretamente no HTML, tornando o código mais expressivo.

### Estrutura

```javascript
/**
 * @param {TemplateStringsArray} strings - As partes literais da string do template.
 * @param {...any} values - Os valores interpolados na string do template.
 * @returns {string} O HTML gerado como uma string.
 */
const html = (strings, ...values) => {
  return String.raw({ raw: strings }, ...values)
    .replace(/\n\s*/g, ' ') // Remove quebras de linha e espaços em branco indesejados.
    .trim(); // Remove espaços em branco no início e no final da string.
};
```

### Parâmetros

1. **strings**:
   - **Tipo:** `TemplateStringsArray`
   - **Descrição:** As partes literais da string de template HTML.

2. **values**:
   - **Tipo:** `any[]`
   - **Descrição:** Os valores interpolados na string, que podem ser variáveis, expressões ou resultados de funções.

### Retorno

- **Tipo:** `string`
- **Descrição:** O HTML gerado como uma string, que pode ser utilizado diretamente no componente.

### Exemplo Prático

**Exemplo: Usando `html` e `@paint` para Gerar Templates Dinâmicos**

```javascript
import { define } from '@bake-js/-o-id';
import { css, html, paint } from '@bake-js/-o-id/dom';

// Função responsável por gerar o template HTML do componente
function component(self) {
  return html`
    <div>${self.text}</div>
  `;
}

// Função que retorna a folha de estilo dinâmica com interpolação de variáveis
function style() {
  return css`
    :host {
      display: block;
      background-color: lightblue;
      color: black;
    }
  `;
}

// Define o Web Component e associa o template e os estilos via @paint
@define('my-component')
@paint(component, style)
class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.text = 'Olá, Mundo!'; // Texto padrão a ser exibido no componente
  }
}
```

### Explicação:

- **Função `component(self)`**: Define o conteúdo HTML do componente, retornando o template via `html`. A variável `${self.text}` é interpolada diretamente no HTML, permitindo que o conteúdo seja dinâmico.
- **Função `style()`**: Retorna a folha de estilo gerada pela função `css`, aplicando um estilo básico ao componente, como cor de fundo e cor do texto.
- **Decorador `@paint`**: Aplica automaticamente o HTML e o CSS ao componente, integrando a lógica de renderização e estilização.
- **Uso de `@define`**: Registra o Web Component, tornando-o disponível para uso em qualquer parte do documento HTML.

### Benefícios

1. **Legibilidade**: A utilização de template literals com `html` melhora a clareza do código, permitindo uma fácil visualização do layout do componente.
2. **Flexibilidade**: A interpolação de variáveis permite que o conteúdo HTML mude dinamicamente, tornando o componente reativo a alterações de estado.
3. **Integração com Estilos**: A função `html` se integra perfeitamente com `css` e `@paint`, permitindo uma abordagem coesa para a criação de componentes.

### Considerações Finais

- **Uso em Web Components**: A função `html` é ideal para o desenvolvimento de Web Components, especialmente quando utilizada em conjunto com Shadow DOM e a API de estilos adotados.
- **Compatibilidade**: Verifique a compatibilidade do navegador para funcionalidades relacionadas a Web Components ao utilizar a função `html`.
