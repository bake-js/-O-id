import { beforeEach, describe, expect, it } from "bun:test";
import disconnected from "./disconnected";

describe("disconnected", () => {
  let element: Element;
  let lifecycle: string[];

  class Element {
    disconnectedCallback() {
      lifecycle.push("disconnectedCallback");
      return this;
    }

    @disconnected
    teardown(value, oldValue) {
      lifecycle.push("teardown");
      return this;
    }
  }

  beforeEach(() => {
    element = new Element();
    lifecycle = [];
  });

  it("Deve executar o método decorado @disconnected após a chamada de disconnectedCallback", async () => {
    await element.disconnectedCallback();
    expect(lifecycle).toEqual(["disconnectedCallback", "teardown"]);
  });

  it("Não deve executar o método decorado se disconnectedCallback não for chamado", () => {
    expect(lifecycle).toEqual([]);
  });

  it("Executa o método decorado @disconnected apenas uma vez quando disconnectedCallback é chamado múltiplas vezes", async () => {
    await element.disconnectedCallback();
    await element.disconnectedCallback();

    expect(lifecycle).toEqual([
      "disconnectedCallback",
      "teardown",
      "disconnectedCallback",
      "teardown",
    ]);
  });

  it("Garante que o método decorado @disconnected seja chamado mesmo quando disconnectedCallback é chamado após uma alteração no estado", async () => {
    await element.disconnectedCallback();
    lifecycle = []; // Resetando o ciclo de vida para a segunda verificação

    // Simulando uma mudança de estado
    element.teardown("newValue", "oldValue");
    await element.disconnectedCallback();

    expect(lifecycle).toEqual(["teardown", "disconnectedCallback", "teardown"]);
  });

  it("Não deve adicionar duplicatas no ciclo de vida ao chamar teardown diretamente", async () => {
    await element.teardown("newValue", "oldValue");
    expect(lifecycle).toEqual(["teardown"]);

    await element.disconnectedCallback();
    expect(lifecycle).toEqual(["teardown", "disconnectedCallback", "teardown"]);
  });
});
