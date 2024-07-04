import { beforeEach, describe, expect, it, mock } from "bun:test";
import define from "./define";

describe("define", () => {
  beforeEach(() => {
    customElements.define = mock(() => {});
  });

  it("Registra o custom element com o name passado na execucao do decorator", () => {
    @define("element-counter")
    class Element {}

    expect(customElements.define).toHaveBeenCalledWith(
      "element-counter",
      Element,
      undefined,
    );
  });
});
