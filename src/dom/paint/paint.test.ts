import { beforeEach, describe, expect, it } from "vitest";
import { didPaintCallback, willPaintCallback } from "../interfaces";
import paint from "./paint";

describe("paint", () => {
  let element: Element;
  let lifecycle: string[];

  function style() {
    lifecycle.push("style");
    return "div { color: red; }";
  }

  function component() {
    lifecycle.push("component");
    return "<div />";
  }

  @paint(component, style)
  class Element {
    connectedCallback() {
      lifecycle.push("connectedCallback");
      return this;
    }

    [didPaintCallback]() {
      lifecycle.push("didPaintCallback");
      return this;
    }

    [willPaintCallback]() {
      lifecycle.push("willPaintCallback");
      return this;
    }
  }

  beforeEach(() => {
    element = new Element();
    lifecycle = [];
  });

  it("Executa corretamente o ciclo de vida ao chamar connectedCallback", async () => {
    // Certifique-se de que o innerHTML ainda não foi definido
    expect(element.innerHTML).toBeUndefined();

    // Chama o connectedCallback e verifica o ciclo de vida
    await element.connectedCallback();

    expect(lifecycle).toEqual([
      "connectedCallback",
      "willPaintCallback",
      "style",
      "component",
      "didPaintCallback",
    ]);

    // O conteúdo do componente deve estar correto após o ciclo de vida
    expect(element.innerHTML).toBe("<div />");
  });
});
