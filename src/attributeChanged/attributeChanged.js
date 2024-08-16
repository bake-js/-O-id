import intercept from "../intercept";
import { attributeChangedCallback, observedAttributes } from "../interfaces";

/**
 * Decorator que adiciona lógica ao método `attributeChangedCallback` de um Custom Element.
 * Permite que um método seja executado quando um atributo específico é alterado.
 *
 * @param attributeName - O nome do atributo a ser monitorado.
 * @returns Um decorator que intercepta a chamada do `attributeChangedCallback`.
 */
const attributeChanged = (attributeName) => (target, propertyKey) => {
  // Atualiza a lista de atributos observados do Custom Element.
  const observedAttrs = target.constructor[observedAttributes] ?? [];

  Object.assign(target.constructor, {
    [observedAttributes]: [...observedAttrs, attributeName],
  });

  // Configura o interceptor para o método `attributeChangedCallback`.
  intercept(attributeChangedCallback)
    .in(target)
    .then(function (name, oldValue, newValue) {
      if (name === attributeName && oldValue !== newValue) {
        // Executa o método decorado com os novos e antigos valores do atributo.
        this[propertyKey](newValue, oldValue);
      }
    });
};

export default attributeChanged;
