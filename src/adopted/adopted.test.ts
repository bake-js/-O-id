import { beforeEach, describe, expect, it } from "vitest";
import adopted from "./adopted";

describe("adoptedCallback", () => {
  let element: Element;
  let lifeCycle: string[];

  class Element {
    adoptedCallback() {
      lifeCycle.push("adoptedCallback");
      return this;
    }

    @adopted
    handleAdoption() {
      lifeCycle.push("handleAdoption");
      return this;
    }
  }

  beforeEach(() => {
    element = new Element();
    lifeCycle = [];
  });

  it("Deve executar o método decorado pelo @adopted após a chamada de adoptedCallback", async () => {
    await element.adoptedCallback();
    expect(lifeCycle).toEqual(["adoptedCallback", "handleAdoption"]);
  });

  it("Não deve executar o método decorado sem a chamada de adoptedCallback", () => {
    expect(lifeCycle).toEqual([]);
  });
});
