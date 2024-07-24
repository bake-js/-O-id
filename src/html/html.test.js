import { describe, expect, it } from "bun:test";
import html from "./html";

describe("html", () => {
  it("Remove caracter de scape de nova linha", () => {
    const content = html`
      <div>
        <strong>@bake-js/element</strong>
      </div>
    `;

    expect(content).toBe("<div><strong>@bake-js/element</strong></div>");
  });

  it("Remove caracter de espaco extra", () => {
    const content = html`
      <div>
        <strong>Cleber de   Moraes Goncalves  </strong>
      </div>
    `;

    expect(content).toBe(
      "<div><strong>Cleber de Moraes Goncalves </strong></div>",
    );
  });

  it("Remove o separator para quando o value for um array", () => {
    const fruits = ["laranja", "uva", "pera"];
    const content = html`
      <ul>
        ${fruits.map((fruit) => html`<li>${fruit}</li>`)}
      </ul>
    `;

    expect(content).toBe("<ul><li>laranja</li><li>uva</li><li>pera</li></ul>");
  });
});
