[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# Usage Guide: `event` Decorator

The `event` decorator allows developers to declare event listeners in a simplified manner and automatically manage the connection and disconnection of these events based on the lifecycle of the Custom Element. The decorator can be used for common events such as `click`, `keydown`, `mouseover`, among others, and includes support for filters that modify the behavior of the event before the decorated method is executed.

### When to Use

- **Declarative Event Management**: Useful for adding listeners to DOM elements concisely, integrating them into the component's lifecycle.
- **Use of Filters**: Allows applying filters such as `preventDefault`, `stopPropagation`, or any other modifier before executing the logic associated with the event.

### Structure

```javascript
/**
 * @param {string} type - The type of event to listen for (e.g., 'click').
 * @param {string} query - CSS selector to filter the target of the event.
 * @param {...Function} filters - Filter functions applied to the event before calling the decorated method.
 * @returns {Function} - The decorator to add logic to the decorated method.
 */
const attachEventListener = (type, query, ...filters) => (target, propertyKey) => {
  intercept(connectedCallback)
    .in(target)
    .then(function () {
      const controller = (this[abortController] ??= new AbortController());
      const options = { signal: controller.signal };

      const listener = (event) => {
        if (event.target.matches(query)) {
          this[propertyKey](
            filters.reduce((target, filter) => filter(target), event),
          );
        }
      };

      this.addEventListener(type, listener, options);
      this.shadowRoot?.addEventListener(type, listener, options);
    });

  intercept(disconnectedCallback)
    .in(target)
    .then(function () {
      this[abortController].abort();
    });
};
```

### Parameters

1. **type**:
   - **Type:** `string`
   - **Description:** The type of event to monitor, such as `'click'`, `'mouseover'`, or `'keydown'`.

2. **query**:
   - **Type:** `string`
   - **Description:** A CSS selector that filters the target of the event. Only events matching the selector will be processed.

3. **filters**:
   - **Type:** `Function[]`
   - **Description:** Optional filter functions that are applied to the event before calling the decorated method. These functions can modify the event or prevent its propagation.

4. **target**:
   - **Type:** `Function`
   - **Description:** The class containing the decorated method, usually a Custom Element.

5. **propertyKey**:
   - **Type:** `string`
   - **Description:** The name of the method that will be called when the event occurs.

### Functionality

1. **Intercepts Lifecycle**: The event listener is added when the Custom Element is connected to the DOM (via `connectedCallback`) and removed when the element is disconnected (via `disconnectedCallback`), using an `AbortController` to facilitate listener removal.
2. **Application of Filters**: Filter functions, such as `preventDefault()` and `stopPropagation()`, can be applied to the event before it reaches the decorated method. This allows for modifying the event or blocking its propagation declaratively.

### Practical Example

**Example: Click Event Listener with Filters**

```javascript
import { define } from '@bake-js/-o-id'
import on, { prevent, stop } from '@bake-js/-o-id/event';

@define('my-component')
class MyComponent extends HTMLElement {
  @on.click('button', prevent, stop)
  handleClick(event) {
    console.log('Button clicked');
  }

  connectedCallback() {
    this.innerHTML = `<button>Click Here</button>`;
  }
}
```

**Explanation**:
- The decorator `@on.click('button', prevent, stop)` defines a click listener that will be triggered only when the event occurs on a button inside the component.
- Before the `handleClick` method is called, the filters `prevent` (which calls `preventDefault()`) and `stop` (which calls `stopPropagation()`) are applied to the event.
- The listener is automatically added when the component is inserted into the DOM and removed when it is disconnected, preventing memory leaks.

### Available Filters

1. **`prevent`**: Prevents the default action of the event by calling `event.preventDefault()`.
2. **`stop`**: Stops the propagation of the event by calling `event.stopPropagation()`.

### Proxy for Creating Decorators

The `event` decorator uses a Proxy to dynamically generate decorators based on the event type:

```javascript
// Proxy to dynamically generate decorators based on event type
const event = new Proxy(
  {},
  {
    get: (_, type) => (query, ...filters) => attachEventListener(type, query, ...filters),
  },
);
```

This allows you to use the syntax `@on.eventType` to declaratively declare event listeners:

- `@on.click('button')`: Listens for clicks on a button.
- `@on.keydown('input')`: Listens for key press events on an input field.

### Benefits of the `event` Decorator

1. **Centralization of Logic**: The code for adding and removing event listeners is encapsulated in the decorator, simplifying the logic of Custom Elements.
2. **Powerful Filters**: The addition of filters allows for modifying the event behavior without needing to duplicate code in different parts of the component.
3. **Automatic Listener Management**: Listeners are automatically cleaned up when the component is disconnected, preventing memory leaks and ensuring efficient event management.
