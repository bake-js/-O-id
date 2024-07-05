import { beforeEach, describe, expect, it } from "bun:test";
import attributeChanged from "./attributeChanged";

describe("attributeChanged", () => {
  let element: Element;
  let lifecycle: string[];

  class Element {
    attributeChangedCallback(name, oldValue, newValue) {
      lifecycle.push(
        `attributeChangedCallback -> ${name}, ${oldValue}, ${newValue}`,
      );
      return this;
    }

    @attributeChanged("value")
    changeValue(value, oldValue) {
      lifecycle.push(`attributeChanged -> ${value}, ${oldValue}`);
      return this;
    }
  }

  beforeEach(() => {
    element = new Element();
    lifecycle = [];
  });

  it("Executa o metodo decorado somente quando o atributo for o mesmo mencionado", async () => {
    await element.attributeChangedCallback("name", "a", "b");
    await element.attributeChangedCallback("value", "0", "1");

    expect(lifecycle).toEqual([
      "attributeChangedCallback -> name, a, b",
      "attributeChangedCallback -> value, 0, 1",
      "attributeChanged -> 1, 0",
    ]);
  });
});
