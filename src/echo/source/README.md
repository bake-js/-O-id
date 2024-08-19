# `-o-id-echo-source`

O `<o-id-echo-source>` é um componente que permite a associação de múltiplos eventos a um único elemento que utiliza o mixin `Echo`, facilitando o gerenciamento dinâmico de eventos em Custom Elements.

## Visão Geral

### Nome e Classificação

- **Nome:** `-o-id-echo-source`
- **Classificação:** Componente Customizado do -O-id

### Objetivo

Facilitar a adição de múltiplos eventos em componentes que utilizam o mixin `Echo`, permitindo a gestão dinâmica dos eventos associados a esses componentes.

## Motivação

Usar o `<o-id-echo-source>` traz as seguintes vantagens:

1. **Flexibilidade:** Permite a adição dinâmica de múltiplos eventos a um único elemento.
2. **Modularidade:** Separa a lógica de gerenciamento de eventos, tornando o código mais modular e fácil de manter.
3. **Reutilização:** Pode ser reutilizado em diferentes componentes, eliminando a necessidade de duplicação de código.

## Aplicabilidade

Ideal para projetos que utilizam o mixin `Echo` e necessitam associar múltiplos eventos a um único elemento, especialmente em cenários onde os eventos precisam ser gerenciados de forma dinâmica.

## Importação

Para utilizar o componente `-o-id-echo-source`, importe-o ou inclua-o diretamente em seu HTML:

```javascript
import '@bake-js/-o-id/echo';
```

## Implementação

```javascript
// Importa constantes de interfaces para definir os callbacks e atributos
import {
  attributeChangedCallback,
  echoConnectedCallback,
  echoDisconnectedCallback,
  observedAttributes,
  on,
} from "./interfaces";

// Define a classe `Source` que estende `HTMLElement`
class Source extends HTMLElement {
  // Define quais atributos devem ser observados
  static get [observedAttributes]() {
    return [on];
  }

  // Define o comportamento quando um atributo observado é alterado
  async [attributeChangedCallback](name, oldValue, newValue) {
    // Garante que o elemento pai esteja definido
    await customElements.whenDefined(this.parentElement.localName);

    // Executa o callback de desconexão no elemento pai, se definido
    this.parentElement?.[echoDisconnectedCallback]?.(oldValue);

    // Executa o callback de conexão no elemento pai, se definido
    this.parentElement?.[echoConnectedCallback]?.(newValue);

    return this;
  }
}

// Registra o componente customizado com o nome 'o-id-echo-source'
customElements.define("o-id-echo-source", Source);
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

### Vantagens do `-o-id-echo-source`

- **Facilidade de Uso:** Adiciona eventos dinamicamente a um elemento sem necessidade de lógica adicional.
- **Separação de Preocupações:** Mantém a lógica de eventos separada do componente principal.
- **Extensibilidade:** Facilmente extensível para gerenciar diferentes tipos de eventos.

## Considerações Finais

O componente `-o-id-echo-source` é uma solução prática e modular para associar múltiplos eventos a um único elemento que utiliza o mixin `Echo`. Ele simplifica o gerenciamento de eventos, tornando o desenvolvimento de componentes mais eficiente e o código mais limpo e fácil de manter.
