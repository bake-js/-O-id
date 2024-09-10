import { beforeEach, describe, expect, it } from "vitest";
import attributeChanged from "./attributeChanged";

describe("attributeChanged", () => {
  describe("method", () => {
    let element: Element;
    let lifecycle: string[];

    class Element {
      #id: string;

      get id() {
        return (this.#id ??= "");
      }

      @attributeChanged("id")
      set id(value: string) {
        this.#id = value;
      }

      attributeChangedCallback(name, oldValue, newValue) {
        lifecycle.push(
          `attributeChangedCallback -> ${name}, ${oldValue}, ${newValue}`,
        );
        return this;
      }

      @attributeChanged("value")
      updateOnAttributeChange(value, oldValue) {
        lifecycle.push(`attributeChanged -> ${value}, ${oldValue}`);
        return this;
      }
    }

    beforeEach(() => {
      element = new Element();
      lifecycle = [];
    });

    it("Executa o método decorado somente quando o atributo for o mesmo mencionado", async () => {
      await element.attributeChangedCallback("name", "a", "b");
      await element.attributeChangedCallback("value", "0", "1");

      expect(lifecycle).toEqual([
        "attributeChangedCallback -> name, a, b",
        "attributeChangedCallback -> value, 0, 1",
        "attributeChanged -> 1, 0",
      ]);
    });

    it("Não executa o método decorado se o atributo não for mencionado", async () => {
      await element.attributeChangedCallback("name", "a", "b");
      await element.attributeChangedCallback("anotherAttribute", "old", "new");

      expect(lifecycle).toEqual([
        "attributeChangedCallback -> name, a, b",
        "attributeChangedCallback -> anotherAttribute, old, new",
      ]);
    });

    it("Executa o método decorado mesmo quando o valor antigo é undefined", async () => {
      await element.attributeChangedCallback("value", undefined, "new");

      expect(lifecycle).toEqual([
        "attributeChangedCallback -> value, undefined, new",
        "attributeChanged -> new, undefined",
      ]);
    });

    it("Mantém a ordem de execução quando múltiplos atributos são alterados", async () => {
      await element.attributeChangedCallback("value", "0", "1");
      await element.attributeChangedCallback("anotherAttribute", "old", "new");
      await element.attributeChangedCallback("value", "1", "2");

      expect(lifecycle).toEqual([
        "attributeChangedCallback -> value, 0, 1",
        "attributeChanged -> 1, 0",
        "attributeChangedCallback -> anotherAttribute, old, new",
        "attributeChangedCallback -> value, 1, 2",
        "attributeChanged -> 2, 1",
      ]);
    });

    it("Não executa o método decorado se o novo valor for o mesmo que o antigo", async () => {
      await element.attributeChangedCallback("value", "same", "same");

      expect(lifecycle).toEqual([
        "attributeChangedCallback -> value, same, same",
      ]);
    });

    it("Não executa o método decorado se o attributeChangedCallback não for chamado", () => {
      // Não chamamos attributeChangedCallback
      expect(lifecycle).toEqual([]);
    });
  });

  describe("setter", () => {
    let element: Element;
    let lifecycle: string[];

    class Element {
      #value: string;

      get value() {
        return (this.#value ??= "");
      }

      @attributeChanged("value")
      set value(value: string) {
        lifecycle.push(`setter -> value, ${value}`);
        this.#value = value;
      }

      attributeChangedCallback(name, oldValue, newValue) {
        lifecycle.push(
          `attributeChangedCallback -> ${name}, ${oldValue}, ${newValue}`,
        );
        return this;
      }
    }

    beforeEach(() => {
      element = new Element();
      lifecycle = [];
    });

    it("Executa o método decorado somente quando o atributo for o mesmo mencionado", async () => {
      await element.attributeChangedCallback("name", "a", "b");
      await element.attributeChangedCallback("value", "0", "1");

      expect(lifecycle).toEqual([
        "attributeChangedCallback -> name, a, b",
        "attributeChangedCallback -> value, 0, 1",
        "setter -> value, 1",
      ]);
    });

    it("Não executa o método decorado se o atributo não for mencionado", async () => {
      await element.attributeChangedCallback("name", "a", "b");
      await element.attributeChangedCallback("anotherAttribute", "old", "new");

      expect(lifecycle).toEqual([
        "attributeChangedCallback -> name, a, b",
        "attributeChangedCallback -> anotherAttribute, old, new",
      ]);
    });

    it("Executa o método decorado mesmo quando o valor antigo é undefined", async () => {
      await element.attributeChangedCallback("value", undefined, "new");

      expect(lifecycle).toEqual([
        "attributeChangedCallback -> value, undefined, new",
        "setter -> value, new",
      ]);
    });

    it("Mantém a ordem de execução quando múltiplos atributos são alterados", async () => {
      await element.attributeChangedCallback("value", "0", "1");
      await element.attributeChangedCallback("anotherAttribute", "old", "new");
      await element.attributeChangedCallback("value", "1", "2");

      expect(lifecycle).toEqual([
        "attributeChangedCallback -> value, 0, 1",
        "setter -> value, 1",
        "attributeChangedCallback -> anotherAttribute, old, new",
        "attributeChangedCallback -> value, 1, 2",
        "setter -> value, 2",
      ]);
    });

    it("Não executa o método decorado se o novo valor for o mesmo que o antigo", async () => {
      await element.attributeChangedCallback("value", "same", "same");

      expect(lifecycle).toEqual([
        "attributeChangedCallback -> value, same, same",
      ]);
    });

    it("Não executa o método decorado se o attributeChangedCallback não for chamado", () => {
      // Não chamamos attributeChangedCallback
      expect(lifecycle).toEqual([]);
    });
  });
});
