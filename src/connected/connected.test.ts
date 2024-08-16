import { beforeEach, describe, expect, it } from "bun:test";
import connected from "./connected";

describe("connected", () => {
  let element: Element;
  let lifecycle: string[];

  class Element {
    connectedCallback() {
      lifecycle.push("connectedCallback");
      return this;
    }

    @connected
    setup(value, oldValue) {
      lifecycle.push("setup");
      return this;
    }
  }

  beforeEach(() => {
    element = new Element();
    lifecycle = [];
  });

  it("Deve executar o método decorado @connected após a chamada de connectedCallback", async () => {
    await element.connectedCallback();
    expect(lifecycle).toEqual(["connectedCallback", "setup"]);
  });

  it("Não deve executar o método decorado se connectedCallback não for chamado", () => {
    expect(lifecycle).toEqual([]);
  });

  it("Executa o método decorado @connected apenas uma vez quando connectedCallback é chamado múltiplas vezes", async () => {
    await element.connectedCallback();
    await element.connectedCallback();

    expect(lifecycle).toEqual([
      "connectedCallback",
      "setup",
      "connectedCallback",
      "setup",
    ]);
  });

  it("Garante que o método decorado @connected seja chamado mesmo quando connectedCallback é chamado após uma alteração no estado", async () => {
    await element.connectedCallback();
    lifecycle = []; // Resetando o ciclo de vida para a segunda verificação

    // Simulando uma mudança de estado
    element.setup("newValue", "oldValue");
    await element.connectedCallback();

    expect(lifecycle).toEqual(["setup", "connectedCallback", "setup"]);
  });

  it("Não deve adicionar duplicatas no ciclo de vida ao chamar setup diretamente", async () => {
    await element.setup("newValue", "oldValue");
    expect(lifecycle).toEqual(["setup"]);

    await element.connectedCallback();
    expect(lifecycle).toEqual(["setup", "connectedCallback", "setup"]);
  });
});
