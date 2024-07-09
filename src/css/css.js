function css(strings, ...values) {
  const styles = new CSSStyleSheet();
  const textContent = String.raw({ raw: strings }, ...values);
  styles.replaceSync(textContent);
  return styles;
}

export default css;
