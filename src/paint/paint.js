import intercept, { exec } from "../intercept";
import {
  connectedCallback,
  didPaintCallback,
  paintCallback,
  willPaintCallback,
} from "../interfaces";

const paint = (component, style) => (target) => {
  intercept(paintCallback)
    .in(target.prototype)
    .then(async function () {
      await this[willPaintCallback]?.();
      await new Promise((resolve) => {
        requestAnimationFrame(() => {
          (this.shadowRoot ?? document).adoptedStyleSheets = style
            ? [style(this)]
            : [];
          (this.shadowRoot ?? this).innerHTML = component(this);
          resolve();
        });
      });
      await this[didPaintCallback]?.();
    });

  intercept(connectedCallback).in(target.prototype).then(exec(paintCallback));
};

export default paint;
