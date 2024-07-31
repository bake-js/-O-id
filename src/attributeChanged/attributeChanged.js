import intercept from "../intercept";
import { attributeChangedCallback, observedAttributes } from "../interfaces";

const attributeChanged = (attributeName) => (target, propertyKey) => {
  Object.assign(target.constructor, {
    [observedAttributes]: [
      attributeName,
      ...(target.constructor[observedAttributes] ?? []),
    ],
  });

  intercept(attributeChangedCallback)
    .in(target)
    .then(function (name, oldValue, newValue) {
      name === attributeName &&
        oldValue !== newValue &&
        this[propertyKey](newValue, oldValue);
    });
};

export default attributeChanged;
