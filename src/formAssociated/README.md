# FormAssociated

O `formAssociated` é um decorator que simplifica a adição de lógica ao método `formAssociatedCallback` de um Custom Element, sendo parte da biblioteca `@bake-js/-o-id`.

## Visão Geral

### Nome e Classificação

- **Nome:** FormAssociated
- **Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

### Objetivo

Facilitar a execução de lógica personalizada quando um Custom Element é associado a um formulário, utilizando o callback `formAssociatedCallback`.

## Motivação

Usar o `formAssociated` traz as seguintes vantagens:

1. **Simplificação do Código:** Elimina a necessidade de definir manualmente o método `formAssociatedCallback`.
2. **Facilidade de Manutenção:** Centraliza a lógica relacionada à associação de elementos a formulários em um único método decorado.
3. **Consistência:** Garante que a lógica de associação seja executada de maneira consistente sempre que o elemento é associado a um formulário.

## Aplicabilidade

Ideal para qualquer situação onde se deseja executar lógica personalizada sempre que um Custom Element é associado a um formulário, especialmente em componentes que precisam interagir com formulários de maneira dinâmica.

## Importação

Para utilizar o decorator `formAssociated`, importe-o da seguinte maneira:

```javascript
import { formAssociated } from '@bake-js/-o-id';
```

## Implementação

```javascript
import intercept, { exec } from "../intercept";
import { formAssociatedCallback } from "../interfaces";

/**
 * Decorator que adiciona lógica ao método `formAssociatedCallback` de um Custom Element.
 *
 * @param target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param propertyKey - O nome do método decorado.
 * @returns Um decorator que intercepta a chamada do `formAssociatedCallback`.
 */
const formAssociated = (target, propertyKey) => {
  // Cria uma instância do interceptor para o método `formAssociatedCallback`.
  const interceptor = intercept(formAssociatedCallback);

  // Adiciona o método decorado à lista de callbacks a serem executados.
  return interceptor
    .in(target) // Define o alvo do interceptor.
    .then(exec(propertyKey)); // Define o método a ser executado pelo interceptor.
};

export default formAssociated;
```

### Exemplo de Uso

```javascript
import { formAssociated } from '@bake-js/-o-id';

class MyElement extends HTMLElement {
  @formAssociated
  handleFormAssociation() {
    console.log('Element has been associated with a form.');
  }
}

customElements.define('my-element', MyElement);
```

## Comparação com Concorrentes

### Lit

- **Comportamento Padrão:** O Lit não fornece comportamento padrão para `formAssociatedCallback`.
- **Extensão Obrigatória:** Requer a extensão de `LitElement` para definir componentes.

Para mais detalhes sobre o `formAssociatedCallback` no Lit, veja a [documentação oficial](https://lit.dev/docs/components/forms/).

```javascript
import { LitElement } from 'lit';

class MyElement extends LitElement {
  formAssociatedCallback() {
    console.log('Element has been associated with a form.');
  }
}
customElements.define('my-element', MyElement);
```

### Stencil

- **Hook Não Disponível:** O Stencil não possui um hook específico para `formAssociatedCallback`.

Para mais detalhes sobre o Stencil, veja a [documentação oficial](https://stenciljs.com/docs/forms).

```typescript
import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  shadow: true,
})
export class MyComponent {
  formAssociatedCallback() {
    console.log('Element has been associated with a form.');
  }
}
```

### Vantagens do `@formAssociated`

- **Facilidade de Uso:** Simplifica a adição de lógica ao método `formAssociatedCallback`.
- **Código Mais Limpo:** Centraliza a lógica de associação a formulários em um único método decorado.
- **Flexibilidade:** Não exige extensão de classes específicas, como `LitElement`.

## Considerações Finais

O decorator `formAssociated` oferece uma maneira eficaz e declarativa de adicionar lógica ao método `formAssociatedCallback`, simplificando o desenvolvimento e melhorando a legibilidade do código.
