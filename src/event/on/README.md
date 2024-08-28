# On

O `on` é um decorator que facilita a adição de listeners de eventos a elementos dentro de um Custom Element, sendo parte da biblioteca `@bake-js/-o-id/event`.

## Visão Geral

### Nome e Classificação

- **Nome:** On
- **Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Objetivo

Permitir a associação simplificada de eventos a métodos específicos dentro de um Custom Element, garantindo que a lógica seja executada sempre que o evento especificado ocorrer.

## Motivação

Usar o `on` traz as seguintes vantagens:

1. **Simplificação do Código:** Elimina a necessidade de adicionar manualmente event listeners nos métodos `connectedCallback` e `disconnectedCallback`.
2. **Facilidade de Manutenção:** Centraliza a lógica de eventos em métodos decorados, facilitando o gerenciamento e a compreensão do código.
3. **Consistência:** Garante que os listeners sejam corretamente adicionados e removidos conforme o ciclo de vida do componente.

## Aplicabilidade

Ideal para situações onde é necessário reagir a eventos específicos em elementos internos de um Custom Element, como cliques em botões ou mudanças em campos de formulário.

## Importação

Para utilizar o decorator `on`, importe-o da seguinte maneira:

```javascript
import on from '@bake-js/-o-id/event';
```

## Implementação

```javascript
import intercept from "./intercept";
import {
  abortController,
  connectedCallback,
  disconnectedCallback,
} from "./interfaces";

const attachEventListener =
  (type, query, ...filters) =>
  (target, propertyKey) => {
    intercept(connectedCallback)
      .in(target)
      .then(function () {
        const controller = (this[abortController] ??= new AbortController());
        const options = { signal: controller.signal };

        const listener = (event) => {
          if (event.target.matches(query)) {
            this[propertyKey](
              filters.reduce((target, filter) => filter(target), event),
            );
          }
        };

        this.addEventListener(type, listener, options);
        this.shadowRoot?.addEventListener(type, listener, options);
      });

    intercept(disconnectedCallback)
      .in(target)
      .then(function () {
        this[abortController].abort();
      });
  };

const on = new Proxy(
  {},
  {
    get:
      (_, type) =>
      (query, ...filters) =>
        attachEventListener(type, query, ...filters),
  },
);

export default on;
```

### Exemplo de Uso

```javascript
import on from '@bake-js/-o-id/event';

class MyElement extends HTMLElement {
  @on.click('button')
  handleClick(event) {
    console.log('Button clicked!', event);
  }
}

customElements.define('my-element', MyElement);
```

## Comparação com Concorrentes

### Lit

- **Comportamento Padrão:** No Lit, event listeners são geralmente definidos dentro do método `render` com `@event`.
- **Extensão Obrigatória:** Requer a extensão de `LitElement` para definir componentes.

```javascript
import { LitElement, html } from 'lit';

class MyElement extends LitElement {
  render() {
    return html`<button @click=${this.handleClick}>Click me</button>`;
  }

  handleClick(event) {
    console.log('Button clicked!', event);
  }
}
customElements.define('my-element', MyElement);
```

### Stencil

- **Decoração Alternativa:** No Stencil, listeners são adicionados com decorators específicos como `@Listen`.
- **Shadow DOM:** O suporte ao Shadow DOM é opcional e configurável.

```typescript
import { Component, Listen } from '@stencil/core';

@Component({
  tag: 'my-component',
  shadow: true,
})
export class MyComponent {
  @Listen('click', { target: 'button' })
  handleClick(event: Event) {
    console.log('Button clicked!', event);
  }
}
```

### Vantagens do `@on`

- **Facilidade de Uso:** Simplifica a adição de event listeners com uma sintaxe declarativa.
- **Código Mais Limpo:** Centraliza a lógica de eventos em um único método decorado.
- **Flexibilidade:** Não exige extensão de classes específicas, como `LitElement`.

## Considerações Finais

O decorator `on` oferece uma maneira poderosa e concisa de associar eventos a métodos específicos em um Custom Element, melhorando a legibilidade e a manutenção do código.
