import { beforeEach, describe, expect, it } from "bun:test";
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

  it("Executa o ciclo de vida do component apos o evento connectedCallback", async () => {
    expect(element.innerHTML).toBeUndefined();

    await element.connectedCallback();

    expect(lifecycle).toEqual([
      "connectedCallback",
      "willPaintCallback",
      "style",
      "component",
      "didPaintCallback",
    ]);

    expect(element.innerHTML).toBe("<div />");
  });
});
