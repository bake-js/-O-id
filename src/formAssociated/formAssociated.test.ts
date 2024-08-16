import { beforeEach, describe, expect, it } from "bun:test";
import formAssociated from "./formAssociated";

describe("formAssociated", () => {
  let element: Element;
  let form: { [key: string]: any };
  let lifecycle: string[];

  class Element {
    @formAssociated
    handleFormAssociation(form) {
      lifecycle.push("handleFormAssociation");
      this.form = form;
    }

    form: any = null;

    // Simulando a chamada do método quando o componente é associado a um formulário
    formAssociatedCallback(form: any) {
      this.handleFormAssociation(form);
    }
  }

  beforeEach(() => {
    element = new Element();
    form = {}; // Simulando um formulário como um objeto simples
    lifecycle = [];
  });

  it("Deve executar o método decorado @formAssociated quando o componente é associado a um formulário", () => {
    element.formAssociatedCallback(form);
    expect(lifecycle).toEqual(["handleFormAssociation"]);
    expect(element.form).toBe(form);
  });

  it("Não deve executar o método decorado se formAssociatedCallback não for chamado", () => {
    expect(lifecycle).toEqual([]);
    expect(element.form).toBe(null);
  });

  it("Deve permitir a associação a múltiplos formulários", () => {
    const form2 = {}; // Simulando um segundo formulário como um objeto simples
    element.formAssociatedCallback(form);
    element.formAssociatedCallback(form2);
    expect(lifecycle).toEqual([
      "handleFormAssociation",
      "handleFormAssociation",
    ]);
    expect(element.form).toBe(form2); // O último formulário associado deve ser o atual
  });

  it("Garante que o método decorado @formAssociated seja chamado corretamente após uma alteração de estado", () => {
    element.formAssociatedCallback(form);
    lifecycle = []; // Resetando o ciclo de vida para a segunda verificação

    // Simulando uma mudança de estado
    element.handleFormAssociation(form);
    element.formAssociatedCallback(form);

    expect(lifecycle).toEqual([
      "handleFormAssociation",
      "handleFormAssociation",
    ]);
  });
});
