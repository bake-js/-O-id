[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# -O-id Lifecycle and Forms Module

The **Lifecycle and Forms** module of **-O-id** provides a series of decorators that simplify handling the lifecycle of Web Components and interaction with forms. These decorators allow you to add custom logic to crucial component lifecycle events and efficiently manage interaction with form elements.

## Introduction

**-O-id** offers a modular and reactive approach to managing Web Component lifecycle events and form association. With specific decorators, you can encapsulate the necessary logic to respond to attribute changes, connection states, and form-related events, promoting a clearer and more organized development experience.

## Importing the Decorators

To use the functionalities of this module, import the decorators as follows:

```javascript
import { define, adopted, attributeChanged, connected, disconnected, formAssociated, formDisabled, formReset, formStateRestore } from '@bake-js/-o-id';
```

## Key Features

### Lifecycle Decorators

The decorators provide hooks for different moments in the component's lifecycle:

- **`@define`**: Defines a Custom Element.
- **`@adopted`**: Executes logic when the element is moved to a new context in the DOM.
- **`@attributeChanged`**: Responds to changes in the element’s attributes.
- **`@connected`**: Executes logic when the element is connected to the DOM.
- **`@disconnected`**: Executes logic when the element is disconnected from the DOM.

### Form Decorators

The specific decorators for form interaction allow you to respond to form-related events:

- **`@formAssociated`**: Indicates that the element is associated with a form.
- **`@formDisabled`**: Executes logic when the element is disabled within a form.
- **`@formReset`**: Responds to the form reset event.
- **`@formStateRestore`**: Executes logic when the associated form state is restored.

### Decorator Structure

The decorators can be used to simplify the component's lifecycle and form interaction logic. Here’s an example of how to use them:

```javascript
@define('my-component')
class MyComponent extends HTMLElement {
  constructor() {
    super();
  }

  @adopted
  handleAdopted() {
    // Logic to be executed when the component is moved in the DOM.
  }

  @attributeChanged
  handleAttributeChange(name, oldValue, newValue) {
    // Logic to be executed when an attribute is changed.
  }

  @connected
  handleConnected() {
    // Logic to be executed when the component is connected to the DOM.
  }

  @disconnected
  handleDisconnected() {
    // Logic to be executed when the component is disconnected from the DOM.
  }

  @formAssociated
  handleFormAssociated() {
    // Logic for associating the component with a form.
  }

  @formDisabled
  handleFormDisabled() {
    // Logic to be executed when the form is disabled.
  }

  @formReset
  handleFormReset() {
    // Logic to be executed when the form is reset.
  }

  @formStateRestore
  handleFormStateRestore() {
    // Logic to be executed when the form state is restored.
  }
}
```

## Practical Example

**Example: Using `@define`, `@connected`, and `@formStateRestore`**

```javascript
import { define, connected, formStateRestore } from '@bake-js/-o-id';

@define('custom-element')
class CustomElement extends HTMLElement {
  constructor() {
    super();
  }

  @connected
  handleConnected() {
    console.log('The element was connected to the DOM.');
  }

  @formStateRestore
  handleFormStateRestore() {
    console.log('The form state was restored.');
  }
}
```

## Why Use the Lifecycle and Forms Module?

Using this module in **-O-id** offers several advantages that make developing Web Components more efficient and modular:

- **Efficient Management**: Encapsulates lifecycle and form interaction logic in decorators, keeping code organized and maintainable.
  
- **Flexibility**: Allows you to respond to specific lifecycle events and form state changes, improving component reactivity.

- **Simplicity**: The decorators offer a clear and straightforward way to implement logic without complicating the component's structure.

## Usage Examples

### Example 1: Creating a Component with Lifecycle

```javascript
@define('life-cycle-component')
class LifeCycleComponent extends HTMLElement {
  constructor() {
    super();
  }

  @connected
  handleConnected() {
    console.log('The component was connected to the DOM.');
  }

  @disconnected
  handleDisconnected() {
    console.log('The component was disconnected from the DOM.');
  }
}
```

### Example 2: Using `@formAssociated` and `@formReset`

```javascript
@define('form-component')
class FormComponent extends HTMLElement {
  constructor() {
    super();
  }

  @formAssociated
  handleFormAssociated() {
    console.log('The component is associated with a form.');
  }

  @formReset
  handleFormReset() {
    console.log('The form was reset.');
  }
}
```

## Conclusion

The **-O-id** Lifecycle and Forms module provides an efficient way to manage lifecycle events and form interactions in Web Components. With its modular and flexible approach, you can build reactive and maintainable interfaces, ensuring your code remains clear and organized. Try out the module and discover how it can enhance your Web Component development!
