[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# Event Module of **-O-id**

The **Event** module of **-O-id** provides a powerful and flexible way to manage events within your Web Components. Through the use of decorators, it is possible to associate events with specific methods simply and efficiently, keeping your code organized and easy to maintain.

## Introduction

**-O-id** simplifies event handling in Web Components through decorators that allow direct binding of events to methods. With support for filters and the ability to intercept any DOM event, the **Event** module offers a modular and extensible approach to developing reactive interfaces.

## Importing Decorators and Filters

To use the Event modules, import them as follows:

```javascript
import on, { stop, prevent, formData, value } from '@bake-js/-o-id/event';
```

## Main Features

### Event Binding

The `@on` decorator is used to bind events to specific methods of a Web Component. It functions as a proxy, intercepting events and allowing you to apply filters before calling the associated method. This not only simplifies event handling but also allows for greater control and customization.

### Using `@on`

The `@on` can map any DOM event to a specific method. Here’s how you can use it:

```javascript
@on.click('button')
handleClick() {
  // Code executed when the button is clicked
}

@on.submit('form', prevent, formData)
handleSubmit(data) {
  // Code executed when the form is submitted
  // `data` contains the data processed by the `formData` filter
}

@on.input('input', stop, value)
handleInput(event) {
  const inputValue = value(event);
  console.log('Input value:', inputValue);
  // Other operations with inputValue can be performed here
}
```

### Available Filters

Filters allow you to manipulate and process events before they are passed to the bound methods. The available filters include:

- **`prevent`**: Stops the default behavior of the event.
- **`stop`**: Stops the propagation of the event in the DOM.
- **`formData`**: Extracts data from the form and returns it as an object.
- **`value`**: Extracts the value of an input field associated with the event.

### Creating Custom Filters

In addition to native filters, you can create your own filters to manipulate events as needed. A custom filter follows this structure:

```javascript
function myFilter(event) {
  // Custom manipulation logic
  return /* result of my manipulation */;
}
```

Custom filters allow you to introduce additional logic before the event is processed by the bound method, providing an extra layer of flexibility and control.

### Multiple Filters

The `@on` decorator allows the application of multiple filters on a single event, using the pipe & filters approach. This means you can easily compose behavior along the event processing chain, making development more modular and adaptable to your needs.

## Why Use the `@on` Decorator?

Using the `@on` decorator in **-O-id** offers several advantages that make the development of Web Components more efficient and less verbose:

- **Simplicity and Clarity**: Instead of manually adding event listeners and spreading logic throughout the code, `@on` allows events to be associated directly with methods, making the code more readable and easier to maintain.

- **Modularity**: Applying the same decorator to multiple methods without the need for complex chaining simplifies code organization. With `@on`, multiple methods can intuitively respond to the same event.

- **Total Control**: Functioning as a proxy, `@on` intercepts events and allows the application of custom filters before passing them to the corresponding method. This offers precise control over how and when events are processed.

- **Extensibility**: The ability to create custom filters allows you to tailor event behavior to the specific needs of your application, integrating this flexibility consistently with the rest of the code.

## Usage Examples

### Example 1: Click Handling

```javascript
@on.click('button')
handleClick() {
  console.log('Button clicked!');
}
```

### Example 2: Form Submission with Data Extraction

```javascript
@on.submit('form', prevent, formData)
handleSubmit(data) {
  console.log('Form data:', data);
}
```

### Example 3: Capturing Input Value

```javascript
@on.input('input', stop, value)
handleInput(event) {
  const inputValue = value(event);
  console.log('Input value:', inputValue);
}
```

## Conclusion

The `@on` decorator not only simplifies event handling but also offers a more structured and flexible approach to developing Web Components. With it, you gain clarity in the code, modularity in functions, and total control over the flow of events, all while maintaining the simplicity and efficiency that is the hallmark of **-O-id**. It is an elegant solution that balances ease of use with customization power, facilitating the creation of modern and robust applications.

Try **-O-id** and see how it can simplify and enhance your development of Web Components!
