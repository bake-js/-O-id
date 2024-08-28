import intercept from "../intercept";
import { attributeChangedCallback, observedAttributes } from "../interfaces";

/**
 * Decorator que adiciona lógica ao método `attributeChangedCallback` de um Custom Element.
 * Permite que um método seja executado quando um atributo específico é alterado.
 *
 * @param {string} attributeName - O nome do atributo a ser monitorado.
 * @returns {Function} Um decorator que intercepta a chamada do `attributeChangedCallback`.
 *
 * @description
 * O decorator `attributeChanged` é utilizado para adicionar lógica ao método `attributeChangedCallback`
 * de um Custom Element. Quando um atributo específico (definido por `attributeName`) é alterado, o método
 * decorado é chamado com os valores antigo e novo do atributo. O decorator também garante que o atributo
 * seja adicionado à lista de atributos observados do Custom Element.
 *
 * @example
 * import { attributeChanged } from '@bake-js/-o-id';
 *
 * class MyElement extends HTMLElement {
 *   @attributeChanged('my-attribute')
 *   handleAttributeChange(newValue, oldValue) {
 *     console.log(`Atributo alterado de ${oldValue} para ${newValue}`);
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
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
