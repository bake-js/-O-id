import { beforeEach, describe, expect, it } from "vitest";
import formReset from "./formReset";

describe("formResetCallback", () => {
  let element: Element;
  let lifecycle: string[];

  class Element {
    formResetCallback() {
      lifecycle.push("formResetCallback");
      return this;
    }

    @formReset
    handleFormReset() {
      lifecycle.push("handleFormReset");
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
