# FormDisabled

O `formDisabled` é um decorator que simplifica a adição de lógica ao método `formDisabledCallback` de um Custom Element, sendo parte da biblioteca `@bake-js/-o-id`.

## Visão Geral

### Nome e Classificação

- **Nome:** FormDisabled
- **Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

### Objetivo

Facilitar a execução de lógica personalizada quando um Custom Element é desativado ou ativado dentro de um formulário, utilizando o callback `formDisabledCallback`.

## Motivação

Usar o `formDisabled` traz as seguintes vantagens:

1. **Simplificação do Código:** Elimina a necessidade de definir manualmente o método `formDisabledCallback`.
2. **Facilidade de Manutenção:** Centraliza a lógica relacionada à desativação de elementos em formulários em um único método decorado.
3. **Consistência:** Garante que a lógica de desativação seja executada de maneira consistente sempre que o elemento é desativado ou ativado dentro de um formulário.

## Aplicabilidade

Ideal para qualquer situação onde se deseja executar lógica personalizada sempre que um Custom Element é desativado ou ativado dentro de um formulário, especialmente em componentes que precisam reagir dinamicamente ao estado de desativação.

## Importação

Para utilizar o decorator `formDisabled`, importe-o da seguinte maneira:

```javascript
import { formDisabled } from '@bake-js/-o-id';
```

## Implementação

```javascript
import intercept, { exec } from "../intercept";
import { formDisabledCallback } from "../interfaces";

/**
 * Decorator que adiciona lógica ao método `formDisabledCallback` de um Custom Element.
 *
 * @param target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param propertyKey - O nome do método decorado.
 * @returns Um decorator que intercepta a chamada do `formDisabledCallback`.
 */
const formDisabled = (target, propertyKey) => {
  // Cria uma instância do interceptor para o método `formDisabledCallback`.
  const interceptor = intercept(formDisabledCallback);

  // Adiciona o método decorado à lista de callbacks a serem executados.
  return interceptor
    .in(target) // Define o alvo do interceptor.
    .then(exec(propertyKey)); // Define o método a ser executado pelo interceptor.
};

export default formDisabled;
```

### Exemplo de Uso

```javascript
import { formDisabled } from '@bake-js/-o-id';

class MyElement extends HTMLElement {
  @formDisabled
  handleFormDisabled(disabled) {
    console.log(`Element has been ${disabled ? 'disabled' : 'enabled'} in the form.`);
  }
}

customElements.define('my-element', MyElement);
```

## Comparação com Concorrentes

### Lit

- **Comportamento Padrão:** O Lit não fornece comportamento padrão para `formDisabledCallback`.
- **Extensão Obrigatória:** Requer a extensão de `LitElement` para definir componentes.

Para mais detalhes sobre o `formDisabledCallback` no Lit, veja a [documentação oficial](https://lit.dev/docs/components/forms/).

```javascript
import { LitElement } from 'lit';

class MyElement extends LitElement {
  formDisabledCallback(disabled) {
    console.log(`Element has been ${disabled ? 'disabled' : 'enabled'} in the form.`);
  }
}
customElements.define('my-element', MyElement);
```

### Stencil

- **Hook Não Disponível:** O Stencil não possui um hook específico para `formDisabledCallback`.

Para mais detalhes sobre o Stencil, veja a [documentação oficial](https://stenciljs.com/docs/forms).

```typescript
import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  shadow: true,
})
export class MyComponent {
  formDisabledCallback(disabled) {
    console.log(`Element has been ${disabled ? 'disabled' : 'enabled'} in the form.`);
  }
}
```

### Vantagens do `@formDisabled`

- **Facilidade de Uso:** Simplifica a adição de lógica ao método `formDisabledCallback`.
- **Código Mais Limpo:** Centraliza a lógica de desativação em um único método decorado.
- **Flexibilidade:** Não exige extensão de classes específicas, como `LitElement`.

## Considerações Finais

O decorator `formDisabled` oferece uma maneira eficaz e declarativa de adicionar lógica ao método `formDisabledCallback`, simplificando o desenvolvimento e melhorando a legibilidade do código.
