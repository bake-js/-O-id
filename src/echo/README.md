[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# Echo Module of **-O-id**

> **In beta phase**: The Echo module is in beta phase, which means there may be changes in the API and behavior before the final version. Keep an eye on updates to ensure compatibility.

## Introduction

The Echo module of **-O-id** provides a powerful solution for managing events between Web Components. It allows you to define and listen to events between components easily and efficiently. Below, we present how to use Echo to create a system of interconnected events.

## Import

To use the Echo module, import it as follows:

```javascript
import Echo from '@bake-js/-o-id/echo';
```

## Structure of the `on` Attribute

The `on` attribute of the Echo module follows the "topic:mapper" structure. The structure is detailed below:

- **Topic:** Defines the event topic and is composed of "element/event".
- **Mapper:** Specifies the target and the name of the target within the event. The mapper is composed of "target/target-name", where the targets can be:
  - **attribute**: Reference to component attributes.
  - **setter**: Reference to component setter methods.
  - **method**: Reference to component methods.

### Usage Examples

#### Defining a Component with Echo

```javascript
import { define } from '@bake-js/element';
import Echo from '@bake-js/element/echo';

@define('sender-component')
class SenderComponent extends Echo(HTMLElement) {

}

@define('receiver-component')
class ReceiverComponent extends Echo(HTMLElement) {

}
```

#### Communication between Components in HTML

```html
<sender-component></sender-component>
<receiver-component on="sender-component/messageSent:method/handleMessage"></receiver-component>
```

In the example above:
- The `SenderComponent` emits a custom event `messageSent` when the button is clicked.
- The `ReceiverComponent` listens to this event and updates its content with the received message.

## Why Use the `@on` Decorator

Using the `@on` decorator offers several advantages:

- **Simplicity and Clarity:** Reduces code verbosity, making event association clearer and more straightforward.
- **Reusability:** Allows the use of multiple decorators on the same method, simplifying configuration and avoiding the need to call methods manually.
- **Efficiency:** Facilitates code writing and maintenance, as the decorator automatically manages event association and disassociation.

## Conclusion

Adopting the `@on` decorator provides a cleaner and more organized approach to managing events in your Web Components, resulting in a more efficient and less error-prone implementation.

Try **-O-id** and see how it can simplify and enhance your Web Component development!
