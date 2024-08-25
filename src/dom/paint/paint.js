import intercept, { exec } from "../../intercept";
import {
  connectedCallback,
  didPaintCallback,
  paintCallback,
  willPaintCallback,
} from "../interfaces";

/**
 * Decorator que adiciona suporte para renderização e estilização de um componente.
 *
 * @param {Function} component - Função que retorna o HTML a ser renderizado.
 * @param {Function} [style] - Função opcional que retorna as folhas de estilo a serem aplicadas.
 * @returns {Function} - O decorator para ser aplicado à classe do componente.
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
            resolve();
          });
        };

        // Executa os callbacks de ciclo de vida antes e depois da renderização
        await this[willPaintCallback]?.();
        await new Promise(render);
        await this[didPaintCallback]?.();
      });

    // Intercepta o método connectedCallback para garantir que paintCallback seja chamado
    intercept(connectedCallback).in(target.prototype).then(exec(paintCallback));
  };

export default paint;
