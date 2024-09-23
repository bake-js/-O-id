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
 * Decorator utilizado para modificar o comportamento do método `connectedCallback` de um elemento customizado.
 * Permite a execução de ações adicionais ao conectar o elemento ao DOM.
 *
 * @param {any} target - O alvo do decorator.
 * @param {PropertyKey} propertyKey - A chave da propriedade.
 */
export declare function connected(target: any, propertyKey: PropertyKey): void;

/**
 * Helper para criar uma instância de CSSStyleSheet a partir de um template literal.
 * Facilita a definição de estilos encapsulados para Web Components.
 *
 * @param {TemplateStringsArray} strings - As partes literais do template string.
 * @param {...any} values - Os valores interpolados no template string.
 * @returns {CSSStyleSheet} - A instância de CSSStyleSheet criada a partir do template literal.
 */
export declare function css(
  strings: TemplateStringsArray,
  ...values: any[]
): CSSStyleSheet;

/**
 * Função decoradora para definir elementos personalizados.
 *
 * @param {string} name - O nome do elemento personalizado.
 * @param {ElementDefinitionOptions} options - As opções para definir o elemento personalizado.
 * @returns {Function} - Uma função decoradora para definir a classe do elemento personalizado.
 */
export declare function define(
  name: string,
  options?: ElementDefinitionOptions,
): (constructor: CustomElementConstructor) => void;

/**
 * Decorator utilizado para definir um método como manipulador de pintura.
 * O método decorado será chamado antes do método decorado com `@paint`.
 *
 * @param {any} target - O alvo do decorator.
 * @param {PropertyKey} propertyKey - A chave da propriedade.
 */
export declare function didPaint(target: any, propertyKey: PropertyKey): void;

/**
 * Decorator utilizado para modificar o comportamento do método `disconnectedCallback` de um elemento customizado.
 * Permite a execução de ações adicionais ao desconectar o elemento do DOM.
 *
 * @param {any} target - O alvo do decorator.
 * @param {PropertyKey} propertyKey - A chave da propriedade.
 */
export declare function disconnected(
  target: any,
  propertyKey: PropertyKey,
): void;

/**
 * Função utilizada para construir strings HTML com interpolação.
 *
 * @param {TemplateStringsArray} strings - As partes literais da string template.
 * @param {...any[]} values - Os valores interpolados na string template.
 * @returns {string} - A string HTML interpolada e formatada.
 */
export declare function html(
  strings: TemplateStringsArray,
  ...values: any[]
): string;

/**
 * Decorator utilizado para agendar a execução de um método após o método decorado.
 *
 * @param {string | symbol} method - O nome do método a ser agendado para execução.
 */
export declare function joinCut(
  method: string | symbol,
): (
  target: any,
  propertyKey: PropertyKey,
  descriptor: PropertyDescriptor,
) => void;

/**
 * Decorator utilizado para adicionar um ouvinte de eventos a um elemento customizado.
 * O método decorado será chamado quando o evento especificado ocorrer no elemento.
 *
 * @param {string} event - O nome do evento a ser observado.
 */
export declare const event: {
  [event: string]: (
    query: string,
  ) => (target: any, propertyKey: PropertyKey) => void;
};

/**
 * Decorator utilizado para renderizar o conteúdo do elemento customizado.
 *
 * @param {Component} component - Uma função que retorna o conteúdo HTML a ser renderizado.
 * @param {Style} style - Uma função que retorna o conteúdo CSS a ser renderizado.
 * @returns {Decorator} - Uma função que aplica o decorator a um elemento alvo.
 */
export declare function paint(component: Component, style?: Style): Decorator;

/**
 * Tipo para uma função que retorna o conteúdo HTML a ser renderizado.
 *
 * @param {any} self - O elemento alvo que será renderizado.
 * @returns {string} - O conteúdo HTML a ser renderizado.
 */
type Component = (self: any) => string;

/**
 * Tipo para uma função que retorna o conteúdo CSS a ser renderizado.
 *
 * @param {any} self - O elemento alvo que será renderizado.
 * @returns {CSSStyleSheet} - O conteúdo CSS a ser renderizado.
 */
type Style = (self: any) => CSSStyleSheet;

/**
 * Tipo para a função decoradora que aplica o decorator a um elemento alvo.
 *
 * @param {CustomElementConstructor} constructor - O construtor do elemento customizado.
 * @returns {void} - Não retorna nenhum valor.
 */
type Decorator = (constructor: CustomElementConstructor) => void;

/**
 * Decorator utilizado para forçar a atualização da renderização do elemento customizado.
 *
 * @param {any} target - A classe alvo onde o método decorado está sendo definido.
 * @param {PropertyKey} propertyKey - O nome do método decorado.
 * @param {PropertyDescriptor} descriptor - O descritor da propriedade que define o método decorado.
 * @returns {void}
 */
export declare function repaint(
  target: any,
  propertyKey: PropertyKey,
  descriptor: PropertyDescriptor,
): void;

/**
 * Um objeto contendo símbolos para métodos em componentes web.
 * Cada símbolo representa um método específico que pode ser utilizado dinamicamente.
 */
export declare const trait: {
  [key: string]: unique symbol;
};

/**
 * Decorator utilizado para definir um método como manipulador de pintura.
 * O método decorado será chamado depois do método decorado com `@paint`.
 *
 * @param {any} target - O alvo do decorator.
 * @param {PropertyKey} propertyKey - A chave da propriedade.
 */
export declare function willPaint(target: any, propertyKey: PropertyKey): void;
