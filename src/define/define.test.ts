import { beforeEach, describe, expect, it, vi } from "vitest";
import define from "./define";

describe("define", () => {
  beforeEach(() => {
    customElements.define = vi.fn(() => {});
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
