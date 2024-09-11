import { describe, expect, it } from "vitest";
import html from "./html";

describe("html", () => {
  it("Remove caracteres de escape de nova linha e espaços ao redor", () => {
    const content = html`
      <div>
        <strong>@bake-js/element</strong>
      </div>
    `;
    expect(content).toBe("<div><strong>@bake-js/element</strong></div>");
  });

  it("Remove múltiplos espaços extras entre palavras dentro das tags HTML", () => {
    const content = html`
      <div>
        <strong>Cleber de   Moraes Goncalves  </strong>
      </div>
    `;
    expect(content).toBe(
      "<div><strong>Cleber de Moraes Goncalves </strong></div>",
    );
  });

  it("Remove separadores de array quando arrays são interpolados dentro de templates literais", () => {
    const fruits = ["laranja", "uva", "pera"];
    const content = html`
      <ul>
        ${fruits.map((fruit) => html`<li>${fruit}</li>`)}
      </ul>
    `;
    expect(content).toBe("<ul><li>laranja</li><li>uva</li><li>pera</li></ul>");
  });

  it("Remove espaços extras ao redor das tags HTML", () => {
    const content = html`
      <div>  <span>Texto com espaços  </span>  </div>
    `;
    expect(content).toBe("<div><span>Texto com espaços </span></div>");
  });

  it("Remove múltiplas quebras de linha e espaços simultaneamente entre as tags HTML", () => {
    const content = html`
      <div>
      
        <strong>Texto</strong>   
        
      </div>
    `;
    expect(content).toBe("<div><strong>Texto</strong></div>");
  });
});
