import intercept, { exec } from "../intercept";
import { disconnectedCallback } from "../interfaces";

const disconnected = (target, propertyKey) =>
  intercept(disconnectedCallback).in(target).then(exec(propertyKey));

export default disconnected;
