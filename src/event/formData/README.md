[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# Usage Guide: `formData` Filter

The `formData` filter is a function that allows you to convert form data into a JavaScript object, making it easier to manipulate and access this data after form submission.

### When to Use

- **Form Data Manipulation**: Ideal for situations where you need to capture data submitted by a form and convert it into a more accessible format.
- **Submission Events**: Useful in submission event handlers, where access to key-value data is necessary.

### How It Works

The `formData` function uses the `FormData` API to collect form data and the `Object.fromEntries` function to convert key-value pairs into a JavaScript object. This approach provides an efficient way to transform form data into a simple object.

### Structure

```javascript
/**
 * @param {Event} event - The event containing the form data.
 * @returns {Object} An object containing the form data.
 */
const formData = (event) => {
  Object.fromEntries(new FormData(event.target, event.submitter));
};
```

### Parameters

1. **event** (required):
   - **Type:** `Event`
   - **Description:** The event that contains the form data, typically a submission event.

### Return

- **Type:** `Object`
- **Description:** An object containing the form data, where each key corresponds to a field name and each value corresponds to the field value.

### Steps for Usage

1. **Import the `formData` filter**:

   ```javascript
   import { formData } from '@bake-js/-o-id/event';
   ```

2. **Use the filter in a submission event handler**:

   - **Step 1:** Capture the form submission event.
   - **Step 2:** Call the `formData` function, passing the event as an argument.

# Practical Example: Using the `formData` Filter with the `on` Decorator

This example demonstrates how to use the `formData` filter in conjunction with the `on` decorator to handle the submission of a form in a custom component.

### Example Structure

```javascript
import { define } from '@bake-js/-o-id';
import on, { prevent, formData } from '@bake-js/-o-id/event';

@define('my-component')
class MyComponent extends HTMLElement {
  @on.submit('form', prevent, formData)
  handleSubmit(data) {
    console.log(data); // The form data is logged here
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
   - Imports `on`, `prevent`, and `formData` from the events module.

2. **Component Definition**:
   - The `my-component` is defined using the `@define` decorator.

3. **Form Submission Handling**:
   - The `handleSubmit` method is decorated with `@on.submit`, which listens for the form submission event.
   - The `prevent` filter is used to prevent the default submission behavior, and the `formData` filter converts the form data into an object.
   - The form data is passed as an argument to the `handleSubmit` method.

4. **Rendering the Form**:
   - In the `connectedCallback` method, the HTML for the form is inserted into the component.
   - The form contains an input field (`input`) for age and a submit button.

### Component Behavior

- When the "Save" button is clicked, the submission event is triggered.
- The default submission behavior is prevented, and the form data is collected and converted into a JavaScript object.
- The data object is then passed to the `handleSubmit` method, where it can be manipulated as needed (in this case, logged to the console).

### Example Usage

Upon filling in the input field and clicking the "Save" button, the form data will be displayed in the console in the format:

```javascript
{ age: '30' } // Example of collected data
```

### Benefits of Use

- **Simplicity**: Using `formData` makes it easy to convert form data into a usable format.
- **Integration with Decorators**: The combination of decorators allows for a declarative approach to event handling, resulting in cleaner and more organized code.
- **Preventing Default Behavior**: Using the `prevent` filter ensures that the form is not submitted in the traditional way, allowing you to control how the data is processed.

### Final Considerations

This example illustrates the effectiveness of using filters and decorators in web component development, providing an efficient and organized way to handle events and form data.
