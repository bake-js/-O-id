import { beforeEach, describe, expect, it } from "bun:test";
import disconnected from "./disconnected";

describe("Disconnected callback", () => {
  let element: Element;
  let lifecycle: string[];

  class Element {
    disconnectedCallback() {
      lifecycle.push("disconnectedCallback");
      return this;
    }

    @disconnected
    handleDisconnect() {
      lifecycle.push("handleDisconnect");
      return this;
    }
  }

  beforeEach(() => {
    element = new Element();
    lifecycle = [];
  });

  it("Deve executar o método decorado @disconnected após a chamada de disconnectedCallback", async () => {
    await element.disconnectedCallback();
    expect(lifecycle).toEqual(["disconnectedCallback", "handleDisconnect"]);
  });

  it("Não deve executar o método decorado se disconnectedCallback não for chamado", () => {
    expect(lifecycle).toEqual([]);
  });
});
