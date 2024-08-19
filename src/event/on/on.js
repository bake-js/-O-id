import intercept from "../../intercept";
import {
  abortController,
  connectedCallback,
  disconnectedCallback,
} from "../interfaces";

/**
 * Configura um event listener e o aplica como um decorator ao método alvo.
 * @param {string} type - Tipo do evento (e.g., 'click').
 * @param {string} query - Seletor CSS para filtrar o alvo do evento.
 * @param {...Function} filters - Filtros aplicados ao evento antes de chamar o método decorado.
 * @returns {Function} - Decorator para adicionar lógica ao método decorado.
 */
const attachEventListener =
  (type, query, ...filters) =>
  (target, propertyKey) => {
    intercept(connectedCallback)
      .in(target)
      .then(function () {
        const controller = (this[abortController] ??= new AbortController());
        const options = { signal: controller.signal };

        const listener = (event) => {
          if (event.target.matches(query)) {
            this[propertyKey](
              filters.reduce((target, filter) => filter(target), event),
            );
          }
        };

        this.addEventListener(type, listener, options);
        this.shadowRoot?.addEventListener(type, listener, options);
      });

    intercept(disconnectedCallback)
      .in(target)
      .then(function () {
        this[abortController].abort();
      });
  };

// Proxy para gerar os decorators dinamicamente com base no tipo de evento
const on = new Proxy(
  {},
  {
    get:
      (_, type) =>
      (query, ...filters) =>
        attachEventListener(type, query, ...filters),
  },
);

export default on;
