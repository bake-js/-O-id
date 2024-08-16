const css = (strings, ...values) => {
  const style = new CSSStyleSheet();
  const textContent = String.raw({ raw: strings }, ...values);
  style.replaceSync(textContent);
  return [style];
};

export default css;
