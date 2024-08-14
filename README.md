# -O-id

**-O-id** é uma biblioteca leve e eficiente para criar Web Components personalizados, desenvolvida com foco em simplicidade e desempenho. Escrito inteiramente em JavaScript, **-O-id** otimiza o desempenho dos seus componentes, garantindo que eles sejam rápidos, leves e fáceis de manter. Com uma arquitetura intuitiva e o uso de decorators, como `@paint` e `@repaint`, o desenvolvimento de componentes reativos e modulares se torna simples e direto.

## Por que -O-id?

O nome **-O-id** foi inspirado na teoria psicanalítica de Sigmund Freud. O "**id**" representa a parte mais básica e primitiva da personalidade humana, que impulsiona nossos instintos fundamentais. Da mesma forma, a biblioteca **-O-id** serve como a base essencial para a construção de interfaces web. O sufixo "**-O**" simboliza a transformação de ideias em resultados tangíveis — componentes funcionais e eficientes.

**-O-id** não é apenas uma ferramenta, mas uma força que impulsiona a criação de interfaces, permitindo que desenvolvedores transformem conceitos em realidade de maneira ágil e intuitiva. Escolhemos este nome para destacar a importância de começar com uma base sólida, assim como o "**id**" é o ponto de partida na formação da personalidade.

## Instalação

Para instalar a biblioteca, utilize o npm:

```bash
npm install @bake-js/-o-id
```

> **Nota:** Também é compatível com `yarn` e `bun`.

## Exemplo de Uso

Aqui está um exemplo simples de como utilizar a biblioteca para criar um contador interativo:

```javascript
import { define } from '@bake-js/-o-id';
import { html, paint, repaint } from '@bake-js/-o-id/dom';
import on from '@bake-js/-o-id/event';

function component(self) {
  return html`
    <button>Increment ${self.number}</button>
  `;
}

@define('o-id-counter')
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

Este exemplo mostra como **-O-id** facilita a criação de componentes interativos com uma sintaxe clara e eficiente.

Claro! Aqui está a seção de documentação atualizada com links para os quatro principais guias:

## Documentação

A seguir, você encontrará a documentação detalhada para os principais módulos do **-O-id**. Cada link leva à página correspondente onde você pode aprender mais sobre como usar e implementar as funcionalidades oferecidas.

- **[Guia Rápido dos Módulos e Decorators](https://github.com/bake-js/-o-id/blob/main/src/README.md)**: Um guia completo para entender e aplicar os principais módulos e decorators do **-O-id**.

- **[Módulo DOM](https://github.com/bake-js/-o-id/blob/main/src/dom/README.md)**: Documentação sobre a manipulação do DOM e renderização de componentes com o módulo DOM.

- **[Módulo Event](https://github.com/bake-js/-o-id/blob/main/src/event/README.md)**: Guia para manipulação e resposta a eventos dentro dos Web Components, incluindo o uso de filtros.

- **[Módulo Echo](https://github.com/bake-js/-o-id/blob/main/src/echo/README.md)**: Documentação sobre o barramento de eventos Echo, para comunicação entre componentes. **Nota:** Este módulo está em fase beta e pode estar sujeito a mudanças.

## Contribua

Estamos sempre buscando maneiras de melhorar o **-O-id**. Você pode ajudar reportando problemas, sugerindo novas funcionalidades ou enviando pull requests. Acesse a [página de issues](https://github.com/bake-js/-o-id/issues) para mais informações.

## Suporte

Se precisar de suporte, sinta-se à vontade para entrar em contato por e-mail através de cleber.demgoncalves@gmail.com ou junte-se ao nosso canal no Slack.

## Licença

Este projeto é distribuído sob a licença [MIT](https://choosealicense.com/licenses/mit/), permitindo uso, modificação e distribuição aberta do código.
