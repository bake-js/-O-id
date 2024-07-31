## Repaint

O `repaint` é um decorator que facilita a atualização de Custom Elements quando um método específico é chamado. Ele garante que o componente seja repintado após a execução de métodos decorados.

### Visão Geral

### Nome e Classificação

- **Nome:** Repaint
- **Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Objetivo

O objetivo do `repaint` é garantir que o método de renderização do componente seja chamado após a execução de métodos específicos, mantendo a interface do usuário atualizada de acordo com as mudanças de estado.

## Motivação

Usar o `repaint` traz as seguintes vantagens:

1. **Atualização Automática:** Garante que o componente seja repintado automaticamente após a execução de métodos decorados.
2. **Simplicidade:** Simplifica a lógica de atualização do componente.
3. **Coesão:** Mantém a lógica de atualização encapsulada dentro do decorator.

## Aplicabilidade

Ideal para situações onde é necessário garantir que o componente seja atualizado após a execução de determinados métodos, especialmente em componentes que dependem de estados internos dinâmicos.

## Implementação

```javascript
import { paintCallback } from "../interfaces";

const repaint = (_target, _propertyKey, descriptor) => {
  const value = descriptor.value;

  Object.assign(descriptor, {
    async value(...args) {
      await Reflect.apply(value, this, args);
      this.isConnected && (await this[paintCallback]());
      return this;
    },
  });
};

export default repaint;
```

## Exemplo de Uso

counter.ts:

```javascript
import { define, paint, repaint } from '@bake-js/element';
import component from './component';
import style from './style';

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

  @repaint
  increment() {
    this.number += 1;
  }
}
```

## Comparação com Concorrentes

### Lit

Lit utiliza a função `updateWhenLocaleChanges` para re-renderizar o componente quando o idioma ativo é alterado. Para mais detalhes, veja a [documentação oficial](https://lit.dev/docs/localization/runtime-mode/#automatically-re-render).

```javascript
import {LitElement, html} from 'lit';
import {msg, updateWhenLocaleChanges} from '@lit/localize';

class MyElement extends LitElement {
  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return msg(html`Hello <b>World!</b>`);
  }
}

customElements.define('my-element', MyElement);
```

### Stencil

O Stencil usa o decorator `@State` para monitorar mudanças de estado e repintar o componente quando esses estados são alterados. Para mais detalhes, veja a [documentação oficial](https://stenciljs.com/docs/state#the-state-decorator-state).

```typescript
import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'current-time',
})
export class CurrentTime {
  @State() currentTime: number = Date.now();

  connectedCallback() {
    setInterval(() => {
      this.currentTime = Date.now();
    }, 1000);
  }

  render() {
    const time = new Date(this.currentTime).toLocaleTimeString();
    return <span>{time}</span>;
  }
}
```

### Vantagens do `@repaint`

- **Automatização:** Atualiza automaticamente o componente após a execução de métodos específicos.
- **Simplicidade:** Simplifica a lógica de atualização do componente, mantendo a coesão da classe.

## Considerações Finais

O `repaint` é uma ferramenta eficaz para garantir que Custom Elements sejam atualizados corretamente após a execução de métodos específicos, simplificando a lógica de atualização e mantendo a coesão do componente.
