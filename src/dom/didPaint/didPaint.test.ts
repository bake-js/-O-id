import { beforeEach, describe, expect, it } from "bun:test";
import paint from "../paint";
import didPaint from "./didPaint";

describe("didPaint", () => {
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
    onRendered() {
      lifecycle.push("onRendered");
      return this;
    }
  }

  beforeEach(() => {
    element = new Element();
    lifecycle = [];
  });

  it("Executa o ciclo de vida do componente após o evento connectedCallback", async () => {
    await element.connectedCallback();
    expect(lifecycle).toEqual(["connectedCallback", "component", "onRendered"]);
  });

  it("Não executa o ciclo de vida de didPaint se connectedCallback não for chamado", () => {
    expect(lifecycle).toEqual([]);
  });

  it("Executa o ciclo de vida de didPaint uma vez para cada chamada de connectedCallback", async () => {
    await element.connectedCallback();
    await element.connectedCallback();

    expect(lifecycle).toEqual([
      "connectedCallback",
      "component",
      "onRendered",
      "connectedCallback",
      "component",
      "onRendered",
    ]);
  });

  it("Garante que onRendered não seja chamado antes de component", async () => {
    await element.connectedCallback();

    const componentIndex = lifecycle.indexOf("component");
    const onRenderedIndex = lifecycle.indexOf("onRendered");

    expect(componentIndex).toBeLessThan(onRenderedIndex);
  });

  it("Garante que métodos decorados não interfiram em chamadas subsequentes", async () => {
    await element.connectedCallback();
    lifecycle = []; // Resetando o ciclo de vida para uma nova verificação

    await element.connectedCallback();
    expect(lifecycle).toEqual(["connectedCallback", "component", "onRendered"]);
  });
});
