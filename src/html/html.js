function html(strings, ...values) {
  strings = strings.map((x) => x.replace(/\n */g, ""));
  strings = strings.map((x) => x.replace(/ {2,}/g, " "));

  return String.raw({ raw: strings }, ...values);
}

export default html;
