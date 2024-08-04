import intercept, { exec } from "../intercept";
import { formAssociatedCallback } from "../interfaces";

const formAssociated = (target, propertyKey) =>
  intercept(formAssociatedCallback).in(target).then(exec(propertyKey));

export default formAssociated;
