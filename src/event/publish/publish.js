import intercept from "../../intercept";
import { bus } from "../bus";
import { dispatchEvent } from "../interfaces";
import protocol from "../protocol";

const publish = (target) =>
  intercept(dispatchEvent)
    .in(target.prototype)
    .then((event) => {
      const topic = protocol.create(event);
      const message = event.detail;
      bus.dispatchEvent(new CustomEvent(topic, { detail: message }));
    });

export default publish;
