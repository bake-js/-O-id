[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# Usage Guide: `didPaint` Decorator

The `didPaint` decorator provides an effective way to extend the logic of a Custom Element right after its rendering. It allows developers to add custom behaviors without directly modifying the component's rendering flow.

### When to Use

- **Post-Rendering Customization**: Ideal for situations where it's necessary to execute specific logic immediately after the component's rendering.
- **State Management**: Useful for updating the state or triggering events after the rendering process is complete.

### Structure

```javascript
/**
 * @param {Object} target - The target of the decorator, usually the class of the Custom Element.
 * @param {string} propertyKey - The name of the decorated method.
 * @returns {void} A decorator that intercepts the call to `didPaintCallback`.
 */
const didPaint = (target, propertyKey) => {
  // Creates an instance of the interceptor for the `didPaintCallback` method.
  const interceptor = intercept(didPaintCallback);

  // Adds the decorated method to the list of callbacks to be executed.
  return interceptor
    .in(target) // Sets the target of the interceptor.
    .then(exec(propertyKey)); // Sets the method to be executed by the interceptor.
};

export default didPaint;
```

### Parameters

1. **target**:
   - **Type:** `Object`
   - **Description:** The target of the decorator, which is generally the class of the Custom Element that contains the method to be decorated.

2. **propertyKey**:
   - **Type:** `string`
   - **Description:** The name of the method that will be intercepted and decorated. This method should contain the logic that will be executed after the component's rendering.

### Steps for Usage

1. **Import the `didPaint` decorator**:

   ```javascript
   import { didPaint } from '@bake-js/-o-id/dom';
   ```

2. **Apply the decorator to the desired method**:

   - **Step 1:** Create a method in your Custom Element class that contains the logic to be executed after rendering.
   - **Step 2:** Decorate the method with `@didPaint`.

### Practical Example

**Example: Post-Rendering Logic**

Here’s an example of how to use `didPaint` to add logic to the component's lifecycle after its rendering:

```javascript
import { define } from '@bake-js/-o-id'
import { didPaint } from '@bake-js/-o-id/dom';

@define('my-component')
class MyComponent extends HTMLElement {
  @didPaint
  handleDidPaint() {
    console.log('The component has been painted!');
    // Add additional logic here, such as state updates or interactions.
  }

  connectedCallback() {
    // Simulating rendering
    this.innerHTML = `<p>My component is rendered!</p>`;
  }
}
```

**Explanation:**
- The `handleDidPaint` method is automatically called after the component's rendering, allowing post-rendering logic to be centralized and kept separate from the rest of the component's code.

### Benefits of the `didPaint` Decorator

1. **Extensibility**: Facilitates the addition of additional logic to the component's lifecycle without needing to change the existing structure.
2. **Code Organization**: Keeps the component's code clean and organized by separating rendering logic from post-rendering logic.
3. **Easier Maintenance**: Allows changes to the post-rendering logic to be made in a specific location, making long-term code maintenance easier.

### Final Considerations

The `didPaint` decorator is a valuable tool for developers who want to add custom logic to the lifecycle of their Custom Elements, ensuring that the application remains modular and easy to maintain.
