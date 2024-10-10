[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# Usage Guide: `value` Filter

The `value` filter is a function that allows you to extract the value from an input field associated with the event. This filter is especially useful in event handlers that deal with form fields and input elements.

### When to Use

- **Getting Input Values**: Ideal for situations where you need to capture the value entered by the user in input fields, such as text boxes, text areas, or selectors.
- **Form Handling**: Useful in form manipulations, allowing you to quickly obtain the data entered by users.

### How It Works

The `value` function accesses the input field that triggered the event and returns its value. If the event or the input field is not present, the function returns `undefined`, avoiding errors in unexpected situations.

### Structure

```javascript
/**
 * @param {Event} event - The event that contains the input field.
 * @returns {string|undefined} The value of the input field, or `undefined` if the field is not present.
 */
function value(event) {
  return event.target.value;
}
```

### Parameters

1. **event** (required):
   - **Type:** `Event`
   - **Description:** The event that contains the input field, typically a user interaction event, such as `input` or `change`.

### Return

- **Type:** `string | undefined`
- **Description:** The value of the input field if present. Returns `undefined` if the field is not accessible, ensuring that the code does not fail in situations where the event does not contain an input field.

### Steps for Use

1. **Import the `value` filter**:

   ```javascript
   import { value } from '@bake-js/-o-id/event';
   ```

2. **Use the filter in an event handler**:

   - **Step 1:** Capture the event you want to handle.
   - **Step 2:** Call the `value` function, passing the event as an argument.

### Practical Example: Using the `value` Filter in a Component

This example demonstrates how to use the `value` filter to capture the value from an input field within a custom component.

### Example Structure

```javascript
import { define } from '@bake-js/-o-id';
import on, { value } from '@bake-js/-o-id/event';

@define('my-input-component')
class MyInputComponent extends HTMLElement {
  @on.input('input', value)
  handleInput(event) {
    const inputValue = value(event);
    console.log('Input value:', inputValue);
    // Other operations with inputValue can be performed here
  }

  connectedCallback() {
    this.innerHTML = `
      <div>
        <input type="text" placeholder="Type something...">
      </div>
    `;
  }
}
```

### Code Description

1. **Module Imports**:
   - The component imports the `define` decorator to register the Custom Element.
   - It imports `on` and `value` from the events module.

2. **Component Definition**:
   - The `my-input-component` is defined using the `@define` decorator.

3. **Input Handling**:
   - The `handleInput` method is decorated with `@on.input`, which listens for input events on the text field.
   - The value of the input field is obtained using the `value` filter, which is then displayed in the console.

4. **Rendering the Input Field**:
   - In the `connectedCallback` method, the HTML for the input field is inserted into the component.

### Component Behavior

- When the user types something in the input field, the value is captured and displayed in the console in real-time.
- This allows you to perform other operations with the value, such as validation or state updates.

### Usage Example

When typing "Hello" in the input field, the message "Input value: Hello" will be displayed in the console.

### Benefits of Use

- **Ease of Capture**: Simplifies the process of capturing input values, allowing you to write cleaner and more understandable code.
- **Integration with Decorators**: Using the `value` filter in conjunction with decorators allows for a declarative approach to event handling, resulting in more organized code.

### Final Considerations

This example demonstrates the utility of the `value` filter in web component development, providing an effective way to capture and manipulate user input values, essential for rich and dynamic interactions.
