[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# -O-id: Your Web Components will never be the same! 🚀🧠

Hey there, front-end folks! 👋 Ready to give your Web Components that extra boost? It's time to meet **-O-id**, the library that will make your ideas take off faster than Doc Brown's DeLorean! ⚡️

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=bugs)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=coverage)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)

## Why "-O-id"? 🤔

Picture this: you're coding away when suddenly BAM! 💥 A brilliant idea pops up! That's where **-O-id** comes into play. Like the "id" in Freud's psychoanalysis, it's the creative and instinctive part of your dev mind. The "-O-" is the portal that transforms these crazy ideas into real, functional components. It's like having a Dr. Emmett Brown for your interfaces, but without needing 1.21 gigawatts! ⚡🔧

## Installation: Easier than finding a bug in production! 🐛

```bash
npm install @bake-js/-o-id
```

Works with `npm`, `yarn`, and `bun`. We don't judge your favorite package manager! 😉

## Show me the code! 👨‍💻

Want to see how easy it is to create a component with **-O-id** in practice? Check out this interactive counter that changes color:

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

Looks like magic, right? But it's just the power of **-O-id** in action! 🎩✨ Want to see this baby running? [Take a look at CodePen](https://codepen.io/demgoncalves/pen/dyxpdLw?editors=1010) and prepare to be amazed!

## How to use this thing in real life? 🤷‍♂️

1. Import everything correctly (don't forget the library, eh!).
2. Throw this beauty in your HTML:

```html
<o-id-counter></o-id-counter>
```

3. Done! Now just sit back and watch the magic happen. 🪄✨

## Demonstration: Seeing is believing! 👀

Think it's all talk? Then check out our [interactive demo](https://github.com/bake-js/-o-id-demo) and get ready to fall in love! 💘

## Got questions? We've got answers! 🦸‍♂️

Drop by our [online assistant](https://hf.co/chat/assistant/6703c9dfe3610a31b5ef3523). It's like having an **-O-id** sage in your pocket!

## Documentation: Because knowledge is power! 💪📚

Get ready for an intergalactic journey through the **-O-id** universe:

- [Lifecycle and Forms](https://github.com/bake-js/-o-id/blob/main/src/README.pt-BR.md): Understand your components' lifecycle. It's like the Circle of Life, but for code!
- [DOM](https://github.com/bake-js/-o-id/blob/main/src/dom/README.pt-BR.md): Learn to tame the DOM like a true lion tamer!
- [Event](https://github.com/bake-js/-o-id/blob/main/src/event/README.pt-BR.md): Because every superhero needs to react to world events, right?
- [Relay](https://github.com/bake-js/-o-id/blob/main/src/relay/README.pt-BR.md): Make your components chat like gossipy neighbors!
- [Echo](https://github.com/bake-js/-o-id/blob/main/src/echo/README.pt-BR.md): Our intergalactic communication system between components. Still in beta, but already causing a stir!

## Reference Index: So you don't get lost in the -O-id multiverse! 🌌

### Lifecycle
- [adopted](https://github.com/bake-js/-o-id/blob/main/src/adopted/README.md) - When your component is adopted by a new document. Aww! 🐣
- [attributeChanged](https://github.com/bake-js/-o-id/blob/main/src/attributeChanged/README.md) - For when your component decides to change its style!
- [connected](https://github.com/bake-js/-o-id/blob/main/src/connected/README.md) - The moment your component says "Hello, world!"
- [disconnected](https://github.com/bake-js/-o-id/blob/main/src/disconnected/README.md) - When it's time to say goodbye (for now)!
- [define](https://github.com/bake-js/-o-id/blob/main/src/define/README.md) - Give your component a name. Choose wisely!

### Form-Associated Lifecycle
- [formAssociated](https://github.com/bake-js/-o-id/blob/main/src/formAssociated/README.md) - Your component is now part of a form. What a responsibility!
- [formDisabled](https://github.com/bake-js/-o-id/blob/main/src/formDisabled/README.md) - When your component takes a break in the form.
- [formReset](https://github.com/bake-js/-o-id/blob/main/src/formReset/README.md) - Time to go back to the initial state. Real-life Ctrl+Z!
- [formStateRestore](https://github.com/bake-js/-o-id/blob/main/src/formStateRestore/README.md) - Restoring the state. It's like a time machine for your form!

### DOM
- [css](https://github.com/bake-js/-o-id/blob/main/src/css/README.pt-BR.md) - Give your component that style!
- [didPaint](https://github.com/bake-js/-o-id/blob/main/src/didPaint/README.pt-BR.md) - For when you want to do something after the component appeared.
- [html](https://github.com/bake-js/-o-id/blob/main/src/html/README.pt-BR.md) - Create HTML cleaner than your mom's room!
- [paint](https://github.com/bake-js/-o-id/blob/main/src/paint/README.pt-BR.md) - Time to bring your component to life!
- [repaint](https://github.com/bake-js/-o-id/blob/main/src/repaint/README.pt-BR.md) - When your component needs a visual change.
- [willPaint](https://github.com/bake-js/-o-id/blob/main/src/willPaint/README.pt-BR.md) - Prepare everything before the show starts!

### Events
- [event](https://github.com/bake-js/-o-id/blob/main/src/event/event/README.pt-BR.md) - Make your component all ears!
- [stop](https://github.com/bake-js/-o-id/blob/main/src/event/stop/README.pt-BR.md) - Say "Stop everything!" to events.
- [prevent](https://github.com/bake-js/-o-id/blob/main/src/event/prevent/README.pt-BR.md) - Prevent default things from happening.
- [formData](https://github.com/bake-js/-o-id/blob/main/src/event/formData/README.pt-BR.md) - Get all form data in the blink of an eye!
- [value](https://github.com/bake-js/-o-id/blob/main/src/event/value/README.pt-BR.md) - Get the value of inputs and selects easy peasy.

### Echo
- [echo](https://github.com/bake-js/-o-id/blob/main/src/echo/echo/README.pt-BR.md) - Make your components shout at each other (in a good way)!

## Want to contribute? Go for it! 🤝

Feel like getting your hands dirty? We love new heroes! Take a look at our [contribution guidelines](https://github.com/bake-js/-o-id/blob/main/CONTRIBUTING.pt-BR.md) and join us on this journey!

## License

This project is under the MIT License. This means you can use, abuse, and even juggle with the code (but please don't do the latter, it might hurt). 😉

---

Made with ❤️, many cups of ☕, and probably some pizzas 🍕 by the **-O-id** crew. Let's go, dev! 🚀
