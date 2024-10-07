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

### Detalhes do Exemplo:

1. **Componentes e Estilos:** A função `component` cria a estrutura HTML do botão, enquanto `style` define os estilos CSS que são aplicados ao botão.

2. **Definição do Elemento:** O elemento é definido como `o-id-counter` usando o decorator `@define`.

3. **Estado Interno:** O contador é mantido na variável privada `#number`, que inicia com zero. O método `get` e `set` são utilizados para acessar e modificar o valor do contador.

4. **Incremento de Valor:** O método `increment` é chamado ao clicar no botão, aumentando o valor do contador e atualizando a visualização.

5. **Callback de Adoção:** O método `handleAdoption`, decorado com `@adopted`, é chamado automaticamente quando o componente é movido para um novo documento ou Shadow DOM. Ele pode conter qualquer lógica adicional que você deseja executar nessa situação.

## Considerações Finais

O decorator `adopted` oferece uma maneira eficaz e declarativa de adicionar lógica ao método `adoptedCallback`, simplificando o desenvolvimento e melhorando a legibilidade do código. Ele se destaca pela sua capacidade de centralizar e simplificar o gerenciamento de eventos de adoção em Custom Elements, tornando a manutenção do código mais eficiente e intuitiva.
