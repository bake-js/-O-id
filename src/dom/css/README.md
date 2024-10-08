# Guia de Uso: Função `css`

A função `css` facilita a criação de folhas de estilo dinâmicas dentro de Web Components, utilizando template literals. Ela permite interpolar variáveis JavaScript diretamente no CSS, e é especialmente útil quando usada com o Shadow DOM e a API `adoptedStyleSheets`.

### Quando Usar

- **Estilos Reativos**: Ideal para aplicar estilos que dependem de variáveis ou estados de componentes.
- **Componentização com Shadow DOM**: A função gera folhas de estilo diretamente compatíveis com o Shadow DOM, proporcionando isolamento de estilo.

### Estrutura

```javascript
/**
 * @param {TemplateStringsArray} strings - As partes literais da string do template.
 * @param {...any} values - Os valores interpolados na string do template.
 * @returns {CSSStyleSheet[]} Um array contendo a folha de estilos gerada.
 */
const css = (strings, ...values) => {
  const styleSheet = new CSSStyleSheet();
  const cssText = String.raw({ raw: strings }, ...values);
  styleSheet.replaceSync(cssText);
  return [styleSheet];
};
```

### Parâmetros

1. **strings**:
   - **Tipo:** `TemplateStringsArray`
   - **Descrição:** As partes literais da string de template CSS.

2. **values**:
   - **Tipo:** `any[]`
   - **Descrição:** Os valores interpolados na string, que podem ser variáveis, expressões ou resultados de funções.

### Retorno

- **Tipo:** `CSSStyleSheet[]`
- **Descrição:** Um array contendo uma ou mais folhas de estilo (`CSSStyleSheet`), que podem ser aplicadas diretamente ao componente com o Shadow DOM.

### Exemplo Prático

**Exemplo: Usando `@paint` e `css` para Gerar Estilos Dinâmicos**

```javascript
import { define } from '@bake-js/-o-id';
import { css, html, paint } from '@bake-js/-o-id/dom';

// Função responsável por gerar o template HTML do componente
function component() {
  return html`
    <div>Meu Componente</div>
  `;
}

// Função que retorna a folha de estilo dinâmica com interpolação de variáveis
function style() {
  return css`
    :host {
      display: block;
      background-color: ${this.backgroundColor};
      color: ${this.textColor};
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
    this.backgroundColor = 'lightblue';
    this.textColor = 'black';
  }
}
```

### Explicação:

- **Função `component()`**: Define o conteúdo HTML do componente, retornando o template via `html`.
- **Função `style()`**: Retorna a folha de estilo gerada pela função `css`. As variáveis `backgroundColor` e `textColor` são interpoladas diretamente no CSS, permitindo que os estilos sejam dinâmicos e reativos.
- **Decorador `@paint`**: Aplica o HTML e CSS ao componente, automatizando o processo de renderização e estilização.
- **Uso de `@define`**: Define o Web Component nativo, conectando-o ao DOM.

### Benefícios

1. **Simplicidade**: O uso do template literal para CSS elimina a necessidade de manipulação direta de strings.
2. **Estilos Isolados**: A função `css` retorna folhas de estilo compatíveis com `adoptedStyleSheets`, facilitando a aplicação direta no Shadow DOM e evitando conflitos de estilo globais.
3. **Interpolação de Variáveis**: Permite a inserção de variáveis e propriedades dinâmicas no CSS, adaptando-se a diferentes estados do componente.

### Considerações Finais

- **Uso em Web Components**: A função foi desenhada para funcionar bem em ambientes que utilizam Shadow DOM e `adoptedStyleSheets`.
- **Compatibilidade**: Certifique-se de verificar o suporte do navegador para `CSSStyleSheet` e `adoptedStyleSheets`.
