import { beforeEach, describe, expect, it } from "vitest";
import formStateRestore from "./formStateRestore";

describe("formStateRestoreCallback", () => {
  let element: Element;
  let lifecycle: string[];

  class Element {
    formStateRestoreCallback(state: any, mode: "restore" | "autocomplete") {
      lifecycle.push(`formStateRestoreCallback:${mode}:${state.key}`);
      return this;
    }

    @formStateRestore
    handleFormStateRestore(state, mode) {
      lifecycle.push(`handleFormStateRestore:${mode}:${state.key}`);
      return this;
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
});
