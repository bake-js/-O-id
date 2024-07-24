import trait from "../trait";

function eventConnect(target) {
  const dispatchEvent = target.prototype.dispatchEvent ?? (() => undefined);
  const attributeChangedCallback =
    target.attributeChangedCallback ?? (() => undefined);
  const disconnectedCallback = target.disconnectedCallback ?? (() => undefined);

  const controller = new AbortController();

  Object.assign(target, {
    observedAttributes: ["on", ...(target.observedAttributes ?? [])],
  });

  Reflect.defineProperty(target.prototype, "dispatchEvent", {
    value(event) {
      window.dispatchEvent(
        new CustomEvent(`${this.getAttribute("id")}/${event.type}`, {
          detail: event.detail,
        }),
      );

      return Reflect.apply(dispatchEvent, this, [event]);
    },
  });

  Reflect.defineProperty(target.prototype, "disconnectedCallback", {
    async value() {
      await Reflect.apply(disconnectedCallback, this, arguments);
      controller.abort();
      return this;
    },
    writable: true,
  });

  Reflect.defineProperty(target.prototype, "attributeChangedCallback", {
    async value(name, oldValue, newValue) {
      await Reflect.apply(attributeChangedCallback, this, arguments);
      name === "on" && (await this[trati.subscribe](newValue, oldValue));
      return this;
    },
    writable: true,
  });

  Reflect.defineProperty(target.prototype, trait.subscribe, {
    async value(value) {
      const [topic, map] = value.split(":");
      const [type, name] = map.split("/");

      window.addEventListener(
        topic,
        (event) => {
          if (/^method$/.test(type)) this[name](event.detail);
          if (/^attribute$/.test(type)) this.setAttribute(name, event.detail);
          if (/^setter$/.test(type)) this[name] = event.detail;
          return this;
        },
        { signal: controller.signal },
      );

      return this;
    },
    writable: true,
  });
}

export default eventConnect;
