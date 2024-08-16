import { beforeEach, describe, expect, it } from "bun:test";
import adopted from "./adopted";

describe("adopted", () => {
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

  it("Deve manter a sequência correta de execução ao chamar adoptedCallback várias vezes", async () => {
    await element.adoptedCallback();
    await element.adoptedCallback();
    expect(lifeCycle).toEqual([
      "adoptedCallback",
      "handleAdoption",
      "adoptedCallback",
      "handleAdoption",
    ]);
  });

  it("Deve executar o método decorado apenas após a primeira chamada de adoptedCallback", async () => {
    await element.adoptedCallback();
    expect(lifeCycle).toEqual(["adoptedCallback", "handleAdoption"]);

    // Resetando o ciclo de vida para testar uma segunda chamada sem efeitos adicionais
    lifeCycle = [];
    expect(lifeCycle).toEqual([]);

    // Chamar handleAdoption diretamente não deve afetar o ciclo de vida
    await element.handleAdoption();
    expect(lifeCycle).toEqual(["handleAdoption"]);
  });

  it("Não deve adicionar duplicatas no ciclo de vida ao chamar handleAdoption diretamente", async () => {
    await element.handleAdoption();
    expect(lifeCycle).toEqual(["handleAdoption"]);

    await element.adoptedCallback();
    expect(lifeCycle).toEqual([
      "handleAdoption",
      "adoptedCallback",
      "handleAdoption",
    ]);
  });
});
