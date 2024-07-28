import intercept, { exec } from "../intercept";
import { connectedCallback } from "../interfaces";

const connected = (target, propertyKey) =>
  intercept(connectedCallback).in(target).then(exec(propertyKey));

export default connected;
