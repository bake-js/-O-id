# -o-id

**-o-id** é uma biblioteca leve e poderosa para a criação de Web Components personalizados, desenvolvida para combinar eficiência e simplicidade. Totalmente escrita em JavaScript, a biblioteca é otimizada para desempenho, garantindo que seus componentes sejam rápidos, leves e fáceis de manter. Com uma arquitetura intuitiva e o uso de decorators, como `@paint` e `@repaint`, o desenvolvimento de componentes reativos e modulares torna-se simples e direto.

## Por que -o-id?

O nome "-o-id" foi cuidadosamente escolhido para refletir a essência e a filosofia por trás desta biblioteca. Inspirado na teoria psicanalítica de Sigmund Freud, o "id" representa o segmento mais básico e primitivo da personalidade humana, que, junto com o ego e o superego, compõe a psique.

Assim como o "id" é a força motriz que impulsiona nossos instintos e desejos mais fundamentais, a biblioteca "-o-id" atua como a base essencial para a construção de interfaces web. Ela lida diretamente com os componentes mais básicos, mas cruciais, que constituem a experiência do usuário. O sufixo "-o" sugere uma transformação tangível — um objeto ou resultado concreto —, ressaltando a capacidade da biblioteca de converter ideias em componentes funcionais.

Com "-o-id", você tem em mãos uma ferramenta instintiva e eficiente, projetada para transformar conceitos em realidade de forma ágil e intuitiva. Escolhemos este nome para destacar a importância de começar com uma base sólida e essencial, assim como o "id" é o ponto de partida na formação da personalidade.

## Instalação

Para instalar a biblioteca, utilize o npm:

```bash
npm install @bake-js/element
```

> **Nota:** Também é compatível com `yarn` e `bun`.

## Exemplo de Uso

Aqui está um exemplo simples de como utilizar a biblioteca para criar um contador interativo:

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

Este exemplo demonstra como o **-o-id** facilita a criação de componentes interativos, utilizando uma sintaxe clara e eficiente.

## Documentação

### Eventos de Ciclo de Vida

O **-o-id** oferece uma série de eventos de ciclo de vida que facilitam a manipulação e o controle dos componentes em diferentes estados:

1. **[@define](https://github.com/bake-js/element/blob/main/src/define/README.md)** - Define um componente personalizado.
2. **[@adopted](https://github.com/bake-js/element/blob/main/src/adopted/README.md)** - Executado quando o componente é movido para um novo documento.
3. **[@attributeChanged](https://github.com/bake-js/element/blob/main/src/attributeChanged/README.md)** - Disparado quando atributos mapeados são alterados.
4. **[@connected](https://github.com/bake-js/element/blob/main/src/connected/README.md)** - Executado ao conectar o componente ao DOM.
5. **[@disconnected](https://github.com/bake-js/element/blob/main/src/disconnected/README.md)** - Executado ao desconectar o componente do DOM.
6. **[@formAssociated](https://github.com/bake-js/element/blob/main/src/dom/formAssociated/README.md)** - Manipula estados de formulário associados ao componente.
7. **[@formDisabled](https://github.com/bake-js/element/blob/main/src/dom/formDisabled/README.md)** - Garante que o componente responda ao estado de desabilitação do formulário.
8. **[@formReset](https://github.com/bake-js/element/blob/main/src/dom/formReset/README.md)** - Reage ao reset de um formulário.
9. **[@formStateRestore](https://github.com/bake-js/element/blob/main/src/dom/formStateRestore/README.md)** - Restaura o estado do formulário.

### Paint & Repaint

Para controle visual e eficiência no processo de renderização, o **-o-id** disponibiliza decorators que permitem a manipulação de ciclos de pintura:

1. **[@willPaint](https://github.com/bake-js/element/blob/main/src/dom/willPaint/README.md)** - Executado antes da repintura, permitindo preparação do componente.
2. **[@paint](https://github.com/bake-js/element/blob/main/src/dom/paint/README.md)** - Realiza a pintura inicial do componente.
3. **[@didPaint](https://github.com/bake-js/element/blob/main/src/dom/didPaint/README.md)** - Executado após a pintura, permitindo ações subsequentes, como animações.
4. **[@repaint](https://github.com/bake-js/element/blob/main/src/dom/repaint/README.md)** - Disparado para iniciar o processo de repintura, mantendo a UI responsiva.

### Eventos & Filtros

A manipulação de eventos e a aplicação de filtros são facilitadas por uma série de decorators prontos para uso:

1. **[@on](https://github.com/bake-js/element/blob/main/src/event/on/README.md)** - Associa um evento a um método específico, simplificando o gerenciamento de eventos.
2. **[formData](https://github.com/bake-js/element/blob/main/src/formData/stop/README.md)** - Manipula os dados de formulário, integrando componentes com formulários HTML nativos.
3. **[stop](https://github.com/bake-js/element/blob/main/src/event/stop/README.md)** - Previne a propagação de eventos, útil para controle fino sobre a interação do usuário.
4. **[prevent](https://github.com/bake-js/element/blob/main/src/event/prevent/README.md)** - Previne o comportamento padrão de eventos, permitindo customizações de interação.

### Barramento de Eventos

Para comunicação eficiente entre componentes, o **-o-id** inclui um Event Bus:

1. **[Echo](https://github.com/bake-js/element/blob/main/src/echo/README.md)** - Facilita a comunicação entre componentes através de um barramento de eventos, permitindo que componentes compartilhem estados e eventos de forma coesa.

## Contribua

Estamos sempre buscando maneiras de melhorar o **-o-id**. Você pode ajudar reportando problemas, sugerindo novas funcionalidades ou enviando pull requests. Acesse a [página de issues](https://github.com/bake-js/element/issues) para mais informações.

## Suporte

Se precisar de suporte, sinta-se à vontade para entrar em contato por e-mail através de cleber.demgoncalves@gmail.com ou junte-se ao nosso canal no Slack.

## Licença

Este projeto é distribuído sob a licença [MIT](https://choosealicense.com/licenses/mit/), permitindo uso, modificação e distribuição aberta do código.
