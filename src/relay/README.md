# Relay

O `relay` é um decorator que facilita a escuta de eventos no `parentElement` de um Custom Element, sendo parte da biblioteca `@bake-js/-o-id/relay`.

## Visão Geral

### Nome e Classificação

- **Nome:** Relay
- **Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Objetivo

Facilitar a escuta de eventos no `parentElement` de um Custom Element, permitindo que os eventos do elemento pai sejam redirecionados e tratados pelo componente filho.

## Motivação

O uso do `relay` traz as seguintes vantagens:

1. **Escuta Automática de Eventos no Pai:** Elimina a necessidade de adicionar manualmente event listeners no `parentElement`, automatizando o processo.
2. **Facilidade de Manutenção:** Centraliza a lógica de eventos herdados do pai no componente filho.
3. **Consistência:** Garante que os listeners no `parentElement` sejam corretamente adicionados e removidos conforme o ciclo de vida do componente.

## Aplicabilidade

Ideal para situações em que um Custom Element filho precisa reagir a eventos disparados no `parentElement`, como atualizações em outros componentes ou mudanças globais no estado.

## Importação

Para utilizar o decorator `relay`, importe-o da seguinte maneira:

```javascript
import relay from '@bake-js/-o-id/relay';
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
  (type, ...filters) =>
  (target, propertyKey) => {
    intercept(connectedCallback)
      .in(target)
      .then(function () {
        const controller = (this[abortController] ??= new AbortController());
        const options = { signal: controller.signal };

        const listener = (event) => {
          this[propertyKey](
            filters.reduce((target, filter) => filter(target), event),
          );
        };

        this.parentElement.addEventListener(type, listener, options);
      });

    intercept(disconnectedCallback)
      .in(target)
      .then(function () {
        this[abortController].abort();
      });
  };

const relay = new Proxy(
  {},
  {
    get:
      (_, type) =>
      (...filters) =>
        attachEventListener(type, ...filters),
  },
);

export default relay;
```

### Exemplo de Uso

```javascript
import relay from '@bake-js/-o-id/relay';

class MyChildElement extends HTMLElement {
  @relay.changed()
  handleParentChange(event) {
    console.log('Parent element changed!', event);
  }
}

customElements.define('my-child-element', MyChildElement);
```

Neste exemplo, o evento `changed` disparado no `parentElement` do componente filho será capturado e tratado pelo método `handleParentChange`.

## Comparação com Concorrentes

### Lit

- **Comportamento Padrão:** Em Lit, a escuta de eventos no `parentElement` requer configuração manual no `connectedCallback`.
- **Extensão Obrigatória:** Requer a extensão de `LitElement` para definir componentes.

```javascript
import { LitElement } from 'lit';

class MyChildElement extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.parentElement.addEventListener('changed', this.handleParentChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.parentElement.removeEventListener('changed', this.handleParentChange);
  }

  handleParentChange(event) {
    console.log('Parent element changed!', event);
  }
}

customElements.define('my-child-element', MyChildElement);
```

### Stencil

- **Configuração Manual:** Em Stencil, a escuta de eventos do `parentElement` também precisa ser configurada manualmente.
- **Shadow DOM Opcional:** O suporte ao Shadow DOM é opcional e configurável.

```typescript
import { Component } from '@stencil/core';

@Component({
  tag: 'my-child-element',
  shadow: true,
})
export class MyChildElement {
  connectedCallback() {
    this.parentElement.addEventListener('changed', this.handleParentChange);
  }

  disconnectedCallback() {
    this.parentElement.removeEventListener('changed', this.handleParentChange);
  }

  handleParentChange(event: Event) {
    console.log('Parent element changed!', event);
  }
}
```

### Vantagens do `@relay`

- **Escuta Automática:** Simplifica o processo de escutar eventos do `parentElement` sem precisar escrever código de configuração manual no ciclo de vida.
- **Código Mais Limpo:** Centraliza a lógica de eventos do `parentElement` diretamente nos métodos do Custom Element filho.
- **Flexibilidade:** Não exige extensão de classes específicas, como `LitElement` ou `HTMLElement`.

## Considerações Finais

O decorator `relay` é uma solução eficiente e declarativa para escutar eventos do `parentElement` em Custom Elements, melhorando a legibilidade e a manutenção do código em cenários onde os eventos do pai precisam ser manipulados pelos filhos.
