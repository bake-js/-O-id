# Paint

O `paint` é um decorator da biblioteca Element que facilita a renderização e estilização de Custom Elements de maneira declarativa. Ele permite definir a estrutura (HTML) e o estilo (CSS) de um componente fora da classe, mantendo o código mais organizado e modular.

## Visão Geral

### Nome e Classificação

- **Nome:** Paint
- **Classificação:** Decorator ([ES Proposals](https://www.proposals.es/proposals/Decorators), [TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html))

### Objetivo

O decorator `paint` visa:

- **Separação de Responsabilidades:** Permitir que a lógica de renderização e estilização seja definida separadamente da classe do componente.
- **Manutenção da Coesão:** Manter a classe do componente limpa e livre de HTML e CSS, promovendo uma melhor organização do código.

## Motivação

O uso do `paint` proporciona as seguintes vantagens:

1. **Separação Clara:** Define a estrutura e o estilo do componente fora da classe, melhorando a legibilidade e manutenção do código.
2. **Reutilização de Componentes:** Permite reutilizar estruturas e estilos em diferentes componentes.
3. **Código Limpo:** Evita a "poluição" da classe do componente com HTML e CSS, mantendo-a focada na lógica do componente.

## Aplicabilidade

O decorator `paint` é ideal para:

- **Componentes Web Dinâmicos:** Gerar e estilizar HTML dentro de componentes web.
- **Templates Dinâmicos:** Criar templates HTML dinâmicos baseados em dados de runtime, mantendo o código organizado.

## Importação

Para utilizar o decorator `paint`, importe-o da seguinte forma:

```javascript
import { paint } from '@bake-js/-o-id/dom';
```

## Implementação

```javascript
import intercept, { exec } from "../intercept";
import {
  connectedCallback,
  didPaintCallback,
  paintCallback,
  willPaintCallback,
} from "../interfaces";

/**
 * Decorator que adiciona suporte para renderização e estilização de um componente.
 * 
 * @param {Function} component - Função que retorna o HTML a ser renderizado.
 * @param {Function} [style] - Função opcional que retorna as folhas de estilo a serem aplicadas.
 * @returns {Function} - O decorator para ser aplicado à classe do componente.
 */
const paint =
  (component, style = () => []) =>
  (target) => {
  // Intercepta o método paintCallback para adicionar lógica de renderização
  intercept(paintCallback)
    .in(target.prototype)
    .then(async function () {
      // Função para renderizar o componente após o próximo frame
      const render = (resolve) => {
        requestAnimationFrame(() => {
          (this.shadowRoot ?? document).adoptedStyleSheets = style(this);
          (this.shadowRoot ?? this).innerHTML = component(this);
          resolve();
        });
      };

      // Executa os callbacks de ciclo de vida antes e depois da renderização
      await this[willPaintCallback]?.();
      await new Promise(render);
      await this[didPaintCallback]?.();
    });

  // Intercepta o método connectedCallback para garantir que paintCallback seja chamado
  intercept(connectedCallback)
    .in(target.prototype)
    .then(exec(paintCallback));
};

export default paint;
```

### Exemplo de Uso

**component.js:**

```javascript
import { html } from '@bake-js/-o-id/dom';

/**
 * Função que retorna o HTML a ser renderizado.
 * 
 * @param {Object} self - Instância do componente.
 * @returns {string} - HTML a ser renderizado.
 */
export function component(self) {
  return html`
    <button>Increment ${self.number}</button>
  `;
}
```

**style.js:**

```javascript
import { css } from '@bake-js/-o-id/dom';

/**
 * Função que retorna as folhas de estilo a serem aplicadas.
 * 
 * @param {Object} self - Instância do componente.
 * @returns {CSSStyleSheet[]} - Folhas de estilo a serem aplicadas.
 */
export function style(self) {
  return css`
    button { color: red; }
  `;
}
```

**counter.ts:**

```javascript
import { define, paint } from '@bake-js/-o-id/dom';
import component from './component';
import style from './style';

/**
 * Define um Custom Element com renderização e estilização separadas.
 */
@define('be-counter')
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

- **Templates Integrados:** Utiliza tagged template literals para definir o HTML diretamente dentro da classe.
- **Estilos Internos:** CSS é definido dentro da classe, o que pode tornar a classe mais complexa.

Para mais detalhes sobre Lit, veja a [documentação oficial](https://lit.dev/docs/components/rendering).

**Exemplo com Lit:**

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

- **Templates e Estilos Integrados:** Utiliza decorators e metadados para definir HTML e CSS diretamente dentro da classe.
- **Lógica Integrada:** HTML e CSS são definidos junto com a lógica, o que pode dificultar a separação de responsabilidades.

Para mais detalhes sobre Stencil, veja a [documentação oficial](https://stenciljs.com/docs/getting-started).

**Exemplo com Stencil:**

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

O `paint` oferece uma maneira eficaz de separar a definição de estrutura e estilo de Custom Elements, promovendo código limpo e modular. Ao permitir que HTML e CSS sejam definidos fora da classe, ele melhora a organização do código e a reutilização dos componentes.
