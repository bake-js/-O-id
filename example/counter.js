import define from "../src/define";
import on from "../src/on";
import paint from "../src/paint";
import repaint from "../src/repaint";
import component from "./component";
import style from "./style";

@define("element-counter")
@paint(component, style)
class Counter extends HTMLElement {
  #number;

  get number() {
    return this.#number ?? 0;
  }

  set number(value) {
    this.#number = value;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  @on.click("*")
  @repaint
  increment() {
    this.number += 1;
    return this;
  }
}
