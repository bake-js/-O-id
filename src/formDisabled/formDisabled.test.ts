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
    }

    // Simulando a chamada do método quando o estado de desativação do componente muda
    formDisabledCallback(disabled: boolean) {
      this.handleFormDisabled(disabled);
    }
  }

  beforeEach(() => {
    element = new Element();
    lifecycle = [];
  });

  it("Deve executar o método decorado @formDisabled quando o estado de desativação do componente muda para verdadeiro", () => {
    element.formDisabledCallback(true);

    expect(lifecycle).toEqual(["handleFormDisabled:true"]);
    expect(element.disabled).toBe(true);
  });

  it("Deve executar o método decorado @formDisabled quando o estado de desativação do componente muda para falso", () => {
    element.formDisabledCallback(false);

    expect(lifecycle).toEqual(["handleFormDisabled:false"]);
    expect(element.disabled).toBe(false);
  });

  it("Deve permitir a alteração do estado de desativação múltiplas vezes", () => {
    element.formDisabledCallback(true);
    element.formDisabledCallback(false);

    expect(lifecycle).toEqual([
      "handleFormDisabled:true",
      "handleFormDisabled:false",
    ]);
    expect(element.disabled).toBe(false); // O último estado deve ser o atual
  });

  it("Não deve adicionar duplicatas no ciclo de vida ao chamar handleFormDisabled diretamente", () => {
    element.handleFormDisabled(true);
    expect(lifecycle).toEqual(["handleFormDisabled:true"]);

    element.formDisabledCallback(false);
    expect(lifecycle).toEqual([
      "handleFormDisabled:true",
      "handleFormDisabled:false",
    ]);
  });

  it("Garante que o método decorado @formDisabled seja chamado corretamente após uma alteração de estado", () => {
    element.formDisabledCallback(true);
    lifecycle = []; // Resetando o ciclo de vida para a segunda verificação

    // Simulando uma mudança de estado
    element.handleFormDisabled(false);
    element.formDisabledCallback(true);

    expect(lifecycle).toEqual([
      "handleFormDisabled:false",
      "handleFormDisabled:true",
    ]);
  });
});
