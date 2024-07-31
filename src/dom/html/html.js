const html = (strings, ...values) => {
  values = values.map((value) =>
    Array.isArray(value) ? value.join("") : value,
  );

  let content = String.raw({ raw: strings }, ...values);

  content = content.replace(/\n */g, "");
  content = content.replace(/ {2,}/g, " ");
  content = content.trim();

  return content;
};

export default html;
