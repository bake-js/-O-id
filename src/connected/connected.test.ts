import { beforeEach, describe, expect, it } from "bun:test";
import connected from "./connected";

describe("attributeChanged", () => {
  let element: Element;
  let lifecycle: string[];

  class Element {
    connectedCallback() {
      lifecycle.push("connectedCallback");
      return this;
    }

    @connected
    onConnected(value, oldValue) {
      lifecycle.push("onConnected");
      return this;
    }
  }

  beforeEach(() => {
    element = new Element();
    lifecycle = [];
  });

  it("Executa o metodo decorado somente quando o atributo for o mesmo mencionado", async () => {
    await element.connectedCallback();
    expect(lifecycle).toEqual(["connectedCallback", "onConnected"]);
  });
});
