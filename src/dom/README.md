[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# DOM Module of **-O-id**

The **DOM** module of **-O-id** provides a series of functionalities that facilitate the creation, styling, and lifecycle management of Web Components. Through decorators and specific functions, the module allows for the implementation of dynamic templates and efficient, reactive styling.

## Introduction

**-O-id** simplifies DOM manipulation in Web Components through decorators and utility functions that enable modular rendering of content and styling application. With support for template literals, dynamic styles, and lifecycle hooks, the **DOM** module offers a robust approach to modern interface development.

## Importing Decorators and Functions

To use the functionalities of the DOM module, import them as follows:

```javascript
import { define, paint, repaint, willPaint, didPaint, html, css } from '@bake-js/-o-id/dom';
```

## Main Features

### Template Rendering

The `html` function allows for creating HTML templates using template literals, making it easier to build dynamic and readable interfaces.

### Dynamic Styling

The `css` function enables the creation of dynamic stylesheets, supporting JavaScript variable interpolation directly in CSS. Ideal for Web Components using Shadow DOM, it ensures style isolation and reactivity.

### Lifecycle Hooks

The decorators `@paint`, `@repaint`, `@willPaint`, and `@didPaint` provide granular control over the rendering lifecycle of components:

- **`@paint`**: Binds the rendering of HTML and CSS to a component.
- **`@repaint`**: Allows re-rendering of a component, ideal for updating the interface in response to state changes.
- **`@willPaint`**: Executes logic before rendering, useful for preparing data or states.
- **`@didPaint`**: Allows the execution of logic after rendering, such as animations or interactions.

### Decorator Structure

Decorators can be used to simplify the rendering and styling logic of components. Here’s an example of how to use them:

```javascript
@define('my-component')
@paint(template, styles)
class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  @willPaint
  prepareData() {
    // Logic to prepare data before rendering
  }

  @didPaint
  initializeInteractions() {
    // Logic for interactions after rendering
  }
}
```

### Practical Example

**Example: Using `@paint`, `css`, and `html` to Create a Dynamic Component**

```javascript
import { define, paint, css, html } from '@bake-js/-o-id/dom';

function template() {
  return html`
    <div>My Dynamic Component</div>
  `;
}

function styles() {
  return css`
    :host {
      display: block;
      background-color: lightcoral;
      color: white;
    }
  `;
}

@define('dynamic-component')
@paint(template, styles)
class DynamicComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
}
```

## Why Use the DOM Module?

Using the DOM module in **-O-id** offers several advantages that make Web Component development more efficient and intuitive:

- **Ease of Use**: The `html` function simplifies template creation, while `css` allows for direct styling using template literals.
  
- **Reactivity**: The ability to interpolate variables in CSS and the support for lifecycle hooks provide a reactive and dynamic experience.

- **Modular Structure**: The use of decorators to manage the component's lifecycle keeps the code organized and easy to maintain.

- **Total Control**: Lifecycle hooks (`@willPaint`, `@didPaint`) offer precise control over rendering logic, allowing you to perform specific actions at certain points in the component's lifecycle.

## Usage Examples

### Example 1: Creating a Simple Component

```javascript
@define('simple-component')
@paint(template, styles)
class SimpleComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
}
```

### Example 2: Using `@willPaint` and `@didPaint`

```javascript
@define('interactive-component')
@paint(template, styles)
class InteractiveComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  @willPaint
  prepareData() {
    // Logic to prepare data
  }

  @didPaint
  initializeInteractions() {
    // Interaction setup
  }
}
```

## Conclusion

The DOM module of **-O-id** offers an efficient and clear way to manage the rendering, styling, and lifecycle of Web Components. With its modular and flexible approach, you can create reactive and easy-to-maintain interfaces, all while maintaining the simplicity and clarity that are hallmarks of **-O-id**. Try out the DOM module and discover how it can enhance your Web Component development!
