# `<id-echo-source />`

O `<id-echo-source>` é um componente que permite a associação de múltiplos eventos a um único elemento que utiliza o mixin `Echo`, facilitando o gerenciamento dinâmico de eventos em Custom Elements.

## Visão Geral

### Nome e Classificação

- **Nome:** `id-echo-source`
- **Classificação:** Componente Customizado do id

### Objetivo

Facilitar a adição de múltiplos eventos em componentes que utilizam o mixin `Echo`, permitindo a gestão dinâmica dos eventos associados a esses componentes.

## Motivação

Usar o `<id-echo-source>` traz as seguintes vantagens:

1. **Flexibilidade:** Permite a adição dinâmica de múltiplos eventos a um único elemento.
2. **Modularidade:** Separa a lógica de gerenciamento de eventos, tornando o código mais modular e fácil de manter.
3. **Reutilização:** Pode ser reutilizado em diferentes componentes, eliminando a necessidade de duplicação de código.

## Aplicabilidade

Ideal para projetos que utilizam o mixin `Echo` e necessitam associar múltiplos eventos a um único elemento, especialmente em cenários onde os eventos precisam ser gerenciados de forma dinâmica.

## Importação

Para utilizar o componente `id-echo-source`, importe-o ou inclua-o diretamente em seu HTML:

```javascript
import '@bake-js/id/echo';
```

## Implementação

```javascript
import {
  attributeChangedCallback,
  echoConnectedCallback,
  echoDisconnectedCallback,
  observedAttributes,
  on,
} from "./interfaces";

class Source extends HTMLElement {
  static get [observedAttributes]() {
    return [on];
  }

  async [attributeChangedCallback](name, oldValue, newValue) {
    await customElements.whenDefined(this.parentElement.localName);
    this.parentElement?.[echoDisconnectedCallback]?.(oldValue);
    this.parentElement?.[echoConnectedCallback]?.(newValue);
    return this;
  }
}

customElements.define("id-echo-source", Source);
```

### Exemplo de Uso

```html
<custom-element>
  <o-id-echo-source on="element/event:action/name"></o-id-echo-source>
  <o-id-echo-source on="element/event:action/name"></o-id-echo-source>
</custom-element>
```

Neste exemplo, o `custom-element` gerenciará os eventos `event1`, `event2` e `event3`, cada um associado a um método específico, utilizando o `<o-id-echo-source>` para adicionar os eventos adicionais.

## Comparação com Concorrentes

### Lit

- **Comportamento Padrão:** O Lit não possui suporte nativo para um mixin equivalente ao `Echo` que permite a associação dinâmica de eventos dessa maneira.

### Stencil

- **Comportamento Padrão:** O Stencil também não oferece suporte nativo para um mixin equivalente ao `Echo`.

### Vantagens do `id-echo-source`

- **Facilidade de Uso:** Adiciona eventos dinamicamente a um elemento sem necessidade de lógica adicional.
- **Separação de Preocupações:** Mantém a lógica de eventos separada do componente principal.
- **Extensibilidade:** Facilmente extensível para gerenciar diferentes tipos de eventos.

## Considerações Finais

O componente `id-echo-source` é uma solução prática e modular para associar múltiplos eventos a um único elemento que utiliza o mixin `Echo`. Ele simplifica o gerenciamento de eventos, tornando o desenvolvimento de componentes mais eficiente e o código mais limpo e fácil de manter.
