[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# Usage Guide: `Echo` Module

The `Echo` module provides a solution for communication between Custom Elements by implementing an Event Bus declaratively. It facilitates the emission and listening of events between components, allowing for decoupled and efficient communication.

### When to Use

- **Component Communication**: Ideal for components that need to share information or notifications without a direct reference to each other.
- **Centralized Event Bus**: When there's a need to manage events in a distributed architecture, `Echo` provides a central bus for events.
- **Declarative Event Protocols**: Useful for declaring how components connect to the Event Bus via HTML attributes.

### Structure

```javascript
/**
 * Echo mixin to add support for an Event Bus in a Custom Element.
 *
 * @param {typeof HTMLElement} Klass - The class of the Custom Element to be extended.
 * @returns {typeof HTMLElement} The extended class with Event Bus support.
 */
const Echo = (Klass) => class extends Klass {
  // Implementation of the Echo mixin
}
```

### Parameters

1. **Klass**:
   - **Type:** `typeof HTMLElement`
   - **Description:** The class of the Custom Element that will be extended to support the Event Bus.

2. **protocol**:
   - **Type:** `string`
   - **Description:** The event protocol that defines how the component connects to the event bus.

### Functionality

1. **`on` Attribute**: The main integration point of `Echo` is the `on` attribute, which specifies how the component is connected to the Event Bus. The format of the `on` value follows the pattern `target/event:action`.

2. **Lifecycle Interception**: `Echo` intercepts the `connectedCallback` and `disconnectedCallback` to ensure that events are registered when the component is added to the DOM and removed when it exits the DOM. This is done using `AbortController` to cancel events.

3. **Attribute Observation**: `Echo` observes the `on` attribute and automatically reacts to its changes, connecting or disconnecting the component from the event bus based on the attribute changes.

4. **Event Communication**: When `Echo` dispatches an event, it does so centrally, notifying other components that are subscribed to the event bus, without those components needing to know about each other directly.

### Practical Example

**Example: Search and List Component**

In this example, we have a search component that allows the user to filter a list of fruits. The search component emits an event whenever the input value changes, and the list component listens to that event to update its display accordingly.

```javascript
import { define } from '@bake-js/-o-ids';
import { css, html, paint, repaint } from '@bake-js/-o-id/dom';
import Echo from '@bake-js/-o-id/echo';
import on, { value } from '@bake-js/-o-id/event';

// Search Component
function searchComponent() {
  return html`
    <input placeholder="Type a fruit name" />
  `;
}

@define('dem-search')
@paint(searchComponent)
class Search extends Echo(HTMLElement) {
  @on.input('input', value)
  onInput(value) {
    this.dispatchEvent(new CustomEvent('changed', { detail: value }));
    return this;
  }
}

// List Component
function listComponent(self) {
  return html`
    <ul>
      ${self.data.map((d) => html`<li>${d}</li>`)}
    </ul>
  `;
}

@define('dem-list')
@paint(listComponent)
class List extends Echo(HTMLElement) {
  #criteria = /./ig;
  #data = ['grape', 'pear', 'orange', 'banana', 'watermelon', 'melon', 'pineapple'];
  
  get data() {
    return this.#data.filter(v => this.#criteria.test(v));
  }
  
  @repaint
  filter(value) {
    this.#criteria = new RegExp(value, 'ig');
    return this;
  }

  connectedCallback() {
    // Connect to the event bus
    this.addEventListener('changed', (e) => this.filter(e.detail));
  }
}
```

**Explanation**:
- The `SenderComponent` (search component) emits a `changed` event when the input value changes, passing the new value as detail.
- The `ReceiverComponent` (list component) listens for the `changed` event and filters the list of fruits based on the received value.

### Benefits of the `Echo` Module

1. **Decoupling**: `Echo` allows components to communicate without needing to know about each other directly, making it easier to build modular and scalable systems.
2. **Lifecycle Management**: Events are automatically managed based on the `connectedCallback` and `disconnectedCallback`, ensuring that listeners are correctly removed when the component is removed from the DOM.
3. **Flexibility**: The event protocol is declarative, allowing for a simple and flexible configuration of how components communicate.

### Supported Attributes

1. **`on`**:
   - **Description**: Defines the event protocol for communication with the event bus.
   - **Format**: `target/event:action`
   - **Example**: `dem-search/changed:method/filter`

### Available Actions

1. **`attribute`**: Maps events to a **component attribute**.
   - **Description**: Updates a component attribute with the event value.
   - **Example**: `sender/message:attribute/myAttribute`

2. **`setter`**: Maps events to a **component setter**.
   - **Description**: Calls the corresponding setter on the component with the event value.
   - **Example**: `sender/message:setter/mySetter`

3. **`method`**: Maps events to a **component method**.
   - **Description**: Invokes a component method, passing the event details as a parameter.
   - **Example**: `dem-search/changed:method/filter`

### Available Filters

Filters allow manipulating the event before it is dispatched or received by the target.

1. **`prop`**: Maps a property name, allowing traversal of a namespace to obtain a specific value.
   - **Example**: `sender/message:prop/user.name`

### Advanced Example

```html
<!-- Declarative Echo protocol: sender sends a message, receiver listens -->
<dem-search on="dem-list/changed:method/filter"></dem-search>
<dem-list></dem-list>
```

In this example, `dem-list` is set up to listen for `changed` events sent by `dem-search` and calls the `filter` method to process the message.

### Final Considerations

`Echo` is an innovative solution for communication between components in Web applications. Its simple and efficient implementation allows developers to create complex interactions without the overhead of additional libraries. The module is still in beta, and feedback is welcome for continuous improvements.
