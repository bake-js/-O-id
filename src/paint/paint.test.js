import { describe, expect, it } from "bun:test";
import paint from "paint";
import trait from "trait";

describe("paint", () => {
  it("Define os metodos connectedCallback e trait.paint na class decorado pelo paint", () => {
    function component() {}
    class Element {}
    paint(component)(Element);
    expect(Element.prototype.connectedCallback).toBeDefined();
    expect(Element.prototype[trait.paint]).toBeDefined();
  });

  it("O evento connectedCallback executa o metodo trait.paint", () => {
    function component() {}
    class Element {}
    paint(component)(Element);
  });
});
