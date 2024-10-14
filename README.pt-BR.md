[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# -O-id: Seus Web Components nunca mais serão os mesmos! 🚀🧠

E aí, galera do front-end! 👋 Tá preparado pra dar aquele boost nos seus Web Components? Chegou a hora de conhecer o **-O-id**, a biblioteca que vai fazer suas ideias decolarem mais rápido que o DeLorean do Doc Brown! ⚡️

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=bugs)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=coverage)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)

## Por que "-O-id"? 🤔

Imagina só: você tá ali, codando tranquilo, quando BAM! 💥 Uma ideia genial surge! É aí que o **-O-id** entra em cena. Como o "id" da psicanálise de Freud, é a parte criativa e instintiva da sua mente de dev. O "-O-" é o portal que transforma essas ideias malucas em componentes reais e funcionais. É como ter um Dr. Emmett Brown pra suas interfaces, mas sem precisar de 1.21 gigawatts! ⚡🔧

## Instalação: Mais fácil que achar um bug em produção! 🐛

```bash
npm install @bake-js/-o-id
```

Funciona com `npm`, `yarn` e `bun`. A gente não julga seu package manager favorito! 😉

## Show me the code! 👨‍💻

Quer ver na prática como é moleza criar um componente com **-O-id**? Confere só esse contador interativo que muda de cor:

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

Parece mágica, né? Mas é só o poder do **-O-id** em ação! 🎩✨ Quer ver esse bebê rodando? [Dá uma olhada no CodePen](https://codepen.io/demgoncalves/pen/dyxpdLw?editors=1010) e prepare-se pra ficar boquiaberto!

## Como usar esse negócio na vida real? 🤷‍♂️

1. Importa tudo certinho (não esquece da biblioteca, hein!).
2. Joga essa belezinha no seu HTML:

```html
<o-id-counter></o-id-counter>
```

3. Pronto! Agora é só sentar e ver a mágica acontecer. 🪄✨

## Demonstração: Ver pra crer! 👀

Tá achando que é papo furado? Então confere nossa [demo interativa](https://github.com/bake-js/-o-id-demo) e prepara-se pra se apaixonar! 💘

## Ficou com dúvida? A gente resolve! 🦸‍♂️

Dá uma passadinha no nosso [assistente online](https://hf.co/chat/assistant/6703c9dfe3610a31b5ef3523). É como ter um sábio do **-O-id** no seu bolso!

## Documentação: Porque conhecimento é poder! 💪📚

Prepare-se pra uma viagem intergaláctica pelo universo do **-O-id**:

- [Ciclo de Vida e Formulários](https://github.com/bake-js/-o-id/blob/main/src/README.pt-BR.md): Entenda o ciclo de vida dos seus componentes. É tipo o Círculo da Vida, mas pra código!
- [DOM](https://github.com/bake-js/-o-id/blob/main/src/dom/README.pt-BR.md): Aprenda a domar o DOM como um verdadeiro domador de leões!
- [Event](https://github.com/bake-js/-o-id/blob/main/src/event/README.pt-BR.md): Porque todo super-herói precisa reagir aos eventos do mundo, né?
- [Relay](https://github.com/bake-js/-o-id/blob/main/src/relay/README.pt-BR.md): Faça seus componentes conversarem como se fossem vizinhos fofoqueiros!
- [Echo](https://github.com/bake-js/-o-id/blob/main/src/echo/README.pt-BR.md): Nosso sistema de comunicação intergaláctico entre componentes. Ainda em beta, mas já causando alvoroço!

## Índice de Referência: Pra você não se perder no multiverso do -O-id! 🌌

### Ciclo de Vida
- [adopted](https://github.com/bake-js/-o-id/blob/main/src/adopted/README.md) - Quando seu componente é adotado por um novo documento. Aww! 🐣
- [attributeChanged](https://github.com/bake-js/-o-id/blob/main/src/attributeChanged/README.md) - Pra quando seu componente decide mudar de estilo!
- [connected](https://github.com/bake-js/-o-id/blob/main/src/connected/README.md) - O momento em que seu componente diz "Olá, mundo!"
- [disconnected](https://github.com/bake-js/-o-id/blob/main/src/disconnected/README.md) - Quando é hora de dizer tchau (por enquanto)!
- [define](https://github.com/bake-js/-o-id/blob/main/src/define/README.md) - Dê um nome pro seu componente. Escolha com carinho!

### Ciclo de Vida Associados a Formulários
- [formAssociated](https://github.com/bake-js/-o-id/blob/main/src/formAssociated/README.md) - Seu componente agora faz parte de um formulário. Que responsabilidade!
- [formDisabled](https://github.com/bake-js/-o-id/blob/main/src/formDisabled/README.md) - Quando seu componente tira uma folga no formulário.
- [formReset](https://github.com/bake-js/-o-id/blob/main/src/formReset/README.md) - Hora de voltar pro estado inicial. Ctrl+Z da vida real!
- [formStateRestore](https://github.com/bake-js/-o-id/blob/main/src/formStateRestore/README.md) - Restaurando o estado. É tipo uma máquina do tempo pro seu formulário!

### DOM
- [css](https://github.com/bake-js/-o-id/blob/main/src/css/README.pt-BR.md) - Dê aquele style no seu componente!
- [didPaint](https://github.com/bake-js/-o-id/blob/main/src/didPaint/README.pt-BR.md) - Pra quando você quer fazer algo depois que o componente apareceu.
- [html](https://github.com/bake-js/-o-id/blob/main/src/html/README.pt-BR.md) - Crie HTML mais limpo que o quarto da sua mãe!
- [paint](https://github.com/bake-js/-o-id/blob/main/src/paint/README.pt-BR.md) - Hora de dar vida ao seu componente!
- [repaint](https://github.com/bake-js/-o-id/blob/main/src/repaint/README.pt-BR.md) - Quando seu componente precisa de uma mudança de visual.
- [willPaint](https://github.com/bake-js/-o-id/blob/main/src/willPaint/README.pt-BR.md) - Prepara tudo antes do show começar!

### Eventos
- [event](https://github.com/bake-js/-o-id/blob/main/src/event/event/README.pt-BR.md) - Faça seu componente ficar de ouvidos bem abertos!
- [stop](https://github.com/bake-js/-o-id/blob/main/src/event/stop/README.pt-BR.md) - Diga "Para tudo!" pros eventos.
- [prevent](https://github.com/bake-js/-o-id/blob/main/src/event/prevent/README.pt-BR.md) - Impeça que coisas default aconteçam.
- [formData](https://github.com/bake-js/-o-id/blob/main/src/event/formData/README.pt-BR.md) - Pegue todos os dados do formulário num piscar de olhos!
- [value](https://github.com/bake-js/-o-id/blob/main/src/event/value/README.pt-BR.md) - Pegue o valor de inputs e selects facinho, facinho.

### Echo
- [echo](https://github.com/bake-js/-o-id/blob/main/src/echo/echo/README.pt-BR.md) - Faça seus componentes gritarem uns com os outros (de um jeito bom)!

## Quer contribuir? Manda ver! 🤝

Tá afim de colocar a mão na massa? A gente adora novos heróis! Dá uma olhada nas nossas [diretrizes de contribuição](https://github.com/bake-js/-o-id/blob/main/CONTRIBUTING.pt-BR.md) e vem com a gente nessa jornada!

## Licença

Este projeto tá sob a Licença MIT. Isso significa que você pode usar, abusar, e até fazer malabarismo com o código (mas, por favor, não faça isso último, pode machucar). 😉

---

Feito com ❤️, muitas xícaras de ☕, e provavelmente algumas pizzas 🍕 pela galera do **-O-id**. Vamos nessa, dev! 🚀
