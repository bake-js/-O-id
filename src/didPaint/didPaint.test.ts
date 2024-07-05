import { beforeEach, describe, expect, it } from "bun:test";
import paint from "../paint";
import trait from "../trait";
import didPaint from "./didPaint";

describe("paint", () => {
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
    onDidPaint() {
      lifecycle.push("didPaint");
      return this;
    }
  }

  beforeEach(() => {
    element = new Element();
    lifecycle = [];
  });

  it("Executa o ciclo de vida do component apos o evento connectedCallback", async () => {
    await element.connectedCallback();
    expect(lifecycle).toEqual(["connectedCallback", "component", "didPaint"]);
  });
});
