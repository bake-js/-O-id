import { beforeEach, describe, expect, it, vi } from "vitest";
import value from "../value";

describe("value", () => {
  let mockEvent: any;

  beforeEach(() => {
    // Cria um mock para o evento
    mockEvent = {
      target: {
        value: "mockValue", // Define um valor mock para o campo de entrada
      },
    };
  });

  it("Deve retornar o valor do campo de entrada", () => {
    const result = value(mockEvent);
    expect(result).toBe("mockValue");
  });

  it("Deve retornar undefined se o campo de entrada não estiver presente", () => {
    // Remove o campo de entrada do mock
    mockEvent.target = {};
    const result = value(mockEvent);
    expect(result).toBeUndefined();
  });
});
