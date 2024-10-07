# Adopted

O `adopted` é um decorator que simplifica a execução de lógica específica quando um Custom Element é movido no DOM, sendo parte da biblioteca `@bake-js/-o-id`.

## Visão Geral

### Nome e Classificação

- **Nome:** Adopted
- **Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Objetivo

Facilitar a adição de lógica que é executada automaticamente quando um Custom Element é adotado em um novo documento ou Shadow DOM.

## Motivação

Usar o `adopted` traz as seguintes vantagens:

1. **Simplificação do Código:** Elimina a necessidade de definir manualmente o método `adoptedCallback`.
2. **Facilidade de Manutenção:** Centraliza a lógica relacionada à adoção de elementos em um único método decorado.
3. **Consistência:** Garante que a lógica de adoção seja executada de maneira consistente sempre que o elemento é movido.

## Aplicabilidade

Ideal para qualquer situação onde se deseja executar lógica personalizada sempre que um Custom Element é movido para um novo documento ou Shadow DOM, especialmente em componentes que mantêm estado ou precisam reagir a mudanças de contexto.

## Importação

Para utilizar o decorator `adopted`, importe-o da seguinte maneira:

```javascript
import { adopted } from '@bake-js/-o-id';
```

## Implementação

```javascript
import intercept, { exec } from "../intercept";
import { adoptedCallback } from "../interfaces";

const adopted = (target, propertyKey) => {
  const interceptor = intercept(adoptedCallback);

  return interceptor
    .in(target)
    .then(exec(propertyKey));
};

export default adopted;
```

## Exemplo de Uso

```javascript
import { adopted, define } from '@bake-js/-o-id';
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

  @adopted
  handleAdoption() {
    // Qualquer lógica adicional ao ser adotado pode ser adicionada aqui
    return this
  }
}
```

### Explicação do Componente

O exemplo abaixo ilustra a criação de um componente Custom Element chamado `o-id-counter`, que representa um contador que pode ser incrementado por meio de um botão. O componente demonstra a utilização do decorator `@adopted`, permitindo que lógica específica seja executada quando o elemento é movido no DOM.

- **Definição do Elemento:**
  - O elemento é definido como `o-id-counter` utilizando o decorator `@define`.
  - Ele se utiliza de Shadow DOM para encapsular seus estilos e estrutura.

- **Estado Interno:**
  - O estado do contador é armazenado em uma propriedade privada `#number`, que inicia com zero.
  - O método `get number()` é utilizado para acessar o valor atual do contador, enquanto o método `set number(value)` permite modificá-lo.

- **Renderização do Componente:**
  - A função `component(self)` gera a estrutura HTML do botão, que exibe o valor atual do contador.
  - A função `style()` define os estilos CSS aplicados ao botão, garantindo uma boa aparência.

- **Interatividade:**
  - O método `increment()` é decorado com `@on.click('button')`, permitindo que o contador seja incrementado ao clicar no botão. Este método atualiza o estado e re-renderiza o componente.

- **Lógica de Adoção:**
  - O método `handleAdoption()` é decorado com `@adopted`, o que significa que ele será chamado automaticamente sempre que o componente for movido para um novo documento ou Shadow DOM. Isso permite que você adicione qualquer lógica adicional necessária para esse evento.

### Como Usar

Para utilizar o componente em sua aplicação, basta incluir o código acima e adicionar o elemento `<o-id-counter></o-id-counter>` em seu HTML. O contador estará pronto para ser usado, permitindo interação do usuário para incrementar o valor.

```html
<o-id-counter></o-id-counter>
```

## Considerações Finais

O decorator `adopted` oferece uma maneira eficaz e declarativa de adicionar lógica ao método `adoptedCallback`, simplificando o desenvolvimento e melhorando a legibilidade do código. Ele se destaca pela sua capacidade de centralizar e simplificar o gerenciamento de eventos de adoção em Custom Elements, tornando a manutenção do código mais eficiente e intuitiva.
