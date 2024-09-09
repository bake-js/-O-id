import intercept, { exec } from "../../intercept";
import {
  connectedCallback,
  didPaintCallback,
  paintCallback,
  willPaintCallback,
} from "../interfaces";

/**
 * Decorator que adiciona suporte para renderização e estilização de um componente.
 * Este decorator permite definir o HTML e os estilos de um Custom Element de forma
 * declarativa, garantindo que os ciclos de vida de renderização sejam respeitados.
 *
 * @param {Function} component - Função que retorna o HTML a ser renderizado.
 * @param {Function} [style] - Função opcional que retorna as folhas de estilo a serem aplicadas.
 * @returns {Function} - O decorator para ser aplicado à classe do componente.
 *
 * @description
 * O decorator `paint` facilita a criação de componentes personalizados,
 * permitindo que a lógica de renderização e aplicação de estilos seja centralizada.
 * Ele intercepta os callbacks de ciclo de vida (`paintCallback`, `willPaintCallback`,
 * `didPaintCallback` e `connectedCallback`) para garantir que o componente seja renderizado
 * de forma correta, utilizando `requestAnimationFrame` para otimizar a atualização visual.
 *
 * Este decorator é particularmente útil para componentes que precisam de uma renderização
 * controlada e eficiente, com suporte a estilos encapsulados via `adoptedStyleSheets`.
 *
 * @example
 * @paint(
 *   (element) => `<div>${element.someProperty}</div>`,
 *   (element) => [new CSSStyleSheet()]
 * )
 * class MyComponent extends HTMLElement {
 *   connectedCallback() {
 *     console.log('MyComponent conectado');
 *   }
 * }
 *
 * customElements.define('my-component', MyComponent);
 */
const paint =
  (component, style = () => []) =>
  (target) => {
    // Intercepta o método paintCallback para adicionar lógica de renderização
    intercept(paintCallback)
      .in(target.prototype)
      .then(async function () {
        // Função para renderizar o componente após o próximo frame
        const render = (resolve) => {
          requestAnimationFrame(() => {
            (this.shadowRoot ?? document).adoptedStyleSheets = style(this);
            (this.shadowRoot ?? this).innerHTML = component(this);
            this.isPainted = true;
            resolve();
          });
        };

        // Executa os callbacks de ciclo de vida antes e depois da renderização
        await this[willPaintCallback]?.();
        await new Promise(render);
        await this[didPaintCallback]?.();
      });

    // Intercepta o método connectedCallback para garantir que paintCallback seja chamado
    intercept(connectedCallback)
      .in(target.prototype) // Define o alvo do interceptor.
      .then(exec(paintCallback)); // Define o método a ser executado pelo interceptor.
  };

export default paint;
