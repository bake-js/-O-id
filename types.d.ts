/**
 * Decorator que adiciona lógica ao método `adoptedCallback` de um Custom Element.
 *
 * @param {Function} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} Um decorator que intercepta a chamada do `adoptedCallback`.
 *
 * @description
 * O decorator `adopted` permite que o método decorado seja chamado quando um Custom Element
 * é movido para um novo documento (ou seja, quando é adotado em um novo contexto de documento).
 * Ele usa o interceptor `intercept` para garantir que a lógica de `adoptedCallback` seja executada
 * de forma adequada, centralizando a lógica e mantendo a integridade dos métodos de callback.
 *
 * @example
 * import { adopted } from '@bake-js/-o-id';
 *
 * class MyElement extends HTMLElement {
 *   @adopted
 *   handleAdoption() {
 *     console.log('Elemento foi adotado.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
export declare function adopted(target: any, propertyKey: PropertyKey): void;

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
export declare function attributeChanged(
  attributeName: string,
): (target: any, propertyKey: PropertyKey) => void;

/**
 * Decorator que adiciona lógica ao método `connectedCallback` de um Custom Element.
 *
 * @param {Object} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} Um decorator que intercepta a chamada do `connectedCallback`.
 *
 * @description
 * O decorator `connected` é utilizado para adicionar lógica ao método `connectedCallback` de um Custom Element.
 * Quando o Custom Element é inserido no DOM, o método decorado é chamado. O decorator configura um interceptor
 * para que o método decorado seja executado quando o `connectedCallback` do Custom Element é invocado.
 *
 * @example
 * import { connected } from '@bake-js/-o-id';
 *
 * class MyElement extends HTMLElement {
 *   @connected
 *   handleConnected() {
 *     console.log('O elemento foi conectado ao DOM.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
export declare function connected(target: any, propertyKey: PropertyKey): void;

/**
 * Decorator para definir um Custom Element.
 *
 * @param {string} name - O nome do Custom Element a ser registrado.
 * @param {ElementDefinitionOptions} [options] - Opções adicionais para a definição do Custom Element.
 * @returns {Function} Um decorator que define o Custom Element.
 *
 * @description
 * O decorator `define` registra uma classe como um Custom Element com o nome e opções fornecidos.
 * Quando aplicado a uma classe, ele chama `customElements.define` para registrar a classe como um Custom Element
 * com o nome especificado. As opções adicionais podem ser usadas para fornecer configurações adicionais para a definição
 * do Custom Element.
 *
 * @example
 * import { define } from '@bake-js/-o-id';
 *
 * @define('my-element', { extends: 'div' })
 * class MyElement extends HTMLDivElement {
 *   constructor() {
 *     super();
 *     this.textContent = 'Hello, world!';
 *   }
 * }
 */
export declare function define(
  name: string,
  options?: ElementDefinitionOptions,
): (constructor: CustomElementConstructor) => void;
