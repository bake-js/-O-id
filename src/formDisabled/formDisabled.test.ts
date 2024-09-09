import { beforeEach, describe, expect, it } from "vitest";
import formDisabled from "./formDisabled";

describe("formDisabledCallback", () => {
  let element: Element;
  let lifecycle: string[];

  class Element {
    disabled: boolean | null = null;

    formDisabledCallback(disabled: boolean) {
      lifecycle.push(`formDisabledCallback:${disabled}`);
      return this;
    }

    @formDisabled
    handleFormDisabled(disabled) {
      lifecycle.push(`handleFormDisabled:${disabled}`);
      this.disabled = disabled;
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
