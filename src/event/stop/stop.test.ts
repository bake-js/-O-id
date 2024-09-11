import { beforeEach, describe, expect, it, vi } from "vitest";
import stop from "../stop";

describe("stop", () => {
  let mockEvent: any;

  beforeEach(() => {
    // Cria um mock para o evento
    mockEvent = {
      stopPropagation: vi.fn(), // Função mock para stopPropagation
    };
  });

  it("Deve chamar stopPropagation no evento", () => {
    stop(mockEvent);
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });

  it("Deve retornar o evento após chamar stopPropagation", () => {
    const result = stop(mockEvent);
    expect(result).toBe(mockEvent);
  });
});
