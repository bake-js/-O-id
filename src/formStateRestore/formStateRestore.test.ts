import { beforeEach, describe, expect, it } from "bun:test";
import formStateRestore from "./formStateRestore";

describe("formStateRestore", () => {
  let element: Element;
  let lifecycle: string[];

  class Element {
    @formStateRestore
    handleFormStateRestore(state, mode) {
      lifecycle.push(`handleFormStateRestore:${mode}:${state.key}`);
    }

    formStateRestoreCallback(state: any, mode: "restore" | "autocomplete") {
      lifecycle.push(`formStateRestoreCallback:${mode}:${state.key}`);
    }
  }

  beforeEach(() => {
    element = new Element();
    lifecycle = [];
  });

  it("Deve executar o método decorado @formStateRestore após a chamada de formStateRestoreCallback", async () => {
    const state = { key: "value" };
    const mode = "restore";

    await element.formStateRestoreCallback(state, mode);

    expect(lifecycle).toEqual([
      `formStateRestoreCallback:${mode}:${state.key}`,
      `handleFormStateRestore:${mode}:${state.key}`,
    ]);
  });

  it("Não deve executar o método decorado se formStateRestoreCallback não for chamado", () => {
    expect(lifecycle).toEqual([]);
  });

  it("Executa o método decorado @formStateRestore apenas uma vez quando formStateRestoreCallback é chamado múltiplas vezes", async () => {
    const state = { key: "value" };
    const mode = "restore";

    await element.formStateRestoreCallback(state, mode);
    await element.formStateRestoreCallback(state, mode); // Chamada múltipla

    expect(lifecycle).toEqual([
      `formStateRestoreCallback:${mode}:${state.key}`,
      `handleFormStateRestore:${mode}:${state.key}`,
      `formStateRestoreCallback:${mode}:${state.key}`,
      `handleFormStateRestore:${mode}:${state.key}`,
    ]);
  });

  it("Garante que o método decorado @formStateRestore seja chamado corretamente após uma alteração de estado", async () => {
    const state = { key: "value" };
    const mode = "restore";

    await element.formStateRestoreCallback(state, mode);

    expect(lifecycle).toEqual([
      `formStateRestoreCallback:${mode}:${state.key}`,
      `handleFormStateRestore:${mode}:${state.key}`,
    ]);

    lifecycle = []; // Resetando o ciclo de vida para a segunda verificação

    // Simulando uma alteração de estado
    const newState = { key: "newValue" };
    const newMode = "autocomplete";

    await element.formStateRestoreCallback(newState, newMode);

    expect(lifecycle).toEqual([
      `formStateRestoreCallback:${newMode}:${newState.key}`,
      `handleFormStateRestore:${newMode}:${newState.key}`,
    ]);
  });

  it("Não deve adicionar duplicatas no ciclo de vida ao chamar handleFormStateRestore diretamente", async () => {
    const state = { key: "value" };
    const mode = "restore";

    await element.handleFormStateRestore(state, mode);

    expect(lifecycle).toEqual([`handleFormStateRestore:${mode}:${state.key}`]);

    await element.formStateRestoreCallback(state, mode);

    expect(lifecycle).toEqual([
      `handleFormStateRestore:${mode}:${state.key}`,
      `formStateRestoreCallback:${mode}:${state.key}`,
      `handleFormStateRestore:${mode}:${state.key}`,
    ]);
  });
});
