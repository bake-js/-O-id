[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# Usage Guide: Decorator `paint`

The `paint` decorator is a powerful tool that allows for the declarative definition of HTML and styles for a Custom Element. It optimizes the rendering process and ensures that the component's lifecycle is respected.

### When to Use

- **Controlled Rendering**: Ideal for components that require specific and efficient rendering.
- **Encapsulated Styles**: Useful for applying encapsulated styles to a component using `adoptedStyleSheets`.
- **Performance**: To improve rendering performance when using `requestAnimationFrame`.

### How It Works

The `paint` decorator intercepts the lifecycle methods `paintCallback`, `willPaintCallback`, `didPaintCallback`, and `connectedCallback`, allowing for optimized and controlled rendering of the component.

### Structure

```javascript
/**
 * @param {Function} component - Function that returns the HTML to be rendered.
 * @param {Function} [style] - Optional function that returns the stylesheets to be applied.
 * @returns {Function} - The decorator to be applied to the component class.
 */
const paint =
  (component, style = () => []) =>
  (target) => {
    // Intercepts the paintCallback method to add rendering logic
    intercept(paintCallback)
      .in(target.prototype)
      .then(async function () {
        // Function to render the component after the next frame
        const render = (resolve) => {
          requestAnimationFrame(() => {
            (this.shadowRoot ?? document).adoptedStyleSheets = style(this);
            (this.shadowRoot ?? this).innerHTML = component(this);
            this.isPainted = true;
            resolve();
          });
        };

        // Executes lifecycle callbacks before and after rendering
        await this[willPaintCallback]?.();
        await new Promise(render);
        await this[didPaintCallback]?.();
      });

    // Intercepts the connectedCallback method to ensure paintCallback is called
    intercept(connectedCallback)
      .in(target.prototype) // Defines the target of the interceptor.
      .then(exec(paintCallback)); // Defines the method to be executed by the interceptor.
  };

export default paint;
```

### Parameters

1. **component** (required):
   - **Type:** `Function`
   - **Description:** A function that returns a string containing the HTML to be rendered. This function is called with the component instance as an argument.

2. **style** (optional):
   - **Type:** `Function`
   - **Description:** A function that returns an array of stylesheets (`CSSStyleSheet`) to be applied to the component. If not provided, an empty array will be used by default.

### Steps for Usage

1. **Import the `paint` decorator**:

   ```javascript
   import { paint } from '@bake-js/-o-id/dom';
   ```

2. **Apply the decorator to your Custom Element class**:

   - **Step 1:** Identify the function that generates the HTML for your component.
   - **Step 2:** Apply the `paint` decorator, passing the rendering function and, optionally, the style function.

3. **Implement the connection logic**:

   - The decorator handles the call to the `paintCallback` method within the component's lifecycle, ensuring that rendering occurs at the appropriate time.

### Practical Example

**Example 1: Simple Rendering**

Here’s an example of how to use `paint` to render a Custom Element with dynamic content:

```javascript
import { define } from '@bake-js/-o-id'
import { html, paint, css } from '@bake-js/-o-id/dom';

const component = (element) => {
  return html`
    <div>My component</div>
  `
};

const style = () => {
  return css`
    div {
      color: red;
    }
  `
};

@define('my-component')
@paint(component, style)
class MyComponent extends HTMLElement {
  connectedCallback() {
    console.log('MyComponent connected');
  }
}
```

**Explanation:**
- The rendering method generates a `div` containing the value of `someProperty`. The stylesheets are applied through `adoptedStyleSheets`.

**Example 2: Custom Style Behavior**

You can add custom styles to your component:

```javascript
import { define } from '@bake-js/-o-id'
import { html, paint, css } from '@bake-js/-o-id/dom';

const component = (element) => {
  return html`
    <div>${element.color}</div>
  `
};

const style = (element) => {
  return css`
    div {
      color: ${element.color};
    }
  `
};

@define('my-styled-component')
@paint(component, style)
class MyStyledComponent extends HTMLElement {
  connectedCallback() {
    console.log('MyStyledComponent connected');
    this.color = 'blue'; // Sets a property for the color
  }
}
```

**Explanation:**
- The `customStyle` returns a stylesheet that applies a dynamic color to the text of the `div` based on the component's `color` property.

### Benefits of the `paint` Decorator

1. **Centralization of Rendering Logic**: Allows rendering and style logic to be centralized, improving code readability and maintainability.
2. **Optimized Performance**: Uses `requestAnimationFrame` to ensure that rendering occurs at the ideal moment, enhancing visual performance.
3. **Encapsulated Styles**: Supports `adoptedStyleSheets`, allowing styles to be applied without polluting the global scope.

### Final Considerations

The `paint` decorator offers an effective and organized way to manage the rendering and styles of Custom Elements, ensuring that the rendering lifecycle is respected and optimized.
