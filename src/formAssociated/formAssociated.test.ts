import { beforeEach, describe, expect, it } from "vitest";
import formAssociated from "./formAssociated";

describe("formAssociatedCallback", () => {
  let element: Element;
  let lifecycle: string[];

  class Element {
    form: any = null;

    formAssociatedCallback(form) {
      lifecycle.push("formAssociatedCallback");
      return this;
    }

    @formAssociated
    handleFormAssociation(form) {
      lifecycle.push("handleFormAssociation");
      this.form = form;
      return this;
    }
  }

  beforeEach(() => {
    element = new Element();
    lifecycle = [];
  });

  it("Deve executar o método decorado @formAssociated quando o componente é associado a um formulário", async () => {
    const form = {};
    await element.formAssociatedCallback(form);
    expect(lifecycle).toEqual([
      "formAssociatedCallback",
      "handleFormAssociation",
    ]);
    expect(element.form).toBe(form);
  });

  it("Não deve executar o método decorado se formAssociatedCallback não for chamado", () => {
    expect(lifecycle).toEqual([]);
    expect(element.form).toBe(null);
  });
});
