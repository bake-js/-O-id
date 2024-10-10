[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# Usage Guide: `stop` Filter

The `stop` filter is a function that allows you to stop the propagation of an event in the DOM, preventing it from being transmitted to other elements that may be listening for the same event.

### When to Use

- **Event Interruption**: Ideal in situations where you want to prevent events from being processed in ancestor or sibling elements, such as avoiding unwanted side effects.
- **Complex Events**: Useful in event handlers that need to isolate the action of a specific event, ensuring that the logic does not affect other components.

### How It Works

The `stop` function uses the `stopPropagation` method of the `Event` object to prevent the event from continuing its propagation to other elements in the DOM. After stopping the propagation, the function returns the event itself, allowing you to perform other operations with it.

### Structure

```javascript
/**
 * @param {Event} event - The event to be filtered.
 * @returns {Event} The event itself, after stopping propagation.
 */
function stop(event) {
  event.stopPropagation();
  return event;
}
```

### Parameters

1. **event** (required):
   - **Type:** `Event`
   - **Description:** The event to be filtered, usually a user interaction event, such as a click or mouse movement.

### Return

- **Type:** `Event`
- **Description:** The event itself, after stopping propagation, allowing you to perform additional operations with the modified event.

### Steps for Usage

1. **Import the `stop` filter**:

   ```javascript
   import { stop } from '@bake-js/-o-id/event';
   ```

2. **Use the filter in an event handler**:

   - **Step 1:** Capture the event you want to manipulate.
   - **Step 2:** Call the `stop` function, passing the event as an argument.

# Practical Example: Using the `stop` Filter with the `on` Decorator

This example demonstrates how to use the `stop` filter in conjunction with the `on` decorator to stop the propagation of a click event on a button within a custom component.

### Example Structure

```javascript
import { define } from '@bake-js/-o-id';
import on, { stop } from '@bake-js/-o-id/event';

@define('my-component')
class MyComponent extends HTMLElement {
  @on.click('button', stop)
  handleClick(event) {
    console.log('Button clicked!'); // Message displayed in the console
    // The event propagation is stopped here
  }

  connectedCallback() {
    this.innerHTML = `
      <div>
        <button>Click Me!</button>
      </div>
    `;
  }
}
```

### Code Description

1. **Module Imports**:
   - The component imports the `define` decorator to register the Custom Element.
   - Imports `on` and `stop` from the event module.

2. **Component Definition**:
   - The `my-component` component is defined using the `@define` decorator.

3. **Handling Button Click**:
   - The `handleClick` method is decorated with `@on.click`, which listens for the click event on the button.
   - The `stop` filter is applied to stop the event propagation, ensuring it does not reach ancestor elements.

4. **Button Rendering**:
   - In the `connectedCallback` method, the HTML for the button is inserted into the component.

### Component Behavior

- When the "Click Me!" button is clicked, the message "Button clicked!" is displayed in the console.
- The propagation of the click event is stopped, preventing the event from being processed by other event handlers that may be associated with ancestor elements.

### Usage Example

When clicking the button, the message "Button clicked!" will be displayed in the console, and the propagation of the event will be stopped, preventing further actions on parent elements.

### Benefits of Use

- **Total Control**: Allows you to control event propagation, avoiding unwanted side effects in your application.
- **Integration with Decorators**: Using the `stop` filter in combination with decorators provides a declarative approach to event handling, resulting in cleaner and more organized code.

### Final Considerations

This example demonstrates the utility of the `stop` filter in web component development, providing an effective way to manage event propagation and ensuring that your application logic remains isolated and controlled.
