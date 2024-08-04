# WillPaint

O `willPaint` é um decorator que permite a execução de lógica antes do processo de renderização de Custom Elements. Ele garante que ações específicas ocorram antes do ciclo de pintura do componente.

## Visão Geral

### Nome e Classificação

- **Nome:** WillPaint
- **Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Objetivo

O objetivo do `willPaint` é garantir que o componente execute determinadas ações antes de ser renderizado, proporcionando um ponto de entrada para lógica preparatória.

## Motivação

Usar o `willPaint` traz as seguintes vantagens:

1. **Preparação:** Permite preparar o componente antes da renderização.
2. **Modularidade:** Mantém a lógica de preparação separada do ciclo de renderização principal.
3. **Flexibilidade:** Facilita a adição de lógica preparatória sem modificar diretamente o método de renderização.

## Aplicabilidade

Ideal para situações onde é necessário executar lógica preparatória antes da renderização do componente, especialmente em componentes que requerem configurações dinâmicas.

## Implementação

```javascript
import intercept, { exec } from "../intercept";
import { willPaintCallback } from "../interfaces";

const willPaint = (target, propertyKey) =>
  intercept(willPaintCallback).in(target).then(exec(propertyKey));

export default willPaint;
```

## Exemplo de Uso

counter.ts:

```javascript
import { define, paint, willPaint } from '@bake-js/element';
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

  @willPaint
  prepare() {
    // Lógica preparatória antes da renderização
    console.log('Preparando o componente antes da renderização');
  }

  increment() {
    this.number += 1;
  }
}
```

## Comparação com Concorrentes

### Lit

Lit utiliza a função `updateWhenLocaleChanges` para executar lógica antes da renderização, garantindo que o componente esteja atualizado com o estado atual. Para mais detalhes, veja a [documentação oficial](https://lit.dev/docs/localization/runtime-mode/#automatically-re-render).

```javascript
import { LitElement, html } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';

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

Stencil usa o decorator `@State` para monitorar mudanças de estado e executar lógica antes da renderização do componente. Para mais detalhes, veja a [documentação oficial](https://stenciljs.com/docs/state#the-state-decorator-state).

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

### Vantagens do `@willPaint`

- **Preparação:** Permite preparar o componente antes da renderização.
- **Modularidade:** Facilita a adição de lógica preparatória sem modificar diretamente o método de renderização.

## Considerações Finais

O `willPaint` é uma ferramenta eficaz para garantir que Custom Elements executem ações preparatórias antes da renderização, simplificando a lógica do componente e mantendo a modularidade e coesão do código.
