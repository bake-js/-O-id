import intercept, { exec } from "../intercept";
import {
  connectedCallback,
  didPaintCallback,
  paintCallback,
  willPaintCallback,
} from "../interfaces";

const paint =
  (component, style = () => []) =>
  (target) => {
    intercept(paintCallback)
      .in(target.prototype)
      .then(async function () {
        const render = (resolve) => {
          requestAnimationFrame(() => {
            (this.shadowRoot ?? document).adoptedStyleSheets = style(this);
            (this.shadowRoot ?? this).innerHTML = component(this);
            resolve();
          });
        };

        await this[willPaintCallback]?.();
        await new Promise(render);
        await this[didPaintCallback]?.();
      });

    intercept(connectedCallback).in(target.prototype).then(exec(paintCallback));
  };

export default paint;
