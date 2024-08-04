import intercept, { exec } from "../intercept";
import { formDisabledCallback } from "../interfaces";

const formDisabled = (target, propertyKey) =>
  intercept(formDisabledCallback).in(target).then(exec(propertyKey));

export default formDisabled;
