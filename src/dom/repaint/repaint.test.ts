import { beforeEach, describe, expect, it } from "vitest";
import {
  connectedCallback,
  didPaintCallback,
  willPaintCallback,
} from "../interfaces";
import paint from "../paint";
import repaint from "./repaint";

describe("repaint", () => {
  describe("method", () => {
    let element: Element;
    let lifecycle: string[];

    function style() {
      lifecycle.push("style");
      return "button { color: red; }";
    }

    function component(self: any) {
      lifecycle.push("component");
      return `<button>Increment ${self.number}</button>`;
    }

    @paint(component, style)
    class Element {
      #number: number;

      get number(): number {
        return this.#number ?? 0;
      }

      set number(value: number) {
        this.#number = value;
      }

      [connectedCallback]() {
        lifecycle.push("connectedCallback");
        return this;
      }

      @repaint
      increment() {
        lifecycle.push("increment");
        this.number += 1;
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

    it("Re-executa o paint e o ciclo de vida ao executar o método decorado com repaint", async () => {
      expect(element.innerHTML).toBeUndefined();
      expect(element.isPainted).toBeFalsy();

      await element[connectedCallback]();

      expect(lifecycle).toEqual([
        "connectedCallback",
        "willPaintCallback",
        "style",
        "component",
        "didPaintCallback",
      ]);

      expect(element.innerHTML).toBe("<button>Increment 0</button>");
      expect(element.isPainted).toBeTruthy();

      await element.increment();

      expect(lifecycle).toEqual([
        "connectedCallback",
        "willPaintCallback",
        "style",
        "component",
        "didPaintCallback",
        "increment",
        "willPaintCallback",
        "style",
        "component",
        "didPaintCallback",
      ]);

      expect(element.innerHTML).toBe("<button>Increment 1</button>");
      expect(element.isPainted).toBeTruthy();
    });
  });

  describe("setter", () => {
    let element: Element;
    let lifecycle: string[];

    function style() {
      lifecycle.push("style");
      return "button { color: red; }";
    }

    function component(self: any) {
      lifecycle.push("component");
      return `<button>Increment ${self.number}</button>`;
    }

    @paint(component, style)
    class Element {
      #number: number;

      get number(): number {
        return this.#number ?? 0;
      }

      @repaint
      set number(value: number) {
        this.#number = value;
      }

      [connectedCallback]() {
        lifecycle.push("connectedCallback");
        return this;
      }

      async increment() {
        lifecycle.push("increment");
        await (this.number += 1);
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

    it("Re-executa o ciclo de vida do paint ao alterar o número e chamar repaint", async () => {
      expect(element.innerHTML).toBeUndefined();
      expect(element.isPainted).toBeFalsy();

      await element[connectedCallback]();

      expect(lifecycle).toEqual([
        "connectedCallback",
        "willPaintCallback",
        "style",
        "component",
        "didPaintCallback",
      ]);

      expect(element.innerHTML).toBe("<button>Increment 0</button>");
      expect(element.isPainted).toBeTruthy();

      element.increment();

      // hack para esperar a execucao do repaint sobre o setter number
      await new Promise((resolve) => setTimeout(resolve), 100);

      expect(lifecycle).toEqual([
        "connectedCallback",
        "willPaintCallback",
        "style",
        "component",
        "didPaintCallback",
        "increment",
        "willPaintCallback",
        "style",
        "component",
        "didPaintCallback",
      ]);

      expect(element.innerHTML).toBe("<button>Increment 1</button>");
      expect(element.isPainted).toBeTruthy();
    });
  });
});
