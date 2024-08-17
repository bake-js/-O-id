# Adopted

O `adopted` é um decorator que simplifica a execução de lógica específica quando um Custom Element é movido no DOM, sendo parte da biblioteca `@bake-js/-o-id`.

## Visão Geral

### Nome e Classificação

- **Nome:** Adopted
- **Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Objetivo

Facilitar a adição de lógica que é executada automaticamente quando um Custom Element é adotado em um novo documento ou Shadow DOM.

## Motivação

Usar o `adopted` traz as seguintes vantagens:

1. **Simplificação do Código:** Elimina a necessidade de definir manualmente o método `adoptedCallback`.
2. **Facilidade de Manutenção:** Centraliza a lógica relacionada à adoção de elementos em um único método decorado.
3. **Consistência:** Garante que a lógica de adoção seja executada de maneira consistente sempre que o elemento é movido.

## Aplicabilidade

Ideal para qualquer situação onde se deseja executar lógica personalizada sempre que um Custom Element é movido para um novo documento ou Shadow DOM, especialmente em componentes que mantêm estado ou precisam reagir a mudanças de contexto.

## Importação

Para utilizar o decorator `adopted`, importe-o da seguinte maneira:

```javascript
import { adopted } from '@bake-js/-o-id';
```

## Implementação

```javascript
import intercept, { exec } from "../intercept";
import { adoptedCallback } from "../interfaces";

/**
 * Decorator que adiciona lógica ao método `adoptedCallback` de um Custom Element.
 *
 * @param target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param propertyKey - O nome do método decorado.
 * @returns Um decorator que intercepta a chamada do `adoptedCallback`.
 */
const adopted = (target, propertyKey) => {
  // Cria uma instância do interceptor para o método `adoptedCallback`.
  const interceptor = intercept(adoptedCallback);

  // Adiciona o método decorado à lista de callbacks a serem executados.
  return interceptor
    .in(target) // Define o alvo do interceptor.
    .then(exec(propertyKey)); // Define o método a ser executado pelo interceptor.
};

export default adopted;
```

### Exemplo de Uso

```typescript
import { adopted } from '@bake-js/-o-id';

class MyElement extends HTMLElement {
  @adopted
  onAdopted() {
    console.log('Element has been adopted into a new document or shadow DOM.');
  }
}

customElements.define('my-element', MyElement);
```

## Comparação com Concorrentes

### Lit

- **Comportamento Padrão:** O Lit não fornece comportamento padrão para `adoptedCallback`.
- **Extensão Obrigatória:** Requer a extensão de `LitElement` para definir componentes.

Para mais detalhes sobre o `adoptedCallback` no Lit, veja a [documentação oficial](https://lit.dev/docs/components/lifecycle/#adoptedcallback).

```javascript
import { LitElement } from 'lit';

class MyElement extends LitElement {
  adoptedCallback() {
    console.log('Element has been adopted into a new document or shadow DOM.');
  }
}
customElements.define('my-element', MyElement);
```

### Stencil

- **Hook Não Disponível:** O Stencil não possui um hook específico para `adoptedCallback`.

Para mais detalhes sobre o Stencil, veja a [documentação oficial](https://stenciljs.com/docs/getting-started).

```typescript
import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  shadow: true,
})
export class MyComponent {
  adoptedCallback() {
    console.log('Element has been adopted into a new document or shadow DOM.');
  }
}
```

### Vantagens do `@adopted`

- **Facilidade de Uso:** Simplifica a adição de lógica ao método `adoptedCallback`.
- **Código Mais Limpo:** Centraliza a lógica de adoção em um único método decorado.
- **Flexibilidade:** Não exige extensão de classes específicas, como `LitElement`.

## Considerações Finais

O decorator `adopted` oferece uma maneira eficaz e declarativa de adicionar lógica ao método `adoptedCallback`, simplificando o desenvolvimento e melhorando a legibilidade do código.
