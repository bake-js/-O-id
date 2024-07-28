import intercept, { exec } from "../intercept";
import { adoptedCallback } from "../interfaces";

const adopted = (target, propertyKey) =>
  intercept(adoptedCallback).in(target).then(exec(propertyKey));

export default adopted;
