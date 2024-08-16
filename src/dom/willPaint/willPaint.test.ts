import { beforeEach, describe, expect, it } from "bun:test";
import paint from "../paint";
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
    prepareRender() {
      lifecycle.push("prepareRender");
      return this;
    }
  }

  beforeEach(() => {
    element = new Element();
    lifecycle = []; // Inicializa o lifecycle como uma lista vazia
  });

  it("Inicializa o lifecycle como uma lista vazia", () => {
    // Verifica que o lifecycle está vazio após a inicialização
    expect(lifecycle).toEqual([]);
  });

  it("Preenche o lifecycle corretamente durante o ciclo de vida do componente", async () => {
    // Executa o connectedCallback, que deve acionar o ciclo de vida completo
    await element.connectedCallback();

    // Verifica se o lifecycle foi preenchido corretamente
    expect(lifecycle).toEqual([
      "connectedCallback", // O connectedCallback é chamado primeiro
      "prepareRender", // Em seguida, o método decorado por @willPaint é chamado
      "component", // Finalmente, o componente é renderizado
    ]);
  });
});
