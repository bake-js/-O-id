[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# Usage Guide: `repaint` Decorator

The `repaint` decorator is a tool that ensures the `paintCallback` is called after the execution of methods or property updates in a Custom Element. This is crucial for ensuring that painting actions are performed at the appropriate time in the component's lifecycle.

### When to Use

- **Visual Updates**: Ideal for components that need to update their visual interface whenever a method is called or a property is changed.
- **Component Lifecycle**: Useful for ensuring that painting logic is invoked only when the component is connected to the DOM.

### How It Works

The `repaint` decorator intercepts the execution of methods or the assignment of values to properties. It ensures that, after execution, the `paintCallback` is called, as long as the component is painted (`isPainted`).

### Structure

```javascript
/**
 * @param {Object} _target - The target of the decorator (class or prototype).
 * @param {string} _propertyKey - The name of the decorated property/method.
 * @param {Object} descriptor - The property/method descriptor.
 * @returns {void}
 */
const repaint = (_target, _propertyKey, descriptor) => {
  if (descriptor.value) {
    // If it is a method
    const originalMethod = descriptor.value;

    Object.assign(descriptor, {
      async value(...args) {
        // Executes the original method
        await Reflect.apply(originalMethod, this, args);

        // If the element is connected, calls the painting callback
        if (this.isPainted) {
          await this[paintCallback]?.();
        }

        // Returns the component instance
        return this;
      },
    });
  }

  if (descriptor.set) {
    // If it is a setter
    const originalSetter = descriptor.set;

    Object.assign(descriptor, {
      async set(value) {
        // Calls the original setter
        await Reflect.apply(originalSetter, this, [value]);

        // If the element is connected, calls the painting callback
        if (this.isPainted) {
          await this[paintCallback]?.();
        }
      },
    });
  }
}
```

### Parameters

1. **_target** (required):
   - **Type:** `Object`
   - **Description:** The target of the decorator, which can be a class or prototype where the method or property is defined.

2. **_propertyKey** (required):
   - **Type:** `string`
   - **Description:** The name of the decorated method or property.

3. **descriptor** (required):
   - **Type:** `Object`
   - **Description:** The property/method descriptor that contains the original logic to be decorated.

### Steps for Use

1. **Import the `repaint` decorator**:

   ```javascript
   import { repaint } from '@bake-js/-o-id/dom';
   ```

2. **Apply the decorator to the property or method of your Custom Element**:

   - **Step 1:** Identify the method or property that should invoke the painting callback after its execution.
   - **Step 2:** Apply the `repaint` decorator to the method or the property setter.

### Practical Example

**Example 1: Using in a Method**

Here is an example of how to use `repaint` in a method of a Custom Element:

```javascript
import { define } from '@bake-js/-o-id';
import { repaint } from '@bake-js/-o-id/dom';

@define('my-component')
class MyComponent extends HTMLElement {
  paintCallback() {
    console.log('Painting callback called');
  }

  // Method decorated with repaint
  @repaint
  handlePaint() {
    console.log('Original method executed');
  }
}
```

**Explanation:**
- When calling `handlePaint()`, the original method is executed, followed by the call to `paintCallback`, ensuring that the painting logic is respected.

**Example 2: Using in a Property**

You can also use `repaint` in property setters:

```javascript
import { define } from '@bake-js/-o-id';
import { repaint } from '@bake-js/-o-id/dom';

@define('my-component')
class MyComponent extends HTMLElement {
  #color;

  @repaint
  set color(value) {
    this.#color = value;
    console.log(`Color set to: ${value}`);
  }

  get color() {
    return this.#color;
  }
}
```

**Explanation:**
- When the `color` property is updated, the decorated setter invokes the `paintCallback` after execution, ensuring that the component's painting logic is called correctly.

### Benefits of the `repaint` Decorator

1. **Visual Consistency**: Ensures that painting logic is called consistently and at the right moment, keeping the user interface in sync with the component's state.
2. **Automation**: Automates the calling of the `paintCallback`, reducing the need to manually manage visual updates in multiple places in the code.
3. **Simplicity and Readability**: Facilitates code readability and maintenance, allowing developers to focus on component logic without worrying about managing painting lifecycle events.

### Final Considerations

The `repaint` decorator is an essential tool for developers looking to ensure that the painting logic of Custom Elements is executed automatically and efficiently, keeping the visual interface always updated and consistent with the component's state changes.
