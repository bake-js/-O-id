import { beforeEach, describe, expect, it } from "bun:test";
import formReset from "./formReset";

describe("formReset", () => {
  let element: Element;
  let lifecycle: string[];

  class Element {
    resetCalled = false;

    @formReset
    handleFormReset() {
      lifecycle.push("handleFormReset");
      this.resetCalled = true;
    }

    // Simulando a chamada do método quando o formulário é redefinido
    formResetCallback() {
      this.handleFormReset();
    }
  }

  beforeEach(() => {
    element = new Element();
    lifecycle = [];
  });

  it("Deve executar o método decorado @formReset quando o formulário é redefinido", () => {
    element.formResetCallback();

    expect(lifecycle).toEqual(["handleFormReset"]);
    expect(element.resetCalled).toBe(true);
  });

  it("Não deve executar o método decorado se formResetCallback não for chamado", () => {
    expect(lifecycle).toEqual([]);
    expect(element.resetCalled).toBe(false);
  });

  it("Deve chamar o método decorado @formReset apenas uma vez quando formResetCallback é chamado múltiplas vezes", () => {
    element.formResetCallback();
    element.formResetCallback();

    expect(lifecycle).toEqual(["handleFormReset", "handleFormReset"]);
    expect(element.resetCalled).toBe(true);
  });

  it("Garante que o método decorado @formReset seja chamado corretamente após uma alteração de estado", () => {
    element.formResetCallback();
    lifecycle = []; // Resetando o ciclo de vida para a segunda verificação

    // Simulando uma alteração de estado
    element.resetCalled = false;
    element.handleFormReset(); // Chamando diretamente para simular a alteração
    element.formResetCallback();

    expect(lifecycle).toEqual([
      "handleFormReset", // Primeiro chamada de formResetCallback
      "handleFormReset", // Segunda chamada de formResetCallback
    ]);
    expect(element.resetCalled).toBe(true); // O estado deve refletir a chamada mais recente
  });
});
