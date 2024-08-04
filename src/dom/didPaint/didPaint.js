import intercept, { exec } from "../intercept";
import { didPaintCallback } from "../interfaces";

const didPaint = (target, propertyKey) =>
  intercept(didPaintCallback).in(target).then(exec(propertyKey));

export default didPaint;
