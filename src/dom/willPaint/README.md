[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# Usage Guide: `willPaint` Decorator

The `willPaint` decorator allows developers to add custom behaviors to the lifecycle of a Custom Element, ensuring that the necessary logic is executed before the component is rendered. This is especially useful for preparing the component's state or adjusting properties before painting.

### When to Use

- **Preparation Before Rendering**: Ideal for scenarios where adjustments need to be made to the component's state or properties before it is displayed.
- **Condition Validation**: Useful for validating whether all necessary conditions are met before rendering.

### Structure

```javascript
/**
 * @param {Function} target - The target of the decorator, usually the class of the Custom Element.
 * @param {string} propertyKey - The name of the decorated method.
 * @returns {Function} - The decorator that intercepts the call to `willPaintCallback`.
 */
const willPaint = (target, propertyKey) => {
  // Creates an instance of the interceptor for the `willPaintCallback` method.
  const interceptor = intercept(willPaintCallback);

  // Adds the decorated method to the list of callbacks to be executed.
  return interceptor
    .in(target) // Sets the target of the interceptor.
    .then(exec(propertyKey)); // Defines the method to be executed by the interceptor.
};

export default willPaint;
```

### Parameters

1. **target**:
   - **Type:** `Function`
   - **Description:** The target of the decorator, usually the class of the Custom Element that contains the method to be decorated.

2. **propertyKey**:
   - **Type:** `string`
   - **Description:** The name of the method that will be intercepted and decorated. This method should contain the logic to be executed before the component's rendering.

### Steps for Usage

1. **Import the `willPaint` decorator**:

   ```javascript
   import { willPaint } from '@bake-js/-o-id/dom';
   ```

2. **Apply the decorator to the desired method**:

   - **Step 1:** Create a method in your Custom Element class that contains the logic to be executed before rendering.
   - **Step 2:** Decorate the method with `@willPaint`.

### Practical Example

**Example: Logic Before Rendering**

Here is an example of how to use `willPaint` to add logic to the component's lifecycle before rendering:

```javascript
import { define } from '@bake-js/-o-id';
import { willPaint } from '@bake-js/-o-id/dom';

@define('my-component')
class MyComponent extends HTMLElement {
  @willPaint
  handleWillPaint() {
    console.log('Preparing the component for painting...');
    // Logic to be executed, such as setting properties or validating state.
  }

  connectedCallback() {
    // Simulated rendering
    this.innerHTML = `<p>My component is ready to be rendered!</p>`;
  }
}
```

**Explanation:**
- The `handleWillPaint` method is automatically called before the component is rendered, allowing the preparation logic to be centralized and keeping the component's code organized.

### Benefits of the `willPaint` Decorator

1. **Flexibility**: Allows developers to execute custom logic before rendering, ensuring that the component is ready to be displayed.
2. **Code Organization**: Helps separate preparation logic from rendering logic, resulting in clearer and more manageable code.
3. **Increased Maintainability**: Facilitates code maintenance by allowing necessary changes to be made in one location without affecting the rendering logic.

### Final Considerations

The `willPaint` decorator is a powerful tool for developers who want to ensure their Custom Elements are correctly configured before rendering. This not only improves code quality but also offers greater control over the lifecycle of custom components.
