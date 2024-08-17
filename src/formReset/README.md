# FormReset

O `formReset` é um decorator que facilita a adição de lógica ao método `formResetCallback` de um Custom Element, sendo parte da biblioteca `@bake-js/-o-id`.

## Visão Geral

### Nome e Classificação

- **Nome:** FormReset
- **Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

### Objetivo

Facilitar a execução de lógica personalizada quando um formulário associado ao Custom Element é resetado, utilizando o callback `formResetCallback`.

## Motivação

Usar o `formReset` traz as seguintes vantagens:

1. **Simplificação do Código:** Elimina a necessidade de definir manualmente o método `formResetCallback`.
2. **Facilidade de Manutenção:** Centraliza a lógica relacionada ao reset do formulário em um único método decorado.
3. **Consistência:** Garante que a lógica de reset seja executada de maneira consistente sempre que o formulário associado é resetado.

## Aplicabilidade

Ideal para qualquer situação onde se deseja executar lógica personalizada sempre que um formulário associado a um Custom Element é resetado, especialmente em componentes que precisam reagir a eventos de reset de formulário.

## Importação

Para utilizar o decorator `formReset`, importe-o da seguinte maneira:

```javascript
import { formReset } from '@bake-js/-o-id';
```

## Implementação

```javascript
import intercept, { exec } from "../intercept";
import { formResetCallback } from "../interfaces";

/**
 * Decorator que adiciona lógica ao método `formResetCallback` de um Custom Element.
 *
 * @param target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param propertyKey - O nome do método decorado.
 * @returns Um decorator que intercepta a chamada do `formResetCallback`.
 */
const formReset = (target, propertyKey) => {
  // Cria uma instância do interceptor para o método `formResetCallback`.
  const interceptor = intercept(formResetCallback);

  // Adiciona o método decorado à lista de callbacks a serem executados.
  return interceptor
    .in(target) // Define o alvo do interceptor.
    .then(exec(propertyKey)); // Define o método a ser executado pelo interceptor.
};

export default formReset;
```

### Exemplo de Uso

```javascript
import { formReset } from '@bake-js/-o-id';

class MyElement extends HTMLElement {
  @formReset
  handleFormReset() {
    console.log('The form associated with the element has been reset.');
  }
}

customElements.define('my-element', MyElement);
```

## Comparação com Concorrentes

### Lit

- **Comportamento Padrão:** O Lit não fornece comportamento padrão para `formResetCallback`.
- **Extensão Obrigatória:** Requer a extensão de `LitElement` para definir componentes.

Para mais detalhes sobre o `formResetCallback` no Lit, veja a [documentação oficial](https://lit.dev/docs/components/forms/).

```javascript
import { LitElement } from 'lit';

class MyElement extends LitElement {
  formResetCallback() {
    console.log('The form associated with the element has been reset.');
  }
}
customElements.define('my-element', MyElement);
```

### Stencil

- **Hook Não Disponível:** O Stencil não possui um hook específico para `formResetCallback`.

Para mais detalhes sobre o Stencil, veja a [documentação oficial](https://stenciljs.com/docs/forms).

```typescript
import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  shadow: true,
})
export class MyComponent {
  formResetCallback() {
    console.log('The form associated with the element has been reset.');
  }
}
```

### Vantagens do `@formReset`

- **Facilidade de Uso:** Simplifica a adição de lógica ao método `formResetCallback`.
- **Código Mais Limpo:** Centraliza a lógica de reset em um único método decorado.
- **Flexibilidade:** Não exige extensão de classes específicas, como `LitElement`.

## Considerações Finais

O decorator `formReset` oferece uma maneira eficaz e declarativa de adicionar lógica ao método `formResetCallback`, simplificando o desenvolvimento e melhorando a legibilidade do código.
