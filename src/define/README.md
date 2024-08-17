# Define

O `define` é um decorator que simplifica o registro de Custom Elements de maneira declarativa, sendo parte da biblioteca `@bake-js/-o-id`.

## Visão Geral

### Nome e Classificação

- **Nome:** Define
- **Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Objetivo

Facilitar o registro de Custom Elements, eliminando a necessidade de chamadas manuais para `customElements.define` ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define)).

## Motivação

Usar o `define` traz as seguintes vantagens:

1. **Simplificação:** Reduz chamadas repetitivas a `customElements.define`.
2. **Legibilidade:** Melhora a leitura do código ao associar diretamente o nome da tag à definição da classe.

## Aplicabilidade

Ideal para qualquer situação onde se deseja registrar Custom Elements de maneira mais organizada e declarativa, especialmente em projetos grandes.

## Importação

Para utilizar o decorator `define`, importe-o da seguinte maneira:

```javascript
import { define } from '@bake-js/-o-id';
```

## Implementação

```javascript
const define = (name, options) => (constructor) =>
  customElements.define(name, constructor, options);

export default define;
```

### Exemplo de Uso

```javascript
import { define } from '@bake-js/-o-id';

@define('element-counter')
class Counter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<div>Counter Component</div>';
  }
}
```

## Comparação com Concorrentes

### Lit

- **Requer Extensão:** Necessário estender `LitElement`.
- **Decorator:** `@customElement` altera a assinatura de `customElements.define`.

Para mais detalhes sobre o Lit, veja a [documentação oficial](https://lit.dev/docs/components/defining/).

```javascript
@customElement('simple-greeting')
export class SimpleGreeting extends LitElement { /* ... */ }
```

### Stencil

- **Configurável:** Utiliza `@Component` com metadados.

Para mais detalhes sobre Stencil, veja a [documentação oficial](https://stenciljs.com/docs/getting-started).

```typescript
@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  @Prop() first: string;
  @Prop() middle: string;
  @Prop() last: string;
  /* ... */
}
```

### Vantagens do `@define`

- **Interface Nativa:** Respeita a assinatura do método nativo `customElements.define` ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define)).
- **Flexibilidade:** Não obriga a extensão de uma classe específica, oferecendo maior flexibilidade.

## Considerações Finais

O `define` é uma ferramenta eficaz para registrar Custom Elements, simplificando o desenvolvimento e melhorando a legibilidade do código, oferecendo uma interface familiar e flexível.
