# didPaint

O `didPaint` é um decorator que adiciona um hook a métodos específicos de Custom Elements para execução após o método `paint`, sendo parte da biblioteca Element.

## Visão Geral

### Nome e Classificação

- **Nome:** didPaint
- **Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Objetivo

Facilitar a execução de lógica personalizada após o método `paint` de um Custom Element, sem a necessidade de sobrescrever manualmente o método `paint`.

## Motivação

Usar o `didPaint` traz as seguintes vantagens:

1. **Pós-Renderização:** Permite a execução de lógica adicional após a renderização do componente.
2. **Organização do Código:** Melhora a clareza e a manutenção do ciclo de vida do componente ao centralizar a lógica pós-renderização.

## Aplicabilidade

Ideal para situações onde é necessário realizar ações específicas após a renderização de componentes customizados, como:

- **Atualizações Dinâmicas:** Ajustes ou atualizações no DOM após a renderização inicial.
- **Integração com Outras Lógicas:** Sincronização do componente com outras partes da aplicação após a renderização.

## Implementação

```javascript
import intercept, { exec } from "../intercept";
import { didPaintCallback } from "../interfaces";

const didPaint = (target, propertyKey) =>
  intercept(didPaintCallback).in(target).then(exec(propertyKey));

export default didPaint;
```

### Exemplo de Uso

```typescript
import { paint, didPaint } from '@bake-js/element';

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

- **Pós-Renderização:** O Lit oferece o método `updated` que é chamado após a renderização, mas não é um decorator específico para isso.
  
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
