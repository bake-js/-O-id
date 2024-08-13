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

## Documentação

### Eventos de Ciclo de Vida

O **-O-id** oferece uma série de eventos de ciclo de vida que facilitam o controle dos componentes em diferentes estados:

1. **[@define](https://github.com/bake-js/-o-id/blob/main/src/define/README.md)** - Define um componente personalizado.
2. **[@adopted](https://github.com/bake-js/-o-id/blob/main/src/adopted/README.md)** - Executado quando o componente é movido para um novo documento.
3. **[@attributeChanged](https://github.com/bake-js/-o-id/blob/main/src/attributeChanged/README.md)** - Disparado quando atributos mapeados são alterados.
4. **[@connected](https://github.com/bake-js/-o-id/blob/main/src/connected/README.md)** - Executado ao conectar o componente ao DOM.
5. **[@disconnected](https://github.com/bake-js/-o-id/blob/main/src/disconnected/README.md)** - Executado ao desconectar o componente do DOM.
6. **[@formAssociated](https://github.com/bake-js/-o-id/blob/main/src/dom/formAssociated/README.md)** - Manipula estados de formulário associados ao componente.
7. **[@formDisabled](https://github.com/bake-js/-o-id/blob/main/src/dom/formDisabled/README.md)** - Garante que o componente responda ao estado de desabilitação do formulário.
8. **[@formReset](https://github.com/bake-js/-o-id/blob/main/src/dom/formReset/README.md)** - Reage ao reset de um formulário.
9. **[@formStateRestore](https://github.com/bake-js/-o-id/blob/main/src/dom/formStateRestore/README.md)** - Restaura o estado do formulário.

### Paint & Repaint

Para controle visual e eficiência no processo de renderização, o **-O-id** disponibiliza decorators que permitem a manipulação de ciclos de pintura:

1. **[@willPaint](https://github.com/bake-js/-o-id/blob/main/src/dom/willPaint/README.md)** - Executado antes da repintura, permitindo a preparação do componente.
2. **[@paint](https://github.com/bake-js/-o-id/blob/main/src/dom/paint/README.md)** - Realiza a pintura inicial do componente.
3. **[@didPaint](https://github.com/bake-js/-o-id/blob/main/src/dom/didPaint/README.md)** - Executado após a pintura, permitindo ações subsequentes, como animações.
4. **[@repaint](https://github.com/bake-js/-o-id/blob/main/src/dom/repaint/README.md)** - Disparado para iniciar o processo de repintura, mantendo a UI responsiva.

### Eventos & Filtros

A manipulação de eventos e a aplicação de filtros são facilitadas por uma série de decorators prontos para uso:

1. **[@on](https://github.com/bake-js/-o-id/blob/main/src/event/on/README.md)** - Associa um evento a um método específico, simplificando o gerenciamento de eventos.
2. **[formData](https://github.com/bake-js/-o-id/blob/main/src/formData/stop/README.md)** - Manipula os dados de formulário, integrando componentes com formulários HTML nativos.
3. **[stop](https://github.com/bake-js/-o-id/blob/main/src/event/stop/README.md)** - Previne a propagação de eventos, útil para controle fino sobre a interação do usuário.
4. **[prevent](https://github.com/bake-js/-o-id/blob/main/src/event/prevent/README.md)** - Previne o comportamento padrão de eventos, permitindo customizações de interação.

### Barramento de Eventos

Para comunicação eficiente entre componentes, o **-O-id** inclui um Event Bus:

1. **[Echo](https://github.com/bake-js/-o-id/blob/main/src/echo/README.md)** - Facilita a comunicação entre componentes através de um barramento de eventos, permitindo que compartilhem estados e eventos de forma coesa.

## Contribua

Estamos sempre buscando maneiras de melhorar o **-O-id**. Você pode ajudar reportando problemas, sugerindo novas funcionalidades ou enviando pull requests. Acesse a [página de issues](https://github.com/bake-js/-o-id/issues) para mais informações.

## Suporte

Se precisar de suporte, sinta-se à vontade para entrar em contato por e-mail através de cleber.demgoncalves@gmail.com ou junte-se ao nosso canal no Slack.

## Licença

Este projeto é distribuído sob a licença [MIT](https://choosealicense.com/licenses/mit/), permitindo uso, modificação e distribuição aberta do código.
