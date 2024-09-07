export const asdf = {
  prop: (target, path) => {
    try {
      return new Function(
        "data",
        `return data${/(^\[$)/.test(path) ? "" : "."}${path}`,
      )(target);
    } catch (_error) {
      return undefined;
    }
  },
};
