# CSS

Bem-vindo à documentação do `css`, um helper que facilita a criação e gerenciamento de estilos CSS utilizando `CSSStyleSheet` e tagged template literals. Este pacote é parte integrante da biblioteca Element, que visa simplificar o desenvolvimento de Web Components.

## Documentação do Código

### Nome e Classificação

**Nome:** CSS

**Classificação:** Helpers [Tagged Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

### Interação e Objetivo

**Interação:** Este helper é usado para criar uma instância de `CSSStyleSheet` a partir de um template literal, permitindo a fácil aplicação de estilos a componentes Web.

**Objetivo:** Facilitar a definição e aplicação de estilos encapsulados em componentes customizados, mantendo a modularidade e reusabilidade.

### Também conhecido como

- Helper de Estilos
- Gerenciador de CSS

### Motivação

A motivação para usar o helper `css` é simplificar a definição de estilos CSS dentro de Web Components. Ele permite:

1. **Encapsulamento de Estilos:** Facilita a definição de estilos específicos para componentes, evitando conflitos de CSS global.
2. **Reutilização de Estilos:** Promove a reutilização de estilos entre diferentes componentes.
3. **Performance:** Aproveita as capacidades do `CSSStyleSheet` para aplicar estilos de forma eficiente e dinâmica.

### Aplicabilidade

O helper `css` é aplicável em situações onde é necessário definir estilos CSS para componentes customizados. É especialmente útil em cenários como:

- **Desenvolvimento de Web Components:** Onde cada componente pode ter seus próprios estilos encapsulados.
- **Aplicações Moduladas:** Onde a separação de estilos é essencial para a manutenção e escalabilidade do código.

### Estrutura

A estrutura do helper `css` é simples, transformando um template literal em uma instância de `CSSStyleSheet`.

### Participantes

1. **Função Helper (`css`)**:
   - **Descrição:** Cria uma instância de `CSSStyleSheet` a partir de um template literal.
   - **Responsabilidade:** Facilitar a definição e aplicação de estilos CSS encapsulados para Web Components.

### Colaborações

O helper `css` funciona em conjunto com a API `CSSStyleSheet` para permitir a aplicação de estilos encapsulados em componentes web.

### Consequências

#### Impactos Positivos

- **Encapsulamento de Estilos:** Facilita a definição de estilos específicos para componentes, evitando conflitos de CSS global.
- **Reutilização de Estilos:** Promove a reutilização de estilos entre diferentes componentes, melhorando a modularidade do código.

#### Impactos Negativos

- **Complexidade Adicional:** A introdução de estilos encapsulados pode adicionar complexidade ao gerenciamento de estilos em projetos maiores.
- **Compatibilidade do Navegador:** A utilização de `CSSStyleSheet` pode ser limitada em navegadores que não suportam essa API.

### Implementação

```javascript
function css(strings, ...values) {
  const styles = new CSSStyleSheet();
  const textContent = String.raw({ raw: strings }, ...values);
  styles.replaceSync(textContent);
  return styles;
}

export default css;
```

### Exemplo de Uso

```javascript
import css from '@bake-js/element/css';

const styles = css`
  :host {
    display: block;
    padding: 16px;
    background-color: #f0f0f0;
  }

  h1 {
    color: #333;
  }
`;

class MyElement extends HTMLElement {
  static get observedAttributes() {
    return ['title'];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.adoptedStyleSheets = [styles];
    shadow.innerHTML = `
      <h1>${this.getAttribute('title')}</h1>
    `;
  }
}

customElements.define('my-element', MyElement);
```

### Usos Conhecidos

- **Estilização de Componentes Customizados:** Ideal para definir estilos específicos para Web Components.
- **Encapsulamento de Estilos:** Útil para evitar conflitos de estilos globais em aplicações grandes e complexas.

### Padrões Relacionados

- **Decorator `paint`:** Pode ser usado em conjunto para definir estilos durante o ciclo de vida do componente.
- **Decorator `define`:** Complementa o helper `css` ao definir Web Components e aplicar estilos encapsulados.
- **Shadow DOM:** Utilizado para encapsular o CSS e evitar conflitos globais de estilo.

### Considerações Finais

O helper `css` oferece uma solução moderna e eficiente para definir estilos CSS dentro de Web Components, promovendo o encapsulamento e reutilização de estilos. Ele integra-se perfeitamente com a biblioteca Element, facilitando o desenvolvimento de componentes web estilizados e modulares.
