[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)  
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=bugs)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)  
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)  
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=coverage)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)  
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=bake-js_-o-id&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=bake-js_-o-id)

# -O-id

**-O-id** is a lightweight and efficient library for creating custom Web Components, focusing on simplicity and performance. Built entirely in JavaScript, **-O-id** ensures that your components are fast, lightweight, and easy to maintain. With an intuitive architecture and decorators like `@paint` and `@repaint`, developing reactive and modular components becomes simple and straightforward.

## Why -O-id?

The name **-O-id** is inspired by Sigmund Freud's psychoanalytic theory. The "**id**" represents the most primitive part of the human personality, driving our fundamental instincts. Similarly, the **-O-id** library serves as an essential foundation for building web interfaces. The suffix "**-O**" symbolizes the transformation of ideas into tangible results—functional and efficient components.

**-O-id** is not just a tool but a force driving interface creation, allowing developers to transform concepts into reality in an agile and intuitive way. This name highlights the importance of starting with a solid foundation, just as the "**id**" is the starting point in personality formation.

## Installation

To install the library, use npm:

```bash
npm install @bake-js/-o-id
```

> **Note:** The library is also compatible with `yarn` and `bun`.

## Usage Example

Below is a simple example of how to use the library to create an interactive counter:

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

You can view the interactive example on [CodePen](https://codepen.io/demgoncalves/pen/dyxpdLw?editors=1010).

### Component Explanation

The example illustrates the creation of a custom element component named `o-id-counter`, representing a counter that can be incremented via a button. Below are the key features of the component:

- **Element Definition:**
  - The element is defined as `o-id-counter` using the `@define` decorator, and it uses Shadow DOM to encapsulate its styles and structure.

- **Internal State:**
  - The counter’s state is stored in a private property `#number`, starting at zero. The `get number()` method returns the current value, while the `set number(value)` method allows updates.

- **Component Rendering:**
  - The `component(self)` function generates the HTML structure for the button, and the `style()` function defines the applied CSS styles.

- **Interactivity:**
  - The `increment()` method is decorated with `@on.click('button')`, allowing the counter to be incremented with each button click. This method updates the state and re-renders the component automatically.

### How to Use

To use this component in your application:

1. Ensure the code is properly imported and defined.
2. Add the `<o-id-counter></o-id-counter>` element anywhere in your HTML.
3. The component will be ready to use, incrementing the value with each button click.

Example of usage in HTML:

```html
<o-id-counter></o-id-counter>
```

> This example demonstrates how **-O-id** simplifies the creation of interactive components with a clear and efficient syntax.

## Demo

To see the **-O-id** library in action, check out our [interactive demo](https://github.com/bake-js/-o-id-demo).

## Assistant

If you need help or guidance on how to use the **-O-id** library, feel free to access our [online assistant](https://hf.co/chat/assistant/6703c9dfe3610a31b5ef3523), which provides additional support and interactive documentation.

## Documentation

Below you will find detailed documentation for the main modules of **-O-id**. Each link leads to the corresponding page where you can learn more about how to use and implement the features offered.

- **[Lifecycle and Forms](https://github.com/bake-js/-o-id/blob/main/src/README.md)**: A complete guide to understanding and applying the main modules and decorators of **-O-id**.
- **[DOM](https://github.com/bake-js/-o-id/blob/main/src/dom/README.md)**: Documentation on DOM manipulation and component rendering.
- **[Event](https://github.com/bake-js/-o-id/blob/main/src/event/README.md)**: A guide for handling and responding to events within Web Components.
- **[Relay](https://github.com/bake-js/-o-id/blob/main/src/relay/README.md)**: Facilitates listening to events emitted by a Custom Element's parentElement.
- **[Echo](https://github.com/bake-js/-o-id/blob/main/src/echo/README.md)**: Documentation on the Echo event bus for communication between components. **Note:** This module is in beta and may be subject to changes.

## Reference Index

### Lifecycle
Documentation on the callbacks and methods related to the lifecycle of Custom Elements. These methods are essential for managing the state and changes of elements throughout their existence in the DOM.
- [adopted](https://github.com/bake-js/-o-id/blob/main/src/adopted/README.md) - Callback invoked when a Custom Element is adopted into a new document.
- [attributeChanged](https://github.com/bake-js/-o-id/blob/main/src/attributeChanged/README.md) - Callback invoked when an attribute of a Custom Element is changed.
- [connected](https://github.com/bake-js/-o-id/blob/main/src/connected/README.md) - Callback invoked when a Custom Element is inserted into the DOM.
- [disconnected](https://github.com/bake-js/-o-id/blob/main/src/disconnected/README.md) - Callback invoked when a Custom Element is removed from the DOM.
- [define](https://github.com/bake-js/-o-id/blob/main/src/define/README.md) - Function to define and register a new Custom Element.

### Lifecycle Associated with Forms
Information about the specific callbacks for Custom Elements interacting with forms. These callbacks are used to manage state and actions related to forms.
- [formAssociated](https://github.com/bake-js/-o-id/blob/main/src/formAssociated/README.md) - Callback invoked when an element is associated with a form.
- [formDisabled](https://github.com/bake-js/-o-id/blob/main/src/formDisabled/README.md) - Callback invoked when an element is disabled within a form.
- [formReset](https://github.com/bake-js/-o-id/blob/main/src/formReset/README.md) - Callback invoked when an associated form is reset.
- [formStateRestore](https://github.com/bake-js/-o-id/blob/main/src/formStateRestore/README.md) - Callback invoked to restore the form state.

### DOM
Documentation on how to manipulate the DOM and create custom elements.
- [css](https://github.com/bake-js/-o-id/blob/main/src/css/README.md) - Helper to create custom CSS styles for Custom Elements.
- [didPaint](https://github.com/bake-js/-o-id/blob/main/src/didPaint/README.md) - Decorator that allows logic to be executed after the component is rendered.
- [html](https://github.com/bake-js/-o-id/blob

/main/src/html/README.md) - Helper to create HTML templates for Custom Elements.
- [paint](https://github.com/bake-js/-o-id/blob/main/src/paint/README.md) - Decorator for defining how the component is rendered and styled.
- [repaint](https://github.com/bake-js/-o-id/blob/main/src/repaint/README.md) - Allows the repainting logic to be executed when a component state changes.
- [willPaint](https://github.com/bake-js/-o-id/blob/main/src/willPaint/README.md) - Runs logic just before the component is rendered.

### Event
Documentation on how to work with events inside Custom Elements.
- [on](https://github.com/bake-js/-o-id/blob/main/src/on/README.md) - Allows listening for specific events triggered by Custom Elements.

### Echo
Documentation for the **Echo** event bus, which allows components to communicate with each other through events.
- [Echo](https://github.com/bake-js/-o-id/blob/main/src/echo/README.md) - Facilitates communication between Custom Elements using an event bus. **Note:** This module is in beta.

## Contributing

Contributions are always welcome! Feel free to open issues or submit pull requests. To get started, check out the [contribution guidelines](https://github.com/bake-js/-o-id/blob/main/CONTRIBUTING.md).

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/bake-js/-o-id/blob/main/LICENSE) file for more details.
