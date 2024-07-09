function html(strings, ...values) {
  return String.raw({ raw: strings }, ...values).trim();
}

export default html;
