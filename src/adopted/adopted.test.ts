import { beforeEach, describe, expect, it } from "bun:test";
import adopted from "./adopted";

describe("adopted", () => {
  let element: Element;
  let lifecycle: string[];

  class Element {
    adoptedCallback() {
      lifecycle.push("adoptedCallback");
      return this;
    }

    @adopted
    onAdopted() {
      lifecycle.push("onAdopted");
      return this;
    }
  }

  beforeEach(() => {
    element = new Element();
    lifecycle = [];
  });

  it("Executa o metodo decorado pelo adopted apos o evento adoptedCallback", async () => {
    await element.adoptedCallback();
    expect(lifecycle).toEqual(["adoptedCallback", "onAdopted"]);
  });
});
