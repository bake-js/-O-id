import attributeChanged from "../attributeChanged";
import trait from "../trait";

function mqtt(target) {
  const attributeChangedCallback =
    target.prototype.attributeChangedCallback ?? (() => undefined);

  const dispatchEvent = target.prototype.dispatchEvent ?? (() => undefined);

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

  Reflect.defineProperty(target.prototype, trait.broker, {
    value(value) {
      const [topic, map] = value.split(":");
      const [type, name] = map.split("/");

      window.addEventListener(topic, (event) => {
        if (/^method$/.test(type)) this[name](event.detail);
        if (/^attribute$/.test(type)) this.setAttribute(name, event.detail);
        if (/^setter$/.test(type)) this[name] = event.detail;
      });

      return this;
    },
  });

  attributeChanged("on")(target.prototype, trait.broker);
}

export default mqtt;
