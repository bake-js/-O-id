# Connected

O `connected` é um decorator que permite adicionar um hook a métodos específicos de Custom Elements para execução quando o elemento é conectado ao DOM. Ele faz parte da biblioteca `@bake-js/-o-id` e oferece uma maneira declarativa para gerenciar a lógica de conexão de elementos.

## Visão Geral

### Nome e Classificação

- **Nome:** Connected
- **Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Objetivo

Facilitar a execução de lógica adicional quando um Custom Element é conectado ao DOM, simplificando a gestão do ciclo de vida do componente.

## Motivação

Usar o `connected` traz as seguintes vantagens:

1. **Execução Automática:** Garante que a lógica definida no método decorado seja executada sempre que o elemento for conectado ao DOM.
2. **Manutenção Simplificada:** Facilita a gestão da lógica de conexão ao evitar a necessidade de sobrescrever manualmente o `connectedCallback`.

## Aplicabilidade

Ideal para situações onde se deseja executar automaticamente lógica adicional quando um Custom Element é adicionado ao DOM. É especialmente útil para:

- **Inicialização de Componentes:** Preparar o estado do componente ou configurar recursos quando ele é conectado ao DOM.
- **Configuração de Interações:** Adicionar event listeners ou outras interações quando o elemento é adicionado ao DOM.

## Importação

Para utilizar o decorator `connected`, importe-o da seguinte maneira:

```javascript
import { connected } from '@bake-js/-o-id';
```

## Implementação

```javascript
import intercept, { exec } from "../intercept";
import { connectedCallback } from "../interfaces";

/**
 * Decorator que adiciona lógica ao método `connectedCallback` de um Custom Element.
 *
 * @param target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param propertyKey - O nome do método decorado.
 * @returns Um decorator que intercepta a chamada do `connectedCallback`.
 */
const connected = (target, propertyKey) => {
  // Cria uma instância do interceptor para o método `connectedCallback`.
  const interceptor = intercept(connectedCallback);

  // Adiciona o método decorado à lista de callbacks a serem executados.
  return interceptor
    .in(target) // Define o alvo do interceptor.
    .then(exec(propertyKey)); // Define o método a ser executado pelo interceptor.
};

export default connected;
```

### Exemplo de Uso

```javascript
import { connected } from '@bake-js/-o-id';

class Counter extends HTMLElement {
  @connected
  onConnected() {
    console.log('Elemento conectado ao DOM');
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
}

customElements.define('element-counter', Counter);
```

## Comparação com Concorrentes

### Lit

- **Execução ao Conectar:** O Lit executa o `connectedCallback` após o elemento ser adicionado ao DOM e garante que o `renderRoot` (normalmente, o `shadowRoot`) esteja preparado para a renderização.
- **Gerenciamento do Ciclo de Vida:** O Lit utiliza o `connectedCallback` para iniciar o ciclo de atualização do elemento e garantir que a renderização ocorra conforme esperado.

Para mais detalhes sobre Lit, veja a [documentação oficial](https://lit.dev/docs/components/lifecycle/#connectedcallback).

```javascript
import { LitElement, html } from 'lit';

class MyElement extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    console.log('Elemento conectado ao DOM');
  }

  render() {
    return html`<div>Componente conectado!</div>`;
  }
}

customElements.define('my-element', MyElement);
```

### Stencil

- **Execução ao Conectar:** O Stencil chama o `connectedCallback` sempre que o componente é conectado ao DOM, permitindo a execução de lógica adicional nesse ponto.
- **Gerenciamento de Ciclo de Vida:** O Stencil gerencia a conexão e desconexão dos componentes com hooks semelhantes aos do padrão de Web Components.

Para mais detalhes sobre Stencil, veja a [documentação oficial](https://stenciljs.com/docs/component-lifecycle#connectedcallback).

```javascript
import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-component',
})
export class MyComponent {
  connectedCallback() {
    console.log('Elemento conectado ao DOM');
  }

  render() {
    return <div>Componente conectado!</div>;
  }
}
```

### Vantagens do `@connected`

- **Simplicidade na Implementação:** Facilita a adição de lógica de conexão, centralizando a implementação e evitando a repetição de código.
- **Execução Automatizada:** Garante que a lógica de conexão seja executada sempre que o elemento for adicionado ao DOM, promovendo uma experiência de desenvolvimento mais fluida.

## Considerações Finais

O `connected` oferece uma solução prática e eficiente para gerenciar a execução de lógica adicional ao conectar Custom Elements ao DOM. Ele promove a reatividade e a facilidade de manutenção dos componentes, simplificando a gestão do ciclo de vida e melhorando a experiência de desenvolvimento.

---
