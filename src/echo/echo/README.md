# Echo

O `Echo` é um Event Bus que facilita a comunicação entre componentes, permitindo que eventos sejam propagados e ouvidos de forma centralizada. É parte da biblioteca `@bake-js/-o-id/echo`.

## Visão Geral

### Nome e Classificação

- **Nome:** Echo
- **Classificação:** Event Bus

### Objetivo

Prover um barramento de eventos eficiente e flexível para comunicação entre componentes em aplicações Web.

## Motivação

Utilizar o `Echo` traz as seguintes vantagens:

1. **Desacoplamento:** Permite a comunicação entre componentes sem que eles precisem conhecer diretamente uns aos outros.
2. **Centralização:** Facilita o gerenciamento de eventos ao centralizar a lógica de emissão e escuta de eventos.
3. **Flexibilidade:** Suporta diferentes tipos de eventos e ações associados a atributos, métodos ou setters.

## Aplicabilidade

Ideal para qualquer aplicação que necessite de comunicação eficiente entre componentes, especialmente em arquiteturas complexas onde o desacoplamento entre os módulos é crucial.

## Importação

Para utilizar o `Echo`, importe-o da seguinte maneira:

```javascript
import Echo from '@bake-js/-o-id/echo';
```

## Implementação

```javascript
import {
  attributeChangedCallback,
  disconnectedCallback,
  dispatchEvent,
  echoConnectedCallback,
  echoDisconnectedCallback,
  id,
  observedAttributes,
  on,
} from "./interfaces";
import { target } from "./target";

const Echo = (Klass) =>
  class extends Klass {
    #controllers = {};

    static [observedAttributes] = [...(Klass[observedAttributes] ?? []), on];

    [attributeChangedCallback](name, oldValue, newValue) {
      if (name === on) {
        this[echoDisconnectedCallback](oldValue);
        this[echoConnectedCallback](newValue);
      }
      return this;
    }

    [disconnectedCallback]() {
      Object.values(this.#controllers).forEach((controller) =>
        controller.abort(),
      );
      return this;
    }

    [dispatchEvent](event) {
      super[dispatchEvent](event);
      const element = this.getAttribute(id) ?? this.localName;
      target.dispatchEvent(
        new CustomEvent(`${element}/${event.type}`, {
          detail: event.detail,
        }),
      );
    }

    [echoConnectedCallback](protocol) {
      this.#controllers[protocol] = new AbortController();

      const [, topic, type, name] = protocol.match(
        /^([a-z0-9-_]+\/[a-z0-9-_]+):([a-z]+)\/([a-z0-9-_]+)$/i,
      );

      target.addEventListener(
        topic,
        (event) => {
          if (/^method$/.test(type)) this[name](event.detail);
          if (/^attribute$/.test(type)) this.setAttribute(name, event.detail);
          if (/^setter$/.test(type)) this[name] = event.detail;
          return this;
        },
        { signal: this.#controllers[protocol].signal },
      );
      return this;
    }

    [echoDisconnectedCallback](protocol) {
      this.#controllers[protocol]?.abort();
      return this;
    }
  };

export default Echo;
```

### Exemplo de Uso

```javascript
import Echo from '@bake-js/-o-id/echo';

class MyElement extends Echo(HTMLElement) {
}

customElements.define('my-element', MyElement);
```

## Comparação com Concorrentes

### Lit

- **Comportamento Padrão:** O Lit não fornece um Event Bus integrado.
- **Extensão Obrigatória:** Requer a extensão de `LitElement` para definir componentes.

### Stencil

- **Comportamento Padrão:** O Stencil não implementa um Event Bus nativo.

### Vantagens do `Echo`

- **Desacoplamento Completo:** Permite comunicação entre componentes sem dependências diretas.
- **Centralização de Lógica:** Simplifica a gestão de eventos complexos.

## Considerações Finais

O `Echo` oferece uma solução poderosa e flexível para a comunicação entre componentes em aplicações Web, simplificando o desenvolvimento e promovendo um alto grau de desacoplamento.
