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

## Documentacao

### Eventos de ciclo de vida

1. **[@define](https://github.com/bake-js/element/blob/main/src/define/README.md)** Define o componente personalizado.
2. **[@adopted](https://github.com/bake-js/element/blob/main/src/adopted/README.md)** Executando quando o component e movido.
3. **[@attributeChanged](https://github.com/bake-js/element/blob/main/src/attributeChanged/README.md)** Disparado para todos os atributos mapeados quando alterados.
4. **[@connected](https://github.com/bake-js/element/blob/main/src/connected/README.md)** Executado para todos os métodos decorados quando o componente é conectado ao DOM.
5. **[@disconnected](https://github.com/bake-js/element/blob/main/src/disconnected/README.md)** Executado quando o componente é desconectado do DOM.
6. **[@formAssociated](https://github.com/bake-js/element/blob/main/src/dom/formAssociated/README.md)**
7. **[@formDisabled](https://github.com/bake-js/element/blob/main/src/dom/formDisabled/README.md)**
8. **[@formReset](https://github.com/bake-js/element/blob/main/src/dom/formReset/README.md)**
9. **[@formStateRestore](https://github.com/bake-js/element/blob/main/src/dom/formStateRestore/README.md)**

### Paint & repaint

1. **[@willPaint](https://github.com/bake-js/element/blob/main/src/dom/willPaint/README.md)** Executado antes da repintura, permitindo preparação.
2. **[@paint](https://github.com/bake-js/element/blob/main/src/dom/paint/README.md)** Executa a repintura do componente.
3. **[@didPaint](https://github.com/bake-js/element/blob/main/src/dom/didPaint/README.md)** Executado após a repintura, permitindo ações posteriores.
4. **[@repaint](https://github.com/bake-js/element/blob/main/src/dom/repaint/README.md)** Disparado para iniciar o processo de repintura.

### Eventos & filtros

1. **[@on](https://github.com/bake-js/element/blob/main/src/event/on/README.md)** Associa um evento a um método específico.
2. **[formData](https://github.com/bake-js/element/blob/main/src/formData/stop/README.md)**
3. **[stop](https://github.com/bake-js/element/blob/main/src/event/stop/README.md)** Previne a propagação do evento.
4. **[prevent](https://github.com/bake-js/element/blob/main/src/event/prevent/README.md)** Previne o comportamento padrão do evento.

### Barramento 

1. **[Echo](https://github.com/bake-js/element/blob/main/src/echo/README.md)** Facilita a comunicação entre componentes através de um Event Bus.

## Contribua

Ajude a melhorar o Element reportando problemas, sugerindo funcionalidades ou enviando pull requests. Veja mais na [página de issues](https://github.com/bake-js/element/issues).

## Suporte

Entre em contato pelo e-mail cleber.demgoncalves@gmail.com ou junte-se ao nosso canal no Slack.

## Licença

Distribuído sob a licença [MIT](https://choosealicense.com/licenses/mit/).
