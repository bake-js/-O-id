import { beforeEach, describe, expect, it } from "vitest";
import connected from "./connected";

describe("connectedCallback", () => {
  let element: Element;
  let lifecycle: string[];

  class Element {
    connectedCallback() {
      lifecycle.push("connectedCallback");
      return this;
    }

    @connected
    handleConnected() {
      lifecycle.push("handleConnected");
      return this;
    }
  }

  beforeEach(() => {
    element = new Element();
    lifecycle = [];
  });

  it("Deve executar o método decorado @connected após a chamada de connectedCallback", async () => {
    await element.connectedCallback();
    expect(lifecycle).toEqual(["connectedCallback", "handleConnected"]);
  });

  it("Não deve executar o método decorado se connectedCallback não for chamado", () => {
    expect(lifecycle).toEqual([]);
  });
});
