import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { attributeChangedCallback, disconnectedCallback } from "../interfaces";
import Echo from "./echo";

describe("Echo", () => {
  describe("setter", () => {
    let publisher: Publisher;
    let subscriber: Subscriber;
    let event: CustomEvent;
    let lifeCycle: string[];

    class Element {
      dispatchEvent(event) {
        lifeCycle.push(`dispatchEvent -> ${event.type}`);
        return this;
      }
    }

    class Publisher extends Echo(Element) {
      click() {
        lifeCycle.push("click");
        this.dispatchEvent(event);
        return this;
      }

      getAttribute(id) {
        lifeCycle.push(`getAttribute -> ${id}`);
        return "publisher";
      }
    }

    class Subscriber extends Echo(Element) {
      #value;

      set value(value) {
        lifeCycle.push(`setter -> ${value}`);
        this.#value = value;
      }
    }

    beforeEach(() => {
      publisher = new Publisher();
      subscriber = new Subscriber();
      event = new CustomEvent("clicked", { detail: "1234567890" });
      lifeCycle = [];
    });

    it("deve atualizar o valor no Subscriber ao despachar o evento 'clicked' pelo Publisher", async () => {
      subscriber[attributeChangedCallback](
        "on",
        "",
        "publisher/clicked:setter/value",
      );

      publisher.click();

      await new Promise((resolve) => setTimeout(resolve), 100);

      expect(lifeCycle).toEqual([
        "click",
        "dispatchEvent -> clicked",
        "getAttribute -> id",
        "setter -> 1234567890",
      ]);
    });
  });

  describe("attribute", () => {
    let publisher: Publisher;
    let subscriber: Subscriber;
    let event: CustomEvent;
    let lifeCycle: string[];

    class Element {
      dispatchEvent(event) {
        lifeCycle.push(`dispatchEvent -> ${event.type}`);
        return this;
      }
    }

    class Publisher extends Echo(Element) {
      click() {
        lifeCycle.push("click");
        this.dispatchEvent(event);
        return this;
      }

      getAttribute(id) {
        lifeCycle.push(`getAttribute -> ${id}`);
        return "publisher";
      }
    }

    class Subscriber extends Echo(Element) {
      #value;

      setAttribute(name, value) {
        lifeCycle.push(`setAttribute -> ${name}, ${value}`);
        this.#value = value;
      }
    }

    beforeEach(() => {
      publisher = new Publisher();
      subscriber = new Subscriber();
      event = new CustomEvent("clicked", { detail: "1234567890" });
      lifeCycle = [];
    });

    it("deve atualizar o atributo no Subscriber quando o evento 'clicked' é despachado pelo Publisher", async () => {
      subscriber[attributeChangedCallback](
        "on",
        "",
        "publisher/clicked:attribute/value",
      );

      publisher.click();

      await new Promise((resolve) => setTimeout(resolve), 100);

      expect(lifeCycle).toEqual([
        "click",
        "dispatchEvent -> clicked",
        "getAttribute -> id",
        "setAttribute -> value, 1234567890",
      ]);
    });
  });

  describe("method", () => {
    let publisher: Publisher;
    let subscriber: Subscriber;
    let event: CustomEvent;
    let lifeCycle: string[];

    class Element {
      dispatchEvent(event) {
        lifeCycle.push(`dispatchEvent -> ${event.type}`);
        return this;
      }
    }

    class Publisher extends Echo(Element) {
      click() {
        lifeCycle.push("click");
        this.dispatchEvent(event);
        return this;
      }

      getAttribute(id) {
        lifeCycle.push(`getAttribute -> ${id}`);
        return "publisher";
      }
    }

    class Subscriber extends Echo(Element) {
      #value;

      change(value) {
        lifeCycle.push(`change -> ${value}`);
        this.#value = value;
      }
    }

    beforeEach(() => {
      publisher = new Publisher();
      subscriber = new Subscriber();
      event = new CustomEvent("clicked", { detail: "1234567890" });
      lifeCycle = [];
    });

    it("deve invocar o método no Subscriber quando o evento 'clicked' é despachado pelo Publisher", async () => {
      subscriber[attributeChangedCallback](
        "on",
        "",
        "publisher/clicked:method/change",
      );

      publisher.click();

      await new Promise((resolve) => setTimeout(resolve), 100);

      expect(lifeCycle).toEqual([
        "click",
        "dispatchEvent -> clicked",
        "getAttribute -> id",
        "change -> 1234567890",
      ]);
    });
  });

  describe("method", () => {
    let publisher: Publisher;
    let subscriber: Subscriber;
    let event: CustomEvent;
    let lifeCycle: string[];

    class Element {
      disconnectedCallback() {
        lifeCycle.push("disconnectedCallback");
        return this;
      }

      dispatchEvent(event) {
        lifeCycle.push(`dispatchEvent -> ${event.type}`);
        return this;
      }
    }

    class Publisher extends Echo(Element) {
      get localName() {
        lifeCycle.push("localName");
        return "publisher";
      }

      click() {
        lifeCycle.push("click");
        this.dispatchEvent(event);
        return this;
      }

      getAttribute(id) {
        lifeCycle.push(`getAttribute -> ${id}`);
        return undefined;
      }
    }

    class Subscriber extends Echo(Element) {
      #value;

      change(value) {
        lifeCycle.push(`change -> ${value}`);
        this.#value = value;
      }
    }

    beforeEach(() => {
      publisher = new Publisher();
      subscriber = new Subscriber();
      event = new CustomEvent("clicked", { detail: { value: "1234567890" } });
      lifeCycle = [];
    });

    afterEach(() => {
      publisher[disconnectedCallback]();
      subscriber[disconnectedCallback]();
    });

    it("deve invocar o método 'change' no Subscriber quando o evento 'clicked' é despachado pelo Publisher, testando os fallbacks de mapeamento do Echo", async () => {
      subscriber[attributeChangedCallback](
        "on",
        "",
        "publisher/clicked:method/change|prop=value",
      );

      publisher.click();

      await new Promise((resolve) => setTimeout(resolve), 100);

      expect(lifeCycle).toEqual([
        "click",
        "dispatchEvent -> clicked",
        "getAttribute -> id",
        "localName",
        "change -> 1234567890",
      ]);
    });
  });
});
