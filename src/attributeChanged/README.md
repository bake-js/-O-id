# AttributeChanged

O `attributeChanged` é um decorator que permite adicionar lógica personalizada a métodos específicos de Custom Elements para execução quando um atributo definido é alterado. Ele é parte da biblioteca `@bake-js/-o-id` e fornece uma abordagem declarativa para gerenciar mudanças de atributos.

## Visão Geral

### Nome e Classificação

- **Nome:** AttributeChanged
- **Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Objetivo

Proporcionar uma maneira eficiente de reagir a alterações de atributos em Custom Elements, simplificando a lógica de atualização de componentes.

## Motivação

O uso do `attributeChanged` oferece as seguintes vantagens:

1. **Reatividade a Alterações de Atributos:** Garante que o método decorado seja executado sempre que o atributo especificado for alterado.
2. **Manutenção da Consistência:** Facilita a atualização de estados internos e a adaptação visual do componente em resposta a mudanças de atributos.
3. **Filtros Personalizados:** Permite aplicar filtros aos novos valores dos atributos antes de executar a lógica personalizada.

## Aplicabilidade

Ideal para qualquer situação onde se deseja responder a alterações de atributos específicos em Custom Elements. É especialmente útil para:

- **Componentes Interativos:** Quando a atualização dinâmica com base em atributos é necessária.
- **Sincronização de Estados Internos:** Para manter a consistência entre atributos e o estado interno do componente.

## Importação

Para utilizar o decorator `attributeChanged`, importe-o da seguinte maneira:

```javascript
import { attributeChanged } from '@bake-js/-o-id';
```

## Implementação

```javascript
import { define, attributeChanged } from '@bake-js/-o-id';
import { css, html, paint, repaint } from '@bake-js/-o-id/dom';
import on from '@bake-js/-o-id/event';

function component(self) {
  return html
    <button>Increment ${self.number}</button>
  ;
}

function style() {
  return css
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
      transition: background 0.3s, border-color 0.3s;

      &:hover {
        background: #f7f7f7;
        border-color: #000000;
      }
    }

    p {
      font-size: 14px;
      color: #555555;
      margin-top: 10px;
    }
  ;
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

  @attributeChanged('number')
  @repaint
  set number(value) {
    this.#number = value;
  }

  @on.click('button')
  increment() {
    this.number += 1;
    return this;
  }
}
```

### Explicação do Componente

O componente `Counter` é um exemplo de como criar um elemento personalizado que gerencia seu próprio estado e reatividade. Abaixo, estão os principais aspectos do componente:

- **Estrutura do Componente:**
  - O componente é definido usando o decorator `@define`, que registra o nome do elemento como `o-id-counter`.
  - A função `component` retorna o HTML do botão que exibe o valor atual do contador.

- **Estilos:**
  - Os estilos do botão são definidos pela função `style`, que utiliza CSS moderno e inclui efeitos de transição para uma interação suave.

- **Gerenciamento de Estado:**
  - A propriedade privada `#number` armazena o valor atual do contador, que inicia em `0`.
  - O getter `number` retorna o valor atual e inicializa `#number` caso ele seja `undefined`.

- **Reatividade:**
  - O decorator `@repaint` é utilizado no setter `number`, garantindo que a renderização do componente seja atualizada sempre que o valor do contador mudar.

- **Eventos:**
  - O método `increment` é decorado com `@on.click('button')`, permitindo que o número seja incrementado cada vez que o botão é clicado.

- **Adoção de Elementos:**
  - O componente é configurado para utilizar `Shadow DOM` ao chamar `this.attachShadow({ mode: 'open' })`, garantindo que os estilos e scripts não afetem outros elementos na página.

### Como Usar

Para utilizar este componente em sua aplicação:

1. Certifique-se de que o código esteja devidamente importado e definido.
2. Adicione o elemento `<o-id-counter></o-id-counter>` em qualquer parte do seu HTML.
3. O componente estará pronto para uso, incrementando o valor a cada clique no botão.

Exemplo de uso em HTML:

```html
<o-id-counter number="5"></o-id-counter>
```

## Vantagens do `@attributeChanged`

- **Simplicidade na Implementação:** Facilita a adição de lógica de resposta a mudanças de atributos, centralizando a implementação.
- **Reatividade Aprimorada:** Permite que componentes respondam rapidamente a alterações de atributos, mantendo a experiência do usuário fluida.
- **Flexibilidade com Filtros:** Oferece a capacidade de aplicar filtros personalizados aos valores dos atributos antes da execução da lógica, aumentando a flexibilidade e a adaptabilidade do componente.

## Considerações Finais

O `attributeChanged` oferece uma solução prática e eficiente para gerenciar respostas a mudanças de atributos em Custom Elements. Ele promove a reatividade e a facilidade de manutenção dos componentes, facilitando a atualização e a sincronização do estado interno com os atributos do DOM. Com a adição de filtros, o decorator se torna ainda mais poderoso, permitindo ajustes personalizados nos valores dos atributos antes de executar a lógica específica do componente.
