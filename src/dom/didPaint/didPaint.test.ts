import { beforeEach, describe, expect, it } from "vitest";
import paint from "../paint";
import didPaint from "./didPaint";

describe("didPaint", () => {
  let element: Element;
  let lifecycle: string[];

  function component() {
    lifecycle.push("component");
    return "<div />";
  }

  @paint(component)
  class Element {
    connectedCallback() {
      lifecycle.push("connectedCallback");
      return this;
    }

    @didPaint
    handlePaint() {
      lifecycle.push("handlePaint");
      return this;
    }
  }

  beforeEach(() => {
    element = new Element();
    lifecycle = [];
  });

  it("Executa o ciclo de vida do componente após o evento connectedCallback", async () => {
    await element.connectedCallback();
    expect(lifecycle).toEqual([
      "connectedCallback",
      "component",
      "handlePaint",
    ]);
  });

  it("Não executa o ciclo de vida de didPaint se connectedCallback não for chamado", () => {
    expect(lifecycle).toEqual([]);
  });
});
