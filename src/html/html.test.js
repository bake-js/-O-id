import { describe, expect, it } from "bun:test";
import html from "./html";

describe("html", () => {
  it("Remove caracter de scape com espacos extras", () => {
    const content = html`
      <div>
        <strong>@bake-js/element</strong>
      </div>
    `;

    expect(content).toBe("<div><strong>@bake-js/element</strong></div>");
  });
});
