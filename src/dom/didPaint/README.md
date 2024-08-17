# didPaint

O `didPaint` é um decorator que adiciona um hook a métodos específicos de Custom Elements para execução após o método `paint`, sendo parte da biblioteca Element.

## Visão Geral

### Nome e Classificação

- **Nome:** `didPaint`
- **Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Objetivo

Facilitar a execução de lógica personalizada após a execução do método `paint` de um Custom Element, sem a necessidade de sobrescrever manualmente o método `paint`.

## Motivação

Utilizar o `didPaint` oferece as seguintes vantagens:

1. **Execução Pós-Renderização:** Permite adicionar lógica adicional a ser executada imediatamente após o método `paint`.
2. **Clareza e Organização:** Melhora a organização do ciclo de vida do componente ao centralizar a lógica pós-renderização.

## Aplicabilidade

Ideal para situações onde é necessário realizar ações específicas após a renderização inicial do componente, como:

- **Atualizações Dinâmicas:** Aplicar ajustes ou atualizações no DOM após a renderização.
- **Integração com Outras Lógicas:** Sincronizar o componente com outras partes da aplicação após o `paint`.

## Importação

Para utilizar o decorator `didPaint`, importe-o da seguinte forma:

```javascript
import { didPaint } from '@bake-js/-o-id/dom';
```

## Implementação

```javascript
import intercept, { exec } from "../intercept";
import { didPaintCallback } from "../interfaces";

/**
 * Cria um decorator para adicionar lógica ao método `didPaintCallback` de um Custom Element.
 *
 * @param target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param propertyKey - O nome do método decorado.
 * @returns Um decorator que intercepta a chamada do `didPaintCallback`.
 */
const didPaint = (target, propertyKey) => {
  // Cria uma instância do interceptor para o método `didPaintCallback`.
  const interceptor = intercept(didPaintCallback);
  
  // Adiciona o método decorado à lista de callbacks a serem executados.
  return interceptor
    .in(target)        // Define o alvo do interceptor.
    .then(exec(propertyKey)); // Define o método a ser executado pelo interceptor.
};

export default didPaint;
```

### Exemplo de Uso

```typescript
import { paint, didPaint } from '@bake-js/-o-id/dom';

@paint((self) => {
  return `<p>Hello, ${self.name}</p>`;
})
class GreetingElement extends HTMLElement {
  #name;

  get name() {
    return (this.#name ??= 'World');
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  @didPaint
  afterRender() {
    console.log('Componente pintado:', this.innerHTML);
  }
}

customElements.define('greeting-element', GreetingElement);
```

## Comparação com Concorrentes

### Lit

- **Pós-Renderização:** O Lit oferece o método `updated`, que é chamado após a renderização, mas não é um decorator específico para isso.
  
Para mais detalhes sobre o Lit, veja a [documentação oficial](https://lit.dev/docs/components/lifecycle/#updated).

```typescript
class MyElement extends LitElement {
  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);
    // Lógica pós-renderização aqui
  }
}
```

### Stencil

- **Pós-Renderização:** O Stencil fornece o método `componentDidRender`, chamado após o método `render` do componente.

Para mais detalhes sobre Stencil, veja a [documentação oficial](https://stenciljs.com/docs/component-lifecycle#componentdidrender).

```typescript
@Component({ tag: 'my-component', shadow: true })
export class MyComponent {
  @State() name: string;

  render() {
    return <p>Hello, {this.name}</p>;
  }

  componentDidRender() {
    // Lógica pós-renderização aqui
  }
}
```

### Vantagens do `didPaint`

- **Interface Declarativa:** Permite adicionar facilmente lógica pós-renderização sem alterar o método `paint` diretamente.
- **Flexibilidade:** Fornece um hook específico para lógica adicional após a renderização, sem a necessidade de manipulação manual do ciclo de vida.

## Considerações Finais

O `didPaint` oferece uma maneira eficaz e declarativa de gerenciar ações pós-renderização em Custom Elements. Ele melhora a organização do código e proporciona flexibilidade adicional para desenvolvedores ao trabalhar com Web Components.
