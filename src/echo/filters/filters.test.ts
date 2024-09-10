import { describe, expect, it } from "vitest";
import filters from "./filters";

describe("filters.prop", () => {
  const user = {
    name: "Alice",
    address: {
      city: "Wonderland",
      country: "Fantasy Land",
    },
    friends: ["Bob", "Charlie"],
    getLocation: function () {
      return this.address.city;
    },
  };

  it("Deve acessar uma propriedade simples do objeto", () => {
    const result = filters.prop(user, "name");
    expect(result).toBe("Alice");
  });

  it("Deve acessar uma propriedade aninhada do objeto", () => {
    const result = filters.prop(user, "address.city");
    expect(result).toBe("Wonderland");
  });

  it("Deve acessar uma propriedade usando notação de colchetes", () => {
    const result = filters.prop(user, "address['country']");
    expect(result).toBe("Fantasy Land");
  });

  it("Deve retornar undefined para uma propriedade inexistente", () => {
    const result = filters.prop(user, "address.postalCode");
    expect(result).toBeUndefined();
  });

  it("Deve retornar undefined para um caminho de propriedade inválido", () => {
    const result = filters.prop(user, "address..city");
    expect(result).toBeUndefined();
  });

  it("Deve acessar uma propriedade em um array", () => {
    const result = filters.prop(user, "friends[0]");
    expect(result).toBe("Bob");
  });

  it("Deve acessar uma função e retornar o valor correto", () => {
    const result = filters.prop(user, "getLocation");
    expect(result.call(user)).toBe("Wonderland");
  });
});
