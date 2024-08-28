# CSS

O `css` é um helper que facilita a criação e gerenciamento de estilos CSS utilizando `CSSStyleSheet` e tagged template literals. Este pacote faz parte da biblioteca Element, que visa simplificar o desenvolvimento de Web Components.

## Visão Geral

### Nome e Classificação

- **Nome:** CSS
- **Classificação:** Helpers [Tagged Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

### Objetivo

Facilitar a definição e aplicação de estilos encapsulados em componentes customizados, utilizando uma API moderna e eficiente.

## Motivação

Utilizar o `css` proporciona as seguintes vantagens:

1. **Encapsulamento de Estilos:** Permite a definição de estilos específicos para componentes, evitando conflitos com CSS global.
2. **Reutilização e Modularidade:** Promove a reutilização de estilos entre diferentes componentes e mantém o código organizado e modular.
3. **Performance:** Aproveita as capacidades do `CSSStyleSheet` para aplicar estilos de forma eficiente e dinâmica.

## Aplicabilidade

O helper `css` é ideal para situações onde é necessário definir estilos CSS para componentes customizados, como:

- **Desenvolvimento de Web Components:** Aplicando estilos encapsulados para cada componente.
- **Aplicações Moduladas:** Manter a separação de estilos para uma melhor manutenção e escalabilidade.

## Importação

Para utilizar o helper `css`, importe-o da seguinte forma:

```javascript
import { css } from '@bake-js/-o-id/dom';
```

## Implementação

```javascript
const css = (strings, ...values) => {
  const styleSheet = new CSSStyleSheet();
  const cssText = String.raw({ raw: strings }, ...values);
  styleSheet.replaceSync(cssText);
  return [styleSheet];
};

export default css;
```

## Exemplo de Uso

```javascript
import { css } from '@bake-js/-o-id/dom';

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

## Comparação com Concorrentes

### Lit

- **CSS Literal:** Utiliza o `css` para definir estilos, mas integra-se com o `LitElement` para aplicar esses estilos.
- **Exemplo:** O `css` é usado para criar um template literal que é integrado ao `LitElement`.

Para mais detalhes sobre Lit, veja a [documentação oficial](https://lit.dev/docs/components/styles/).

```typescript
import { css, LitElement } from 'lit';

const styles = css`
  :host {
    display: block;
    background-color: #f0f0f0;
  }
`;

class MyElement extends LitElement {
  static styles = styles;
}
```

### Stencil

- **CSS Encapsulado:** Utiliza o `@Component` para definir estilos encapsulados, mas não oferece uma API diretamente comparável ao `css`.

Para mais detalhes sobre Stencil, veja a [documentação oficial](https://stenciljs.com/docs/style).

```typescript
@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {}
```

## Vantagens do `@css`

- **Encapsulamento de Estilos:** Permite a definição de estilos específicos para Web Components, evitando conflitos globais.
- **Flexibilidade:** Facilita a aplicação de estilos dinâmicos e modulares, utilizando a API moderna `CSSStyleSheet`.

## Considerações Finais

O helper `css` oferece uma solução moderna e eficiente para definir estilos CSS dentro de Web Components. Ao utilizar `CSSStyleSheet` e tagged template literals, ele promove o encapsulamento e reutilização de estilos, facilitando o desenvolvimento de componentes estilizados e modulares.
