/**
 * Decorator utilizado para modificar o comportamento do método `adoptedCallback` de um elemento customizado.
 * Permite a execução de ações adicionais ao adotar o elemento por outro documento.
 *
 * @param {any} target - O protótipo da classe do elemento customizado.
 * @param {PropertyKey} propertyKey - A chave da propriedade.
 */
export declare function adopted(target: any, propertyKey: PropertyKey): void;

/**
 * Decorator utilizado para definir um método como manipulador de atributos.
 * O método decorado será chamado sempre que o atributo especificado for alterado.
 *
 * @param {string} attributeName - O nome do atributo a ser observado.
 */
export declare function attributeChanged(
  attributeName: string,
): (target: any, propertKey: PropertyKey) => void;

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
export declare const on: {
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
