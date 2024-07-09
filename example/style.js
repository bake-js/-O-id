import css from "../src/css";

function style(self) {
  return css`
    :host {
      --border-radius-pill: 500px;
      --border-width-hairline: 1px;
      --color-master-darker: #1a1a1a;
      --color-master: #626262;
      --font-family-base: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      --font-size-xs: 16px;
      --font-weight-medium: 500;
      --spacing_inset-nano: 8px;
      --spacing_inset-xs: 16px;
    }

    .counter {
      background-color: transparent;
      border: var(--border-width-hairline) solid var(--color-master);
      border-radius: var(--border-radius-pill);
      color: var(--color-master-darker);
      cursor: pointer;
      font-family: var(--font-family-base);
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-medium);
      padding: var(--spacing_inset-nano) var(--spacing_inset-xs);
    }
  `;
}

export default style;
