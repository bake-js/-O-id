import intercept, { exec } from "../intercept";
import { formStateRestoreCallback } from "../interfaces";

const formStateRestore = (target, propertyKey) =>
  intercept(formStateRestoreCallback).in(target).then(exec(propertyKey));

export default formStateRestore;
