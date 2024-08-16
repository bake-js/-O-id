import { beforeEach, describe, expect, it, mock } from "bun:test";
import define from "./define";

describe("define", () => {
  beforeEach(() => {
    customElements.define = mock(() => {});
  });

  it("Registra o custom element com o name passado na execução do decorator", () => {
    @define("element-counter")
    class Element {}

    expect(customElements.define).toHaveBeenCalledWith(
      "element-counter",
      Element,
      undefined,
    );
  });

  it("Deve registrar múltiplos custom elements corretamente", () => {
    @define("element-one")
    class ElementOne {}

    expect(customElements.define).toHaveBeenCalledWith(
      "element-one",
      ElementOne,
      undefined,
    );

    @define("element-two")
    class ElementTwo {}

    expect(customElements.define).toHaveBeenCalledWith(
      "element-two",
      ElementTwo,
      undefined,
    );
  });

  it("Deve permitir a configuração de um terceiro parâmetro ao registrar o custom element", () => {
    const options = { extends: "button" };

    @define("custom-button", options)
    class CustomButton {}

    expect(customElements.define).toHaveBeenCalledWith(
      "custom-button",
      CustomButton,
      options,
    );
  });
});
