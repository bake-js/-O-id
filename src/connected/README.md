# Connected

O `connected` é um decorator que permite adicionar um hook a métodos específicos de Custom Elements para execução quando o elemento é conectado ao DOM. Ele faz parte da biblioteca `@bake-js/-o-id` e oferece uma maneira declarativa para gerenciar a lógica de conexão de elementos.

## Visão Geral

### Nome e Classificação

- **Nome:** Connected
- **Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Objetivo

Facilitar a execução de lógica adicional quando um Custom Element é conectado ao DOM, simplificando a gestão do ciclo de vida do componente.

## Motivação

Usar o `connected` traz as seguintes vantagens:

1. **Execução Automática:** Garante que a lógica definida no método decorado seja executada sempre que o elemento for conectado ao DOM.
2. **Manutenção Simplificada:** Facilita a gestão da lógica de conexão ao evitar a necessidade de sobrescrever manualmente o `connectedCallback`.

## Aplicabilidade

Ideal para situações onde se deseja executar automaticamente lógica adicional quando um Custom Element é adicionado ao DOM. É especialmente útil para:

- **Inicialização de Componentes:** Preparar o estado do componente ou configurar recursos quando ele é conectado ao DOM.
- **Configuração de Interações:** Adicionar event listeners ou outras interações quando o elemento é adicionado ao DOM.

## Importação

Para utilizar o decorator `connected`, importe-o da seguinte maneira:

```javascript
import { connected } from '@bake-js/-o-id';
```

## Implementação

```javascript
import intercept, { exec } from "../intercept";
import { connectedCallback } from "../interfaces";

const connected = (target, propertyKey) => {
  const interceptor = intercept(connectedCallback);

  return interceptor
    .in(target)
    .then(exec(propertyKey));
};

export default connected;
```

## Exemplo de Uso

```javascript
import { connected, define } from '@bake-js/-o-id';
import { css, html, paint, repaint } from '@bake-js/-o-id/dom';
import on from '@bake-js/-o-id/event';

function component(self) {
  return html`
    <button>Increment ${self.number}</button>
  `;
}

function style() {
  return css`
    button {
      background: #ffffff;
      border-radius: 8px;
      color: #222222;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      line-height: 20px;
      padding: 10px 20px;
      border: 1px solid #222222;

      &:hover {
        background: #f7f7f7;
        border-color: #000000;
      }
    }
  `;
}

@define('o-id-counter')
@paint(component, style)
class Counter extends HTMLElement {
  #number;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  get number() {
    return (this.#number ??= 0);
  }

  @repaint
  set number(value) {
    this.#number = value;
  }

  @on.click('button')
  increment() {
    this.number += 1;
    return this;
  }

  @connected
  handleConnected() {
    // O elemento foi conectado ao DOM.
    return this
  }
}
```

### Explicação do Componente

Este exemplo demonstra a criação de um Custom Element chamado `o-id-counter`, que é um contador simples que incrementa ao clicar em um botão. Ele exemplifica a utilização do decorator `@connected`, que dispara a execução de uma lógica sempre que o elemento é conectado ao DOM.

- **Definição do Elemento:**
  - O elemento `o-id-counter` é definido utilizando o decorator `@define`, e encapsula sua estrutura e estilo usando Shadow DOM.
  
- **Estado Interno:**
  - O estado do contador é gerido por uma propriedade privada `#number`, e pode ser acessado e modificado através dos métodos `get number()` e `set number(value)`, respectivamente.

- **Renderização do Componente:**
  - A função `component(self)` define a estrutura HTML do componente, enquanto a função `style()` aplica os estilos necessários ao botão.
  
- **Interatividade:**
  - O método `increment()` é decorado com `@on.click('button')`, permitindo que o contador seja incrementado quando o botão for clicado.

- **Conexão ao DOM:**
  - O método `handleConnected()` é decorado com `@connected`, garantindo que ele seja chamado automaticamente quando o elemento for adicionado ao DOM. Essa abordagem simplifica a necessidade de sobrescrever o `connectedCallback` manualmente.

### Como Usar

Para utilizar este componente em sua aplicação:

1. Certifique-se de que o código esteja devidamente importado e definido.
2. Adicione o elemento `<o-id-counter></o-id-counter>` em qualquer parte do seu HTML.
3. O componente estará pronto para uso, incrementando o valor a cada clique no botão.

Exemplo de uso em HTML:

```html
<o-id-counter></o-id-counter>
```

## Considerações Finais

O `connected` é uma solução eficiente e prática para gerenciar a lógica de conexão de Custom Elements ao DOM. Ele promove maior simplicidade e manutenção no desenvolvimento de componentes, integrando-se de maneira natural ao ciclo de vida dos elementos nativos.
