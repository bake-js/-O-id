import html from "../src/html";

function component(self) {
  return html`
    <button class="counter">Count is: ${self.number}</button>
  `;
}

export default component;
