import { beforeEach, describe, expect, it } from "bun:test";
import paint from "../paint";
import trait from "../trait";
import willPaint from "./willPaint";

describe("willPaint", () => {
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

    @willPaint
    onWillPaint() {
      lifecycle.push("willPaintCallback");
      return this;
    }
  }

  beforeEach(() => {
    element = new Element();
    lifecycle = [];
  });

  it("Executa o ciclo de vida do component apos o evento connectedCallback", async () => {
    await element.connectedCallback();
    expect(lifecycle).toEqual([
      "connectedCallback",
      "willPaintCallback",
      "component",
    ]);
  });
});
