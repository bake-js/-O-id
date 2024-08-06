# Element

Element é uma biblioteca leve e poderosa para criar Web Components personalizados com eficiência e simplicidade. Utilizando apenas JavaScript, o Element é otimizado para desempenho, garantindo que seus componentes sejam rápidos e leves. Com uma arquitetura intuitiva e o uso de decorators, como `paint` e `repaint`, o desenvolvimento de componentes reativos e modulares se torna simples e direto.

## Instalação

Instale o Element com npm:

```bash
npm install @bake-js/element
```

> **Nota:** Também funciona com yarn e bun.

## Exemplo de Uso

```javascript
import { define } from '@bake-js/element';
import { html, paint, repaint } from '@bake-js/element/dom';
import on from '@bake-js/element/event';

function component(self) {
  return html`
    <button>Increment ${self.number}</button>
  `;
}

@define('element-counter')
@paint(component)
class Counter extends HTMLElement {
  #number;

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

## Quick Start

Para começar um novo projeto com o Element, utilize o degit para clonar o template:

```bash
bunx degit bake-js/element-template my-project
cd my-project
bun install
bun dev
```

## Documentação

### [Standard](https://github.com/bake-js/element/blob/main/src/README.md)

Os módulos standard são essenciais para a criação e gerenciamento de Web Components no Element. Eles fornecem a funcionalidade básica necessária para definir, conectar, desconectar e gerenciar o ciclo de vida dos componentes. Inclui:

- [adopted](https://github.com/bake-js/element/blob/main/src/adopted/README.md)
- [attributeChanged](https://github.com/bake-js/element/blob/main/src/attributeChanged/README.md)
- [connected](https://github.com/bake-js/element/blob/main/src/connected/README.md)
- [disconnected](https://github.com/bake-js/element/blob/main/src/disconnected/README.md)
- [formAssociated](https://github.com/bake-js/element/blob/main/src/formAssociated/README.md)
- [formDisabled](https://github.com/bake-js/element/blob/main/src/formDisabled/README.md)
- [formReset](https://github.com/bake-js/element/blob/main/src/formReset/README.md)
- [formStateRestore](https://github.com/bake-js/element/blob/main/src/formStateRestore/README.md)

### [DOM](https://github.com/bake-js/element/blob/main/src/dom/README.md)

Os módulos DOM são responsáveis pela manipulação direta do DOM e pela renderização dos componentes. Eles permitem que você crie e atualize a interface do usuário de maneira eficiente e reativa. Inclui:

- [paint](https://github.com/bake-js/element/blob/main/src/dom/paint/README.md)
- [repaint](https://github.com/bake-js/element/blob/main/src/dom/repaint/README.md)
- [didPaint](https://github.com/bake-js/element/blob/main/src/dom/didPaint/README.md)
- [willPaint](https://github.com/bake-js/element/blob/main/src/dom/willPaint/README.md)
- [html](https://github.com/bake-js/element/blob/main/src/dom/html/README.md)
- [css](https://github.com/bake-js/element/blob/main/src/dom/css/README.md)

### [Event](https://github.com/bake-js/element/blob/main/src/event/README.md)

Os módulos Event permitem a fácil manipulação e resposta a eventos dentro dos seus Web Components. Eles fornecem decorators para associar eventos a métodos específicos. Inclui:

- [on](https://github.com/bake-js/element/blob/main/src/event/on/README.md)
- [stop](https://github.com/bake-js/element/blob/main/src/event/stop/README.md)
- [prevent](https://github.com/bake-js/element/blob/main/src/event/prevent/README.md)

### [Echo](https://github.com/bake-js/element/blob/main/src/echo/README.md)

O módulo Echo facilita a comunicação entre componentes através de um Event Bus, permitindo que eventos sejam transmitidos e recebidos por múltiplos componentes de maneira eficiente. Inclui:

- [Echo](https://github.com/bake-js/element/blob/main/src/echo/README.md)

## Contribua

Ajude a melhorar o Element reportando problemas, sugerindo funcionalidades ou enviando pull requests. Veja mais na [página de issues](https://github.com/bake-js/element/issues).

## Suporte

Entre em contato pelo e-mail cleber.demgoncalves@gmail.com ou junte-se ao nosso canal no Slack.

## Licença

Distribuído sob a licença [MIT](https://choosealicense.com/licenses/mit/).
