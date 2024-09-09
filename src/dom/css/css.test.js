import { describe, expect, it } from "vitest";
import css from "./css";

describe("css", () => {
  it("Deve criar uma instância de CSSStyleSheet", () => {
    const [style] = css`body { background-color: black; }`;
    expect(style).toBeInstanceOf(CSSStyleSheet);
  });

  it("Deve definir o conteúdo correto da folha de estilo", () => {
    const [style] = css`
      body {
        background-color: black;
      }
    `;

    expect(style.cssRules[0].cssText).toBe("body { background-color: black; }");
  });

  it("Deve substituir corretamente os valores dentro do template literal", () => {
    const color = "red";
    const [style] = css`
      body {
        background-color: ${color};
      }
    `;

    expect(style.cssRules[0].cssText).toBe("body { background-color: red; }");
  });

  it("Deve lidar com múltiplos valores e regras de CSS", () => {
    const bgColor = "blue";
    const fontSize = "16px";
    const [style] = css`
      body {
        background-color: ${bgColor};
        font-size: ${fontSize};
      }
    `;

    expect(style.cssRules[0].cssText).toBe(
      "body { background-color: blue; font-size: 16px; }",
    );
  });
});
