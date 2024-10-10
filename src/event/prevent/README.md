[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# Usage Guide: `prevent` Filter

The `prevent` filter is a function that prevents the default behavior of an event, allowing you to have complete control over event handling in your code.

### When to Use

- **Preventing Default Behavior**: Ideal for situations where you need to avoid the default action associated with an event, such as form submission or button behavior.
- **Event Handling**: Useful in event handlers where the default action is not desired, and you want to implement custom behavior.

### How It Works

The `prevent` function calls the event's `preventDefault` method, preventing the default action associated with the event from being executed. After preventing the default behavior, the event itself is returned, allowing for further operations to be performed with the modified event.

### Structure

```javascript
/**
 * @param {Event} event - The event to be filtered.
 * @returns {Event} The event itself, after preventing the default behavior.
 */
function prevent(event) {
  event.preventDefault();
  return event
}
```

### Parameters

1. **event** (required):
   - **Type:** `Event`
   - **Description:** The event that will be filtered to prevent its default behavior.

### Return

- **Type:** `Event`
- **Description:** The event itself, allowing you to continue handling after preventing the default action.

### Steps for Usage

1. **Import the `prevent` filter**:

   ```javascript
   import { prevent } from '@bake-js/-o-id/event';
   ```

2. **Use the filter in an event handler**:

   - **Step 1:** Capture the event you want to modify.
   - **Step 2:** Call the `prevent` function, passing the event as an argument.

### Practical Example: Using the `prevent` Filter with the `on` Decorator

This example demonstrates how to use the `prevent` filter in conjunction with the `on` decorator to control form submission in a custom component.

### Example Structure

```javascript
import { define } from '@bake-js/-o-id';
import on, { prevent, formData } from '@bake-js/-o-id/event';

@define('my-component')
class MyComponent extends HTMLElement {
  @on.submit('form', prevent, formData)
  handleSubmit(data) {
    console.log(data); // The form data is displayed here
  }

  connectedCallback() {
    this.innerHTML = `
      <form>
        <input name="age" />
        <button>Save</button>
      </form>
    `;
  }
}
```

### Code Description

1. **Module Imports**:
   - The component imports the `define` decorator to register the Custom Element.
   - It imports `on`, `prevent`, and `formData` from the events module.

2. **Component Definition**:
   - The `my-component` component is defined using the `@define` decorator.

3. **Form Submission Handling**:
   - The `handleSubmit` method is decorated with `@on.submit`, which listens for the form submission event.
   - The `prevent` filter is used to avoid the default submission behavior, and the `formData` filter converts the form data into an object.
   - The form data is passed as an argument to the `handleSubmit` method.

4. **Rendering the Form**:
   - In the `connectedCallback` method, the HTML for the form is inserted into the component.
   - The form contains an input field (`input`) for age and a submit button.

### Component Behavior

- When the "Save" button is clicked, the submission event is triggered.
- The default submission behavior is prevented, allowing you to control how the data is processed.
- The form data object is then passed to the `handleSubmit` method, where it can be manipulated as needed (in this case, displayed in the console).

### Usage Example

By filling in the input field and clicking the "Save" button, the form data will be displayed in the console in the format:

```javascript
{ age: '30' } // Example of collected data
```

### Benefits of Using

- **Total Control**: The `prevent` function provides complete control over event behavior, allowing you to avoid unwanted actions.
- **Integration with Decorators**: The combination of decorators allows for a declarative approach to event handling, resulting in cleaner and more organized code.

### Final Considerations

This example illustrates the effectiveness of using filters and decorators in web component development, providing an efficient and organized way to handle events and avoid unwanted default behaviors.
