function html(strings, ...values) {
  let content = String.raw({ raw: strings }, ...values);

  content = content.replace(/\n */g, "");
  content = content.replace(/ {2,}/g, " ");

  return content;
}

export default html;
