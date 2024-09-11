import { beforeEach, describe, expect, it, vi } from "vitest";
import prevent from "../prevent";

describe("prevent", () => {
  let mockEvent: any;

  beforeEach(() => {
    // Cria um mock para o evento
    mockEvent = {
      preventDefault: vi.fn(), // Função mock para preventDefault
    };
  });

  it("Deve chamar preventDefault no evento", () => {
    prevent(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it("Deve retornar o evento apos chamar preventDefault", () => {
    const result = prevent(mockEvent);
    expect(result).toBe(mockEvent);
  });
});
