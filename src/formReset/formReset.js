import intercept, { exec } from "../intercept";
import { formResetCallback } from "../interfaces";

const formReset = (target, propertyKey) =>
  intercept(formResetCallback).in(target).then(exec(propertyKey));

export default formReset;
