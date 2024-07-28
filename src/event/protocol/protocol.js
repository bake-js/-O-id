import { id } from "../interfaces";

const protocol = {
  create(event) {
    return `${event.target.getAttribute(id)}/${event.type}`;
  },

  from(value) {
    const [topic, map] = value.split(":");
    const [type, name] = map.split("/");

    return {
      name,
      topic,
      type,
    };
  },
};

export default protocol;
