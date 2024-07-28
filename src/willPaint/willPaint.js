import intercept, { exec } from "../intercept";
import { willPaintCallback } from "../interfaces";

const willPaint = (target, propertyKey) =>
  intercept(willPaintCallback).in(target).then(exec(propertyKey));

export default willPaint;
