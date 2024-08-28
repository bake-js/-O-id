[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=bugs)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=coverage)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)

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

- **[Guia Rápido](https://github.com/bake-js/-o-id/blob/main/src/README.md)**: Um guia completo para entender e aplicar os principais módulos e decorators do **-O-id**.
- **[DOM](https://github.com/bake-js/-o-id/blob/main/src/dom/README.md)**: Documentação sobre a manipulação do DOM e renderização de componentes com o módulo DOM.
- **[Event](https://github.com/bake-js/-o-id/blob/main/src/event/README.md)**: Guia para manipulação e resposta a eventos dentro dos Web Components, incluindo o uso de filtros.
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
- [formStateRestore](https://github.com/bake-js/-o-id/blob/main/src/formStateRestore/README.md) - Callback chamado quando o estado de um elemento é restaurado dentro de um formulário.

### DOM
Documentação sobre as funcionalidades e helpers relacionados ao DOM e ao processo de renderização dos Custom Elements. Inclui decorators e funções que ajudam a manipular estilos e o conteúdo visual dos componentes.
- [css](https://github.com/bake-js/-o-id/blob/main/src/dom/css/README.md) - Helper para gerar folhas de estilo (`CSSStyleSheet`) para uso com Web Components.
- [didPaint](https://github.com/bake-js/-o-id/blob/main/src/dom/didPaint/README.md) - Callback chamado após o componente ser pintado.
- [html](https://github.com/bake-js/-o-id/blob/main/src/dom/html/README.md) - Helper para processar strings de template literal em HTML.
- [paint](https://github.com/bake-js/-o-id/blob/main/src/dom/paint/README.md) - Decorator para chamar o callback de pintura durante a execução do método original.
- [repaint](https://github.com/bake-js/-o-id/blob/main/src/dom/repaint/README.md) - Decorator para garantir que o callback de pintura seja chamado após a execução do método original.
- [willPaint](https://github.com/bake-js/-o-id/blob/main/src/dom/willPaint/README.md) - Decorator para adicionar lógica que deve ser executada antes do callback de pintura.

### Event
Informações sobre os filtros e decorators para eventos. Inclui funções para gerenciar e processar eventos em Custom Elements, como adicionar listeners e manipular dados de eventos.
- [on](https://github.com/bake-js/-o-id/blob/main/src/event/on/README.md) - Decorator para adicionar listeners de eventos a métodos de Custom Elements.
- [formData](https://github.com/bake-js/-o-id/blob/main/src/event/formData/README.md) - Filtro que converte os dados de um formulário em um objeto.
- [prevent](https://github.com/bake-js/-o-id/blob/main/src/event/prevent/README.md) - Filtro que impede o comportamento padrão de um evento.
- [stop](https://github.com/bake-js/-o-id/blob/main/src/event/stop/README.md) - Filtro que interrompe a propagação de um evento.
- [value](https://github.com/bake-js/-o-id/blob/main/src/event/value/README.md) - Filtro que extrai o valor de um campo de entrada associado ao evento.

### Echo
Documentação sobre o módulo Echo, um barramento de eventos experimental para comunicação entre componentes. Inclui informações sobre como configurar e usar Echo para gerenciar eventos.
- [Echo](https://github.com/bake-js/-o-id/blob/main/src/echo/echo/README.md) - Módulo para gerenciamento de eventos com um barramento de eventos.
- [o-id-echo-source](https://github.com/bake-js/-o-id/blob/main/src/echo/source/README.md) - Fonte para eventos no módulo Echo.

### Interfaces
Descrição dos identificadores e constantes usadas para padronizar callbacks e estados em Custom Elements. Inclui informações sobre como esses identificadores são utilizados no contexto de Custom Elements e eventos.
- [Global](https://github.com/bake-js/-o-id/blob/main/src/interfaces/README.md) - Identificadores e constantes globais usadas em Custom Elements.
- [DOM](https://github.com/bake-js/-o-id/blob/main/src/dom/interfaces/README.md) - Identificadores e constantes específicas para manipulação do DOM em Custom Elements.
- [Event](https://github.com/bake-js/-o-id/blob/main/src/event/interfaces/README.md) - Identificadores e constantes específicas para eventos e manipulação de dados de eventos.

## Demo

Confira um exemplo prático de como o **-O-id** pode ser utilizado em nosso [demo](https://github.com/bake-js/-o-id-demo).

## Contribua

Estamos sempre buscando maneiras de melhorar o **-O-id**. Você pode ajudar reportando problemas, sugerindo novas funcionalidades ou enviando pull requests. Acesse a [página de issues](https://github.com/bake-js/-o-id/issues) para mais informações.

## Suporte

Se precisar de suporte, sinta-se à vontade para entrar em contato por e-mail através de cleber.demgoncalves@gmail.com ou junte-se ao nosso canal no Slack.

## Licença

Este projeto é distribuído sob a licença [MIT](https://choosealicense.com/licenses/mit/), permitindo uso, modificação e distribuição aberta do código.
