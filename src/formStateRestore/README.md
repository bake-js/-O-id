# FormStateRestore

O `formStateRestore` é um decorator que facilita a adição de lógica ao método `formStateRestoreCallback` de um Custom Element, sendo parte da biblioteca `@bake-js/-o-id`.

## Visão Geral

### Nome e Classificação

- **Nome:** FormStateRestore
- **Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

### Objetivo

Facilitar a execução de lógica personalizada quando o estado de um elemento é restaurado dentro de um formulário associado, utilizando o callback `formStateRestoreCallback`.

## Motivação

Usar o `formStateRestore` traz as seguintes vantagens:

1. **Simplificação do Código:** Elimina a necessidade de definir manualmente o método `formStateRestoreCallback`.
2. **Facilidade de Manutenção:** Centraliza a lógica relacionada à restauração do estado em um único método decorado.
3. **Consistência:** Garante que a lógica de restauração de estado seja executada de maneira consistente sempre que o estado do elemento for restaurado.

## Aplicabilidade

Ideal para qualquer situação onde se deseja executar lógica personalizada sempre que o estado de um elemento é restaurado dentro de um formulário associado, especialmente em componentes que mantêm estado ou precisam reagir a eventos de restauração de estado.

## Importação

Para utilizar o decorator `formStateRestore`, importe-o da seguinte maneira:

```javascript
import { formStateRestore } from '@bake-js/-o-id';
```

## Implementação

```javascript
import intercept, { exec } from "../intercept";
import { formStateRestoreCallback } from "../interfaces";

const formStateRestore = (target, propertyKey) => {
  const interceptor = intercept(formStateRestoreCallback);

  return interceptor
    .in(target)
    .then(exec(propertyKey));
};

export default formStateRestore;
```

### Exemplo de Uso

```javascript
import { formStateRestore } from '@bake-js/-o-id';

class MyElement extends HTMLElement {
  @formStateRestore
  handleFormStateRestore(state, mode) {
    // Código para restaurar o estado do componente
    // `state` é o estado restaurado, e `mode` pode ser "restore" ou "autocomplete"
    console.log('State restored:', state);
    console.log('Mode:', mode);
  }
}

customElements.define('my-element', MyElement);
```

## Comparação com Concorrentes

### Lit

- **Comportamento Padrão:** O Lit não fornece comportamento padrão para `formStateRestoreCallback`.
- **Extensão Obrigatória:** Requer a extensão de `LitElement` para definir componentes.

Para mais detalhes sobre o `formStateRestoreCallback` no Lit, veja a [documentação oficial](https://lit.dev/docs/components/forms/).

```javascript
import { LitElement } from 'lit';

class MyElement extends LitElement {
  formStateRestoreCallback(state, mode) {
    console.log('State restored:', state);
    console.log('Mode:', mode);
  }
}
customElements.define('my-element', MyElement);
```

### Stencil

- **Hook Não Disponível:** O Stencil não possui um hook específico para `formStateRestoreCallback`.

Para mais detalhes sobre o Stencil, veja a [documentação oficial](https://stenciljs.com/docs/forms).

```typescript
import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  shadow: true,
})
export class MyComponent {
  formStateRestoreCallback(state, mode) {
    console.log('State restored:', state);
    console.log('Mode:', mode);
  }
}
```

### Vantagens do `@formStateRestore`

- **Facilidade de Uso:** Simplifica a adição de lógica ao método `formStateRestoreCallback`.
- **Código Mais Limpo:** Centraliza a lógica de restauração de estado em um único método decorado.
- **Flexibilidade:** Não exige extensão de classes específicas, como `LitElement`.

## Considerações Finais

O decorator `formStateRestore` oferece uma maneira eficaz e declarativa de adicionar lógica ao método `formStateRestoreCallback`, simplificando o desenvolvimento e melhorando a legibilidade do código.
