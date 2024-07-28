# Paint

O `paint` é um decorator que simplifica a renderização e estilização de Custom Elements de maneira declarativa, sendo parte da biblioteca Element.

## Visão Geral

### Nome e Classificação

- **Nome:** Paint
- **Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Objetivo

Facilitar a separação de responsabilidades na definição de Custom Elements, permitindo que a estrutura (HTML) e o estilo (CSS) sejam definidos fora da classe, mantendo a coesão da mesma.

## Motivação

Usar o `paint` traz as seguintes vantagens:

1. **Separação de Responsabilidades:** Permite que a lógica, a estrutura e o estilo do componente sejam definidos separadamente.
2. **Reutilização:** Componentes e estilos podem ser reutilizados em múltiplos elementos.
3. **Coesão:** Mantém a classe do componente limpa, sem "poluição" de HTML e CSS.

## Aplicabilidade

Ideal para qualquer situação onde se deseja manter a coesão da classe do componente e promover a reutilização de estruturas e estilos, especialmente em projetos grandes.

## Implementação

```javascript
import intercept, { exec } from "../intercept";
import {
  connectedCallback,
  didPaintCallback,
  paintCallback,
  willPaintCallback,
} from "../interfaces";

const paint = (component, style) => (target) => {
  intercept(paintCallback)
    .in(target.prototype)
    .then(async function () {
      await this[willPaintCallback]?.();
      await new Promise((resolve) => {
        requestAnimationFrame(() => {
          (this.shadowRoot ?? document).adoptedStyleSheets = style
            ? [style(this)]
            : [];
          (this.shadowRoot ?? this).innerHTML = component(this);
          resolve();
        });
      });
      await this[didPaintCallback]?.();
    });

  intercept(connectedCallback).in(target.prototype).then(exec(paintCallback));
};

export default paint;
```

### Exemplo de Uso

component.ts:

```typescript
export function component(self: any) {
  return `<button>Increment ${self.number}</button>`;
}
```

style.ts:

```typescript
export function style(sel: any) {
  return "button { color: red; }";
}
```

counter.ts:

```javascript
import paint from '@bake-js/element/paint';
import component from './component';
import style from './style';

@paint(component, style)
class Counter extends HTMLElement {
  #number = 0;

  get number() {
    return this.#number;
  }

  set number(value) {
    this.#number = value;
  }

  increment() {
    this.number += 1;
  }
}
```

## Comparação com Concorrentes

### Lit

- **Templates Integrados:** Utiliza tagged template literals para definir o HTML dentro da classe.
- **Estilos Internos:** CSS também é definido dentro da classe.

Para mais detalhes sobre Lit, veja a [documentação oficial](https://lit.dev/docs/components/defining/).

```javascript
import { LitElement, html, css } from 'lit';

class MyElement extends LitElement {
  static styles = css`
    button { color: red; }
  `;

  render() {
    return html`
      <button>Click me</button>
    `;
  }
}
customElements.define('my-element', MyElement);
```

### Stencil

- **Templates e Estilos Integrados:** Utiliza decorators e metadados para definir HTML e CSS dentro da classe.
- **Lógica Integrada:** HTML e CSS são definidos dentro da classe.

Para mais detalhes sobre Stencil, veja a [documentação oficial](https://stenciljs.com/docs/getting-started).

```typescript
import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  render() {
    return (
      <button>Click me</button>
    );
  }
}
```

### Vantagens do `@paint`

- **Separação de Responsabilidades:** HTML e CSS definidos fora da classe, promovendo a reutilização e mantendo a coesão da classe.
- **Reutilização Facilitada:** Componentes e estilos podem ser reutilizados em diferentes classes sem duplicação de código.

## Considerações Finais

O `paint` é uma ferramenta eficaz para definir a estrutura e o estilo de Custom Elements de maneira separada, promovendo a reutilização e mantendo a classe do componente limpa e coesa.
