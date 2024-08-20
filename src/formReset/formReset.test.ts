import { beforeEach, describe, expect, it } from "bun:test";
import formReset from "./formReset";

describe("formReset", () => {
  let element: Element;
  let lifecycle: string[];

  class Element {
    @formReset
    handleFormReset() {
      lifecycle.push("handleFormReset");
      return this;
    }

    // Simulando a chamada do método quando o formulário é redefinido
    formResetCallback() {
      lifecycle.push("formResetCallback");
      return this;
    }
  }

  beforeEach(() => {
    element = new Element();
    lifecycle = [];
  });

  it("Deve executar o método decorado @formReset quando o formulário é redefinido", async () => {
    await element.formResetCallback();
    expect(lifecycle).toEqual(["formResetCallback", "handleFormReset"]);
  });

  it("Não deve executar o método decorado se formResetCallback não for chamado", () => {
    expect(lifecycle).toEqual([]);
  });
});
