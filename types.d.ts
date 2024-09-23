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

/**
 * Decorator que adiciona lógica ao método `disconnectedCallback` de um Custom Element.
 *
 * @param {Object} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} Um decorator que intercepta a chamada do `disconnectedCallback`.
 *
 * @description
 * O decorator `disconnected` adiciona lógica ao método `disconnectedCallback` de um Custom Element. Ele permite
 * que você execute uma função personalizada quando o elemento é removido do DOM. A função decorada será chamada
 * automaticamente quando o `disconnectedCallback` for invocado.
 *
 * @example
 * import { disconnected } from '@bake-js/-o-id';
 *
 * class MyElement extends HTMLElement {
 *   constructor() {
 *     super();
 *     this.attachShadow({ mode: 'open' });
 *   }
 *
 *   @disconnected
 *   handleDisconnect() {
 *     console.log('Elemento foi removido do DOM.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
export declare function disconnected(
  target: any,
  propertyKey: PropertyKey,
): void;

/**
 * Cria um decorator para adicionar lógica ao método `formAssociatedCallback` de um Custom Element.
 *
 * @param {Object} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} Um decorator que intercepta a chamada do `formAssociatedCallback`.
 *
 * @description
 * O decorator `formAssociated` permite adicionar lógica personalizada ao método `formAssociatedCallback` de um
 * Custom Element. Este método é chamado automaticamente quando um elemento associado a um formulário é registrado
 * com o formulário. O decorator permite que você execute uma função personalizada durante esse processo.
 *
 * @example
 * import { formAssociated } from '@bake-js/-o-id';
 *
 * class MyElement extends HTMLElement {
 *   constructor() {
 *     super();
 *     this.attachShadow({ mode: 'open' });
 *   }
 *
 *   @formAssociated
 *   handleFormAssociated() {
 *     console.log('O elemento foi associado a um formulário.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
export declare function formAssociated(
  target: any,
  propertyKey: PropertyKey,
): void;

/**
 * Cria um decorator para adicionar lógica ao método `formDisabledCallback` de um Custom Element.
 *
 * @param {Object} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} Um decorator que intercepta a chamada do `formDisabledCallback`.
 *
 * @description
 * O decorator `formDisabled` permite adicionar lógica personalizada ao método `formDisabledCallback` de um
 * Custom Element. Este método é chamado automaticamente quando o elemento é desativado dentro de um formulário.
 * O decorator permite que você execute uma função personalizada durante esse processo.
 *
 * @example
 * import { formDisabled } from '@bake-js/-o-id';
 *
 * class MyElement extends HTMLElement {
 *   constructor() {
 *     super();
 *     this.attachShadow({ mode: 'open' });
 *   }
 *
 *   @formDisabled
 *   handleFormDisabled() {
 *     console.log('O elemento foi desativado no formulário.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
export declare function formDisabled(
  target: any,
  propertyKey: PropertyKey,
): void;

/**
 * Cria um decorator para adicionar lógica ao método `formResetCallback` de um Custom Element.
 *
 * @description
 * O decorator `formReset` permite adicionar lógica personalizada ao método `formResetCallback` de um
 * Custom Element. Este método é chamado automaticamente quando o formulário ao qual o elemento pertence
 * é redefinido. O decorator possibilita a execução de uma função personalizada durante esse processo.
 *
 * @param {Object} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} Um decorator que intercepta a chamada do `formResetCallback`.
 *
 * @example
 * import { formReset } from '@bake-js/-o-id';
 *
 * class MyElement extends HTMLElement {
 *   constructor() {
 *     super();
 *     this.attachShadow({ mode: 'open' });
 *   }
 *
 *   @formReset
 *   handleFormReset() {
 *     console.log('O formulário foi redefinido.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
export declare function formReset(target: any, propertyKey: PropertyKey): void;
