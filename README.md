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

## Workflows

### Processo base

1. **[@define](https://github.com/bake-js/element/blob/main/src/define/README.md)** Define o componente personalizado.
2. **[@attributeChanged](https://github.com/bake-js/element/blob/main/src/attributeChanged/README.md)** Disparado para todos os atributos mapeados quando alterados.
3. **[@connected](https://github.com/bake-js/element/blob/main/src/connected/README.md)** Executado para todos os métodos decorados quando o componente é conectado ao DOM.
4. **[@willPaint](https://github.com/bake-js/element/blob/main/src/dom/willPaint/README.md)** Executado antes da renderização, permitindo preparação.
5. **[@paint](https://github.com/bake-js/element/blob/main/src/dom/paint/README.md)** Executa a renderização do componente.
6. **[@didPaint](https://github.com/bake-js/element/blob/main/src/dom/didPaint/README.md)** Executado após a renderização, permitindo ações posteriores.
7. **[@disconnected](https://github.com/bake-js/element/blob/main/src/disconnected/README.md)** Executado quando o componente é desconectado do DOM.

### Processo de repaint

1. **[@repaint](https://github.com/bake-js/element/blob/main/src/dom/repaint/README.md)** Disparado para iniciar o processo de repintura.
2. **[@willPaint](https://github.com/bake-js/element/blob/main/src/dom/willPaint/README.md)** Executado antes da repintura, permitindo preparação.
3. **[@paint](https://github.com/bake-js/element/blob/main/src/dom/paint/README.md)** Executa a repintura do componente.
4. **[@didPaint](https://github.com/bake-js/element/blob/main/src/dom/didPaint/README.md)** Executado após a repintura, permitindo ações posteriores.

### Processo de eventos

1. **[@on](https://github.com/bake-js/element/blob/main/src/event/on/README.md)** Associa um evento a um método específico.
2. **[@stop](https://github.com/bake-js/element/blob/main/src/event/stop/README.md)** Previne a propagação do evento.
3. **[@prevent](https://github.com/bake-js/element/blob/main/src/event/prevent/README.md)** Previne o comportamento padrão do evento.

## Módulos

### [Echo](https://github.com/bake-js/element/blob/main/src/echo/README.md)

O módulo Echo facilita a comunicação entre componentes através de um Event Bus, permitindo que eventos sejam transmitidos e recebidos por múltiplos componentes de maneira eficiente.

## Contribua

Ajude a melhorar o Element reportando problemas, sugerindo funcionalidades ou enviando pull requests. Veja mais na [página de issues](https://github.com/bake-js/element/issues).

## Suporte

Entre em contato pelo e-mail cleber.demgoncalves@gmail.com ou junte-se ao nosso canal no Slack.

## Licença

Distribuído sob a licença [MIT](https://choosealicense.com/licenses/mit/).
