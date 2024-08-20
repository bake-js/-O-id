import { beforeEach, describe, expect, it } from "bun:test";
import formDisabled from "./formDisabled";

describe("formDisabled", () => {
  let element: Element;
  let lifecycle: string[];

  class Element {
    disabled: boolean | null = null;

    @formDisabled
    handleFormDisabled(disabled) {
      lifecycle.push(`handleFormDisabled:${disabled}`);
      this.disabled = disabled;
      return this;
    }

    // Simulando a chamada do método quando o estado de desativação do componente muda
    formDisabledCallback(disabled: boolean) {
      lifecycle.push(`formDisabledCallback:${disabled}`);
      return this;
    }
  }

  beforeEach(() => {
    element = new Element();
    lifecycle = [];
  });

  it("Deve executar o método decorado @formDisabled quando o estado de desativação do componente muda para verdadeiro", async () => {
    await element.formDisabledCallback(true);
    expect(lifecycle).toEqual([
      "formDisabledCallback:true",
      "handleFormDisabled:true",
    ]);
    expect(element.disabled).toBe(true);
  });

  it("Não deve executar o método decorado se formDisabledCallback não for chamado", () => {
    expect(lifecycle).toEqual([]);
    expect(element.disabled).toBe(null);
  });
});
