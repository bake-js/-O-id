[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=bugs)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=coverage)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)

# -O-id

**-O-id** é uma biblioteca leve e eficiente para a criação de Web Components personalizados, com foco em simplicidade e desempenho. Desenvolvida inteiramente em JavaScript, **-O-id** garante que seus componentes sejam rápidos, leves e de fácil manutenção. Com uma arquitetura intuitiva e a utilização de decorators como `@paint` e `@repaint`, o desenvolvimento de componentes reativos e modulares se torna simples e direto.

## Por que -O-id?

O nome **-O-id** é inspirado na teoria psicanalítica de Sigmund Freud. O "**id**" representa a parte mais primitiva da personalidade humana, impulsionando nossos instintos fundamentais. Analogamente, a biblioteca **-O-id** serve como uma base essencial para a construção de interfaces web. O sufixo "**-O**" simboliza a transformação de ideias em resultados tangíveis — componentes funcionais e eficientes.

**-O-id** não é apenas uma ferramenta, mas uma força que impulsiona a criação de interfaces, permitindo que desenvolvedores transformem conceitos em realidade de maneira ágil e intuitiva. Este nome destaca a importância de começar com uma base sólida, assim como o "**id**" é o ponto de partida na formação da personalidade.

## Instalação

Para instalar a biblioteca, utilize o npm:

```bash
npm install @bake-js/-o-id
```

> **Nota:** A biblioteca também é compatível com `yarn` e `bun`.

## Exemplo de Uso

Abaixo está um exemplo simples de como utilizar a biblioteca para criar um contador interativo:

```javascript
import { define } from '@bake-js/-o-id';
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
      background: hsl(${(self.number * 30) % 360}, 100%, 50%);
      border-radius: 8px;
      color: #222222;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      line-height: 20px;
      padding: 10px 20px;
      border: 1px solid #222222;

      &:hover {
        background: hsl(${(self.number * 30) % 360}, 50%, 50%);
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
}
```

Você pode ver o exemplo interativo no [CodePen](https://codepen.io/demgoncalves/pen/dyxpdLw?editors=1010).

### Explicação do Componente

O exemplo ilustra a criação de um componente Custom Element chamado `o-id-counter`, representando um contador que pode ser incrementado por meio de um botão. A seguir, as principais características do componente:

- **Definição do Elemento:**
  - O elemento é definido como `o-id-counter` utilizando o decorator `@define`, e utiliza Shadow DOM para encapsular seus estilos e estrutura.

- **Estado Interno:**
  - O estado do contador é armazenado em uma propriedade privada `#number`, iniciando em zero. O método `get number()` retorna o valor atual, enquanto o método `set number(value)` permite a atualização.

- **Renderização do Componente:**
  - A função `component(self)` gera a estrutura HTML do botão, e a função `style()` define os estilos CSS aplicados.

- **Interatividade:**
  - O método `increment()` é decorado com `@on.click('button')`, permitindo que o contador seja incrementado a cada clique no botão. Este método atualiza o estado e re-renderiza o componente automaticamente.

### Como Usar

Para utilizar este componente em sua aplicação:

1. Certifique-se de que o código esteja devidamente importado e definido.
2. Adicione o elemento `<o-id-counter></o-id-counter>` em qualquer parte do seu HTML.
3. O componente estará pronto para uso, incrementando o valor a cada clique no botão.

Exemplo de uso em HTML:

```html
<o-id-counter></o-id-counter>
```

> Este exemplo demonstra como **-O-id** facilita a criação de componentes interativos com uma sintaxe clara e eficiente.

## Demonstração

Para ver a biblioteca **-O-id** em ação, acesse nosso [demo interativo](https://github.com/bake-js/-o-id-demo).

## Assistente

Se você precisar de ajuda ou orientação sobre como usar a biblioteca **-O-id**, sinta-se à vontade para acessar nosso [assistente online](https://hf.co/chat/assistant/6703c9dfe3610a31b5ef3523), que fornece suporte adicional e documentação interativa.

## Documentação

A seguir, você encontrará a documentação detalhada para os principais módulos do **-O-id**. Cada link leva à página correspondente onde você pode aprender mais sobre como usar e implementar as funcionalidades oferecidas.

- **[Ciclo de Vida e Formulários](https://github.com/bake-js/-o-id/blob/main/src/README.md)**: Um guia completo para entender e aplicar os principais módulos e decorators do **-O-id**.
- **[DOM](https://github.com/bake-js/-o-id/blob/main/src/dom/README.md)**: Documentação sobre a manipulação do DOM e renderização de componentes.
- **[Event](https://github.com/bake-js/-o-id/blob/main/src/event/README.md)**: Guia para manipulação e resposta a eventos dentro dos Web Components.
- **[Relay](https://github.com/bake-js/-o-id/blob/main/src/relay/README.md)**: Facilita a escuta de eventos emitidos pelo parentElement de um Custom Element.
- **[Echo](https://github.com/bake-js/-o-id/blob/main/src/echo/README.md)**: Documentação sobre o barramento de eventos Echo, para comunicação entre componentes. **Nota:** Este módulo está em fase beta e pode estar sujeito a mudanças.

## Índice de Referência

### Ciclo de Vida
Documentação sobre os callbacks e métodos relacionados ao ciclo de vida dos Custom Elements. Esses métodos são fundamentais para gerenciar o estado e as mudanças dos elementos ao longo de sua existência no DOM.
- [adopted](https://github.com/bake-js/-o-id/blob/main/src/adopted/README.md) - Callback chamado quando um Custom Element é adotado por um novo documento.
- [attributeChanged](https://github.com/bake-js/-o-id/blob/main/src/attributeChanged/README.md) - Callback chamado quando um atributo de um Custom Element é alterado.
- [connected](https://github.com/bake-js/-o-id/blob/main/src/connected/README.md) - Callback chamado quando um Custom Element é inserido no DOM.
- [disconnected](https://github.com/bake-js/-o-id/blob/main/src/disconnected/README.md) - Callback chamado quando um Custom Element é removido do DOM.
- [define](https://github.com/bake-js/-o-id/blob/main/src/define/README.md) - Função para definir e registrar um novo Custom Element.

### Ciclo de Vida Associados a Formulários
Informações sobre os callbacks específicos para a interação de Custom Elements com formulários. Esses callbacks são utilizados para gerenciar o estado e as ações relacionadas aos formulários.
- [formAssociated](https://github.com/bake-js/-o-id/blob/main/src/formAssociated/README.md) - Callback chamado quando um elemento é associado a um formulário.
- [formDisabled](https://github.com/bake-js/-o-id/blob/main/src/formDisabled/README.md) - Callback chamado quando um elemento é desativado dentro de um formulário.
- [formReset](https://github.com/bake-js/-o-id/blob/main/src/formReset/README.md) - Callback chamado quando um formulário associado é resetado.
- [formStateRestore](https://github.com/bake-js/-o-id/blob/main/src/formStateRestore/README.md) - Callback chamado para restaurar o estado do formulário.

### DOM
Documentação sobre como manipular o DOM e criar elementos personalizados.
- [css](https://github.com/bake-js/-o-id/blob/main/src/css/README.md) - Helper para criar estilos CSS personalizados para Custom Elements.
- [didPaint](https://github.com/bake-js/-o-id/blob/main/src/didPaint/README.md) - Decorator que permite a execução de lógica após a renderização do componente.
- [html](https://github.com/bake-js/-o-id/blob/main/src/html/README.md) - Helper para gerar HTML limpo e eficiente a partir de templates.
- [paint](https://github.com/bake-js/-o-id/blob/main/src/paint/README.md) - Decorator que chama a função de renderização do componente.
- [repaint](https://github.com/bake-js/-o-id/blob/main/src/repaint/README.md) - Decorator que atualiza a renderização do componente ao alterar o estado.
- [willPaint](https://github.com/bake-js/-o-id/blob/main/src/willPaint/README.md) - Decorator que permite a execução de lógica antes da renderização do componente.

### Eventos
Documentação sobre como gerenciar eventos em Custom Elements, facilitando a comunicação e a interatividade.
- [on](https://github.com/bake-js/-o-id/blob/main/src/event/event/README.md) - Decorator para adicionar listeners de eventos aos elementos.
- [stop](https://github.com/bake-js/-o-id/blob/main/src/event/stop/README.md) - Filtro que chama `event.stopPropagation()` e retorna o evento, prevenindo que o evento suba na árvore do DOM.
- [prevent](https://github.com/bake-js/-o-id/blob/main/src/event/prevent/README.md) - Filtro que chama `event.preventDefault()` e retorna o evento, prevenindo a ação padrão do evento.
- [formData](https://github.com/bake-js/-o-id/blob/main/src/event/formData/README.md) - Filtro que extrai os dados do formulário e retorna um objeto contendo os pares chave-valor.
- [value](https://github.com/bake-js/-o-id/blob/main/src/event/value/README.md) - Filtro que obtém o valor do evento, útil para inputs e select.

### Echo
Documentação sobre o módulo Echo, um barramento de eventos que permite a comunicação entre componentes de forma eficiente.
- [echo](https://github.com/bake-js/-o-id/blob/main/src/echo/README.md) - Módulo para comunicação entre componentes, permitindo a emissão e escuta de eventos de forma simplificada.

## Contribuindo

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir issues ou pull requests. Para começar, confira as [diretrizes de contribuição](https://github.com/bake-js/-o-id/blob/main/CONTRIBUTING.md).

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](https://github.com/bake-js/-o-id/blob/main/LICENSE) para mais detalhes.
