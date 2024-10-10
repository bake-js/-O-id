[🇧🇷 Read in Portuguese](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# Relay

The `relay` is a decorator that simplifies listening for events on the `parentElement` of a Custom Element, being part of the library `@bake-js/-o-id/relay`.

## Overview

### Name and Classification

- **Name:** Relay
- **Classification:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Purpose

To facilitate listening for events on the `parentElement` of a Custom Element, allowing events from the parent element to be redirected and handled by the child component.

## Motivation

The use of `relay` brings the following advantages:

1. **Automatic Event Listening on Parent:** Eliminates the need to manually add event listeners on the `parentElement`, automating the process.
2. **Ease of Maintenance:** Centralizes the logic of inherited events from the parent in the child component.
3. **Consistency:** Ensures that listeners on the `parentElement` are correctly added and removed according to the component's lifecycle.

## Applicability

Ideal for situations where a child Custom Element needs to react to events triggered on the `parentElement`, such as updates in other components or global state changes.

## Import

To use the `relay` decorator, import it as follows:

```javascript
import relay from '@bake-js/-o-id/relay';
```

## Implementation

```javascript
import intercept from "./intercept";
import {
  abortController,
  connectedCallback,
  disconnectedCallback,
} from "./interfaces";

const attachEventListener =
  (type, ...filters) =>
  (target, propertyKey) => {
    intercept(connectedCallback)
      .in(target)
      .then(function () {
        const controller = (this[abortController] ??= new AbortController());
        const options = { signal: controller.signal };

        const listener = (event) => {
          this[propertyKey](
            filters.reduce((target, filter) => filter(target), event),
          );
        };

        this.parentElement.addEventListener(type, listener, options);
      });

    intercept(disconnectedCallback)
      .in(target)
      .then(function () {
        this[abortController].abort();
      });
  };

const relay = new Proxy(
  {},
  {
    get:
      (_, type) =>
      (...filters) =>
        attachEventListener(type, ...filters),
  },
);

export default relay;
```

### Usage Example

```javascript
import relay from '@bake-js/-o-id/relay';

class MyChildElement extends HTMLElement {
  @relay.changed()
  handleParentChange(event) {
    console.log('Parent element changed!', event);
  }
}

customElements.define('my-child-element', MyChildElement);
```

In this example, the `changed` event triggered on the `parentElement` of the child component will be captured and handled by the `handleParentChange` method.

## Comparison with Competitors

### Lit

- **Default Behavior:** In Lit, listening for events on the `parentElement` requires manual configuration in the `connectedCallback`.
- **Mandatory Extension:** Requires extending `LitElement` to define components.

```javascript
import { LitElement } from 'lit';

class MyChildElement extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    this.parentElement.addEventListener('changed', this.handleParentChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.parentElement.removeEventListener('changed', this.handleParentChange);
  }

  handleParentChange(event) {
    console.log('Parent element changed!', event);
  }
}

customElements.define('my-child-element', MyChildElement);
```

### Stencil

- **Manual Configuration:** In Stencil, listening for events from the `parentElement` also needs to be configured manually.
- **Optional Shadow DOM:** Shadow DOM support is optional and configurable.

```typescript
import { Component } from '@stencil/core';

@Component({
  tag: 'my-child-element',
  shadow: true,
})
export class MyChildElement {
  connectedCallback() {
    this.parentElement.addEventListener('changed', this.handleParentChange);
  }

  disconnectedCallback() {
    this.parentElement.removeEventListener('changed', this.handleParentChange);
  }

  handleParentChange(event: Event) {
    console.log('Parent element changed!', event);
  }
}
```

### Advantages of `@relay`

- **Automatic Listening:** Simplifies the process of listening for events from the `parentElement` without needing to write manual configuration code in the lifecycle.
- **Cleaner Code:** Centralizes the logic of events from the `parentElement` directly in the methods of the child Custom Element.
- **Flexibility:** Does not require extending specific classes, such as `LitElement` or `HTMLElement`.

## Final Considerations

The `relay` decorator is an efficient and declarative solution for listening to events from the `parentElement` in Custom Elements, improving the readability and maintainability of the code in scenarios where parent events need to be handled by children.
