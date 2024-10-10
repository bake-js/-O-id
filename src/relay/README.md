[🇧🇷 Read in Portuguese](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# Relay Module of **-O-id**

The **Relay** module of **-O-id** provides an effective way to observe events emitted by the parent element of a Web Component. Through decorators, you can easily associate events from the parent element with specific methods, keeping your code organized and efficient.

## Introduction

**-O-id** simplifies listening to events from the parent element in Web Components through decorators that allow the direct binding of events from the `parentElement` to methods. With support for filters and a declarative approach, the **Relay** module facilitates event management in component hierarchies.

## Importing the Decorator

To use the Relay module, import it as follows:

```javascript
import relay from '@bake-js/-o-id/relay';
```

## Key Features

### Listening to Parent Events

The `@relay` decorator allows a Web Component to listen for events emitted by its `parentElement`. This decorator adds an event listener on the `parentElement` when the component is connected to the DOM and automatically removes it when the component is disconnected. Event listening is done efficiently and declaratively.

### Using `@relay`

The `@relay` can map any event from the `parentElement` to a specific method. Here’s how you can use it:

```javascript
@relay.changed(prevent, stop)
handleChanged(event) {
  console.log('Event "changed" received from parentElement');
}

@relay.updated(stop)
handleUpdated(event) {
  console.log('Event "updated" received from parentElement');
}
```

### Available Filters

Just like in the Event module, filters allow you to manipulate and process events before passing them to the bound methods. The available filters include:

- **`prevent`**: Stops the default behavior of the event.
- **`stop`**: Stops the event from propagating in the DOM.

### Structure of the Decorator

The `@relay` decorator is designed to be simple and intuitive. It generates decorators dynamically based on the type of event. Unlike `@on`, it does not require a selector, as the event is always listened to on the parent of the element.

## Usage Examples

### Example 1: Listening to "changed" Event

```javascript
@relay.changed(prevent, stop)
handleChanged(event) {
  console.log('The parent emitted a "changed" event');
}
```

### Example 2: Listening to "updated" Event

```javascript
@relay.updated(stop)
handleUpdated(event) {
  console.log('The parent emitted an "updated" event');
}
```

## Conclusion

The `@relay` decorator simplifies listening to events from the `parentElement`, offering a declarative and flexible approach to the development of Web Components. With it, you can easily respond to events emitted by the parent element, maintaining clarity and modularity in your code. It is a powerful solution that facilitates the creation of dynamic interactions in modern applications.

Try **-O-id** and discover how the **Relay** module can optimize event management in your Web Components!
