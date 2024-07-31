# Element

Bem-vindo à documentação oficial da biblioteca Element – a solução definitiva para criar Web Components personalizados de forma eficiente.

## Por que escolher o Element?

O Element oferece simplicidade, inovação e desempenho para o desenvolvimento de componentes web. Aqui estão alguns motivos para utilizá-lo:

#### Simplicidade e Elegância

Desenvolva componentes de forma intuitiva e direta com o Element. Com uma sintaxe minimalista e poderosos decorators, você pode criar componentes complexos de maneira simples.

#### Inovação e Flexibilidade

Os decorators `paint` e `repaint` permitem que seus componentes sejam reativos e responsivos às mudanças de estado, garantindo uma experiência de usuário fluida.

#### Desempenho Otimizado

Construído em Vanilla JavaScript e otimizado para desempenho, o Element garante eficiência sem comprometer a performance. Seus componentes são leves e rápidos.

#### Tamanho Compacto

Com apenas 960 bits, o Element é leve e fácil de integrar em qualquer projeto, garantindo uma experiência de desenvolvimento ágil e eficiente.

## Instalação

Para começar, instale o Element em seu projeto usando npm, yarn ou bun:

**npm**

```bash
npm install @bake-js/element
```

**yarn**

```bash
yarn add @bake-js/element
```

**bun**

```bash
bun add @bake-js/element
```

## Arquitetura do Componente

A arquitetura do Element é projetada para facilitar o desenvolvimento de componentes reativos e modulares. Abaixo está uma visão geral da arquitetura de um componente:

#### Descrição da Arquitetura

- **Root Aggregate (Class)**: A classe principal que atua como o ponto central do componente.
- **View (Component)**: Representa a interface do usuário e reage às mudanças de estado.
- **State (Getters)**: Gerencia e expõe o estado do componente.
- **Action (Methods)**: Métodos que modificam o estado ou executam ações específicas.
- **Policy (@decorators)**: Decorators que definem comportamentos e políticas específicas.
- **Actor (events)**: Eventos que são disparados para comunicar mudanças ou ações.

#### Exemplo de Uso

Veja como é fácil criar um componente com o Element:

```javascript
import { define, html, on, paint, repaint } from '@bake-js/element';

function component(self) {
  return html`
    <button>Increment ${self.number}</button>
  `;
}

@define('element-counter')
@paint(component)
class Counter extends HTMLElement {
  #nnumber;

  get number() {
    return (this.#number ??= 0);
  }

  set number(value) {
    this.#number = value;
  }

  @on.click('button')
  @repaint
  increment() {
    this.number += 1;
    return this;
  }
}
```

#### Criando um Projeto

Inicie um novo projeto com o Element configurado:

```bash
bunx degit bake-js/element-template my-project
cd my-project
bun install
bun dev
```

## Documentação

Explore a documentação detalhada de cada parte do projetoe:

- [adopted](https://github.com/bake-js/element/blob/main/src/adopted/README.md)
- [attributeChanged](https://github.com/bake-js/element/blob/main/src/attributeChanged/README.md)
- [connected](https://github.com/bake-js/element/blob/main/src/connected/README.md)
- [define](https://github.com/bake-js/element/blob/main/src/define/README.md)
- [didPaint](https://github.com/bake-js/element/blob/main/src/didPaint/README.md)
- [disconnected](https://github.com/bake-js/element/blob/main/src/disconnected/README.md)
- [on](https://github.com/bake-js/element/blob/main/src/on/README.md)
- [paint](https://github.com/bake-js/element/blob/main/src/paint/README.md)
- [repaint](https://github.com/bake-js/element/blob/main/src/repaint/README.md)
- [trait](https://github.com/bake-js/element/blob/main/src/trait/README.md)
- [willPaint](https://github.com/bake-js/element/blob/main/src/willPaint/README.md)

## Contribua

Ajude a melhorar o Element reportando problemas, sugerindo novas funcionalidades ou enviando pull requests. Visite nossa [página de issues](https://github.com/bake-js/element/issues).

## Autores

- [deMGoncalves](https://www.github.com/deMGoncalves)

## Suporte

Precisa de ajuda? Entre em contato pelo e-mail cleber.demgoncalves@gmail.com ou junte-se ao nosso canal no Slack.

## Licença

Distribuído sob a licença [MIT](https://choosealicense.com/licenses/mit/).
