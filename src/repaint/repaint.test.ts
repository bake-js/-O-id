import { beforeEach, describe, expect, it } from "bun:test";
import paint from "../paint";
import trait from "../trait";
import repaint from "./repaint";

describe("repaint", () => {
  let element: Element;
  let lifecycle: string[];

  function component(self: any) {
    lifecycle.push("component");
    return `<button>Increment ${self.number}</button>`;
  }

  @paint(component)
  class Element {
    #number: number;

    get number(): number {
      return this.#number ?? 0;
    }

    set number(value: number) {
      this.#number = value;
    }

    connectedCallback() {
      lifecycle.push("connectedCallback");
      return this;
    }

    @repaint
    increment() {
      lifecycle.push("increment");
      this.number += 1;
      return this;
    }

    [trait.didPaint]() {
      lifecycle.push("didPaint");
      return this;
    }

    [trait.willPaint]() {
      lifecycle.push("willPaint");
      return this;
    }
  }

  beforeEach(() => {
    element = new Element();
    lifecycle = [];
  });

  it("Re-executa o paint e o ciclo de vida ao executar o método decorado com repaint", async () => {
    expect(element.innerHTML).toBeUndefined();

    await element.connectedCallback();

    expect(lifecycle).toEqual([
      "connectedCallback",
      "willPaint",
      "component",
      "didPaint",
    ]);

    expect(element.innerHTML).toBe("<button>Increment 0</button>");

    element.isConnected = true;
    await element.increment();

    expect(lifecycle).toEqual([
      "connectedCallback",
      "willPaint",
      "component",
      "didPaint",
      "increment",
      "willPaint",
      "component",
      "didPaint",
    ]);

    expect(element.innerHTML).toBe("<button>Increment 1</button>");
  });
});
