# -o-id

**-o-id** é uma biblioteca leve e poderosa para a criação de Web Components personalizados, projetada para combinar eficiência e simplicidade. Desenvolvida inteiramente em JavaScript, a biblioteca oferece uma performance otimizada, garantindo que seus componentes sejam rápidos e leves. Com uma arquitetura intuitiva e o uso de decorators, como `@paint` e `@repaint`, o desenvolvimento de componentes reativos e modulares torna-se simples e direto.

## Instalação

Instale a biblioteca com npm:

```bash
npm install @bake-js/element
```

> **Nota:** Também é compatível com `yarn` e `bun`.

## Exemplo de Uso

Aqui está um exemplo simples de como utilizar a biblioteca para criar um contador:

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

## Por que -o-id?

O nome "-o-id" foi cuidadosamente escolhido para refletir a essência e a filosofia por trás desta biblioteca de desenvolvimento de web components. Inspirado na teoria psicanalítica de Sigmund Freud, o "id" representa o segmento mais básico e primitivo da personalidade humana, que, junto com o ego e o superego, compõe a psique.

Assim como o "id" é a força motriz que impulsiona nossos instintos e desejos mais fundamentais, a biblioteca "-o-id" atua como a base essencial para a construção de interfaces web. Ela lida diretamente com os componentes mais básicos, mas cruciais, que constituem a experiência do usuário. O sufixo "-o" sugere uma transformação tangível — um objeto ou resultado concreto —, ressaltando a capacidade da biblioteca de converter ideias em componentes funcionais.

O "-o-id" não é apenas uma ferramenta; ele é a força instintiva e eficiente que impulsiona a criação de interfaces, permitindo que desenvolvedores transformem conceitos em realidade de forma ágil e intuitiva. Escolhemos este nome para destacar a importância de começar com uma base sólida e essencial, assim como o "id" é o ponto de partida na formação da personalidade.

Com "-o-id", você tem em mãos uma ferramenta fundamental, projetada para oferecer a máxima eficiência no desenvolvimento de web components, permitindo que você vá direto ao núcleo de suas necessidades de design e funcionalidade.

## Documentação

### Eventos de Ciclo de Vida

1. **[@define](https://github.com/bake-js/element/blob/main/src/define/README.md)** - Define um componente personalizado.
2. **[@adopted](https://github.com/bake-js/element/blob/main/src/adopted/README.md)** - Executado quando o componente é movido para um novo documento.
3. **[@attributeChanged](https://github.com/bake-js/element/blob/main/src/attributeChanged/README.md)** - Disparado quando atributos mapeados são alterados.
4. **[@connected](https://github.com/bake-js/element/blob/main/src/connected/README.md)** - Executado ao conectar o componente ao DOM.
5. **[@disconnected](https://github.com/bake-js/element/blob/main/src/disconnected/README.md)** - Executado ao desconectar o componente do DOM.
6. **[@formAssociated](https://github.com/bake-js/element/blob/main/src/dom/formAssociated/README.md)** - Manipula estados de formulário.
7. **[@formDisabled](https://github.com/bake-js/element/blob/main/src/dom/formDisabled/README.md)** - Garante que o componente responda ao estado de desabilitação de formulário.
8. **[@formReset](https://github.com/bake-js/element/blob/main/src/dom/formReset/README.md)** - Reage ao reset de um formulário.
9. **[@formStateRestore](https://github.com/bake-js/element/blob/main/src/dom/formStateRestore/README.md)** - Restaura o estado do formulário.

### Paint & Repaint

1. **[@willPaint](https://github.com/bake-js/element/blob/main/src/dom/willPaint/README.md)** - Executado antes da repintura, permitindo preparação.
2. **[@paint](https://github.com/bake-js/element/blob/main/src/dom/paint/README.md)** - Realiza a pintura do componente.
3. **[@didPaint](https://github.com/bake-js/element/blob/main/src/dom/didPaint/README.md)** - Executado após a pintura, permitindo ações subsequentes.
4. **[@repaint](https://github.com/bake-js/element/blob/main/src/dom/repaint/README.md)** - Disparado para iniciar o processo de repintura.

### Eventos & Filtros

1. **[@on](https://github.com/bake-js/element/blob/main/src/event/on/README.md)** - Associa um evento a um método específico.
2. **[formData](https://github.com/bake-js/element/blob/main/src/formData/stop/README.md)** - Manipula os dados do formulário.
3. **[stop](https://github.com/bake-js/element/blob/main/src/event/stop/README.md)** - Previne a propagação do evento.
4. **[prevent](https://github.com/bake-js/element/blob/main/src/event/prevent/README.md)** - Previne o comportamento padrão do evento.

### Barramento de Eventos

1. **[Echo](https://github.com/bake-js/element/blob/main/src/echo/README.md)** - Facilita a comunicação entre componentes por meio de um Event Bus.


## Contribua

Contribua para o desenvolvimento do **-o-id** reportando problemas, sugerindo novas funcionalidades ou enviando pull requests. Confira mais detalhes na [página de issues](https://github.com/bake-js/element/issues).

## Suporte

Para suporte, entre em contato pelo e-mail cleber.demgoncalves@gmail.com ou junte-se ao nosso canal no Slack.

## Licença

Distribuído sob a licença [MIT](https://choosealicense.com/licenses/mit/).
