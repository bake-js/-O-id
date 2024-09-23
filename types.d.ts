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

/**
 * Cria um decorator para adicionar lógica ao método `formStateRestoreCallback` de um Custom Element.
 *
 * @param {Object} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} Um decorator que intercepta a chamada do `formStateRestoreCallback`.
 *
 * @description
 * O decorator `formStateRestore` permite que um método seja executado quando o estado do formulário
 * é restaurado para o Custom Element. O método decorado é chamado automaticamente quando o estado
 * do formulário é restaurado, permitindo a execução de lógica personalizada durante esse processo.
 *
 * @example
 * import { formStateRestore } from '@bake-js/-o-id';
 *
 * class MyElement extends HTMLElement {
 *   constructor() {
 *     super();
 *     this.attachShadow({ mode: 'open' });
 *   }
 *
 *   @formStateRestore
 *   handleFormStateRestore() {
 *     console.log('O estado do formulário foi restaurado.');
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 */
export declare function formStateRestore(
  target: any,
  propertyKey: PropertyKey,
): void;

/**
 * Cria uma folha de estilos CSS a partir de template literals.
 *
 * @param {TemplateStringsArray} strings - As partes literais da string do template.
 * @param {...any} values - Os valores interpolados na string do template.
 * @returns {CSSStyleSheet[]} Um array contendo a folha de estilos gerada.
 *
 * @description Esta função permite a criação dinâmica de folhas de estilo CSS utilizando
 * template literals, permitindo a interpolação de valores dentro da string CSS. Ela
 * retorna a folha de estilo gerada como um array de `CSSStyleSheet`.
 *
 * @example
 * import { css } from '@bake-js/-o-id/dom';
 *
 * const styles = css`
 *   body {
 *     background-color: ${backgroundColor};
 *   }
 * `;
 *
 * document.adoptedStyleSheets = [...document.adoptedStyleSheets, ...styles];
 */
export declare function css(
  strings: TemplateStringsArray,
  ...values: any[]
): CSSStyleSheet;

/**
 * Cria um decorator que intercepta e adiciona lógica ao método `didPaintCallback` de um Custom Element.
 *
 * @param {Object} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {void} Um decorator que intercepta a chamada do `didPaintCallback`.
 *
 * @description
 * O decorator `didPaint` permite que desenvolvedores de Custom Elements adicionem
 * lógica adicional ao ciclo de vida do componente, especificamente após a renderização.
 *
 * @example
 * import { didPaint } from '@bake-js/-o-id/dom';
 *
 * class MyComponent extends HTMLElement {
 *   @didPaint
 *   handleDidPaint() {
 *     console.log('O componente foi pintado!');
 *   }
 * }
 */
export declare function didPaint(target: any, propertyKey: PropertyKey): void;

/**
 * Helper para criar strings HTML limpas a partir de template literals.
 * Remove quebras de linha, espaços múltiplos e espaços entre tags.
 *
 * @param {TemplateStringsArray} strings - As partes literais do template string.
 * @param {...any} values - Os valores interpolados no template literal.
 * @returns {string} String HTML formatada e limpa.
 *
 * @description
 * A função `html` facilita a construção de strings HTML a partir de template literals,
 * otimizando o conteúdo ao remover espaços em excesso e quebras de linha desnecessárias.
 * Ela é útil para garantir que o HTML gerado seja compacto e bem formatado,
 * especialmente quando se trabalha com código dinâmico ou templates que são
 * renderizados a partir de várias partes. Além de melhorar a legibilidade do HTML,
 * também contribui para a performance ao reduzir o tamanho do conteúdo final.
 *
 * @example
 * import { html } from '@bake-js/-o-id/dom';
 *
 * const content = html`
 *   <div>
 *     <p>${'Texto'}</p>
 *   </div>
 * `;
 *
 * console.log(content); // "<div><p>Texto</p></div>"
 */
export declare function html(
  strings: TemplateStringsArray,
  ...values: any[]
): string;

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
 * import { paint } from '@bake-js/-o-id/dom';
 *
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
 * @returns {CSSStyleSheet[]} - O conteúdo CSS a ser renderizado.
 */
type Style = (self: any) => CSSStyleSheet[];

/**
 * Tipo para a função decoradora que aplica o decorator a um elemento alvo.
 *
 * @param {CustomElementConstructor} constructor - O construtor do elemento customizado.
 * @returns {void} - Não retorna nenhum valor.
 */
type Decorator = (constructor: CustomElementConstructor) => void;

/**
 * Decorator para chamar o callback de pintura após a execução do método ou atualização de propriedade original.
 *
 * O decorator garante que o callback `paintCallback` seja chamado após a execução do método original
 * ou após a atribuição de um novo valor para uma propriedade, caso o elemento esteja conectado ao DOM.
 * É útil para garantir que ações de pintura sejam feitas no momento certo do ciclo de vida do componente.
 *
 * @param {Object} _target - O alvo do decorator (classe ou protótipo).
 * @param {string} _propertyKey - O nome da propriedade/método decorado.
 * @param {Object} descriptor - O descritor de propriedade/método.
 * @returns {void}
 *
 * @description
 * O decorator `repaint` é utilizado para assegurar que, após a execução de um método decorado
 * ou a atualização de uma propriedade decorada, o callback `paintCallback` seja chamado se o
 * elemento estiver conectado ao DOM. Isso permite que a lógica de pintura do componente seja invocada
 * de forma automática e no momento certo, garantindo a consistência visual e comportamental do Custom Element.
 *
 * Esse decorator é especialmente útil em cenários onde o componente precisa atualizar sua interface
 * visual ou realizar outras ações relacionadas à pintura, sempre que um método específico ou propriedade
 * for atualizado.
 *
 * @example
 * import { repaint } from '@bake-js/-o-id/dom';
 *
 * class MyComponent extends HTMLElement {
 *   paintCallback() {
 *     console.log('Callback de pintura chamado');
 *   }
 *
 *   // Usando em um método
 *   @repaint
 *   handlePaint() {
 *     console.log('Método original executado');
 *   }
 *
 *   // Usando em uma propriedade
 *   #color;
 *
 *   @repaint
 *   set color(value) {
 *     this.#color = value;
 *   }
 *
 *   get color() {
 *     return this.#color;
 *   }
 * }
 */
export declare function repaint(
  target: any,
  propertyKey: PropertyKey,
  descriptor: PropertyDescriptor,
): void;

/**
 * Cria um decorator para adicionar lógica ao método `willPaintCallback` de um Custom Element.
 *
 * Este decorator intercepta a chamada do `willPaintCallback` e garante que o método decorado
 * seja chamado antes do callback `willPaintCallback` ser executado. Isso permite que a lógica
 * personalizada seja executada antes que o componente seja pintado.
 *
 * @param {Function} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} - O decorator que intercepta a chamada do `willPaintCallback`.
 *
 * @description
 * O decorator `willPaint` é utilizado para adicionar lógica personalizada ao ciclo de vida
 * de um componente, interceptando o `willPaintCallback`. Isso permite que o método decorado
 * seja executado antes do componente ser pintado, garantindo que qualquer lógica necessária
 * seja processada no momento adequado. É útil para preparar o componente ou modificar seu estado
 * antes que a renderização ocorra, assegurando que todas as condições necessárias estejam atendidas
 * antes da pintura.
 *
 * @example
 * import { willPaint } from '@bake-js/-o-id/dom';
 *
 * // Exemplo de uso do decorator `willPaint`
 * class MeuComponente extends HTMLElement {
 *   @willPaint
 *   handleWillPaint() {
 *     // Lógica a ser executada antes do componente ser pintado
 *   }
 * }
 */
export declare function willPaint(target: any, propertyKey: PropertyKey): void;

/**
 * Mixin Echo para adicionar suporte a um Event Bus em um Custom Element.
 *
 * @param {typeof HTMLElement} Klass - A classe do Custom Element a ser estendida.
 * @returns {typeof HTMLElement} A classe estendida com suporte ao Event Bus.
 *
 * @description
 * Este mixin permite que um Custom Element participe de um Event Bus, escutando e emitindo eventos
 * de maneira centralizada. Atributos específicos, como `on`, são usados para definir as regras
 * de comunicação entre componentes.
 *
 * @example
 * import Echo from '@bake-js/-o-id/echo';
 *
 * class MyComponent extends Echo(HTMLElement) {
 *   connectedCallback() {
 *     console.log('MyComponent conectado');
 *   }
 * }
 *
 * customElements.define('my-component', MyComponent);
 */
export declare function Echo<T extends typeof HTMLElement>(Klass: T): T;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      /**
       * O componente `o-echo-source` interage com o Echo Event Bus para reagir a eventos
       * e gerenciar ações com base nas mudanças de atributos.
       *
       * @description
       * O atributo `on` especifica o evento ao qual o `o-echo-source` deve reagir, podendo ser usado
       * em sistemas onde componentes necessitam se comunicar e reagir a eventos disparados por outros
       * componentes ou APIs externas.
       *
       * @example
       * <o-text-field name="cidade" label="Cidade" readonly>
       *   <o-echo-source on="viaCEP/success:setter/value|prop=localidade"></o-echo-source>
       * </o-text-field>
       */
      "o-echo-source": {
        /** O atributo `on` define o evento ao qual o componente reage, no formato `target/event:action|prop=property`. */
        on: string;
      };
    }
  }
}

/**
 * Configura um event listener e o aplica como um decorator ao método alvo.
 *
 * @param {string} type - O tipo do evento a ser ouvido (e.g., 'click').
 * @param {string} query - Seletor CSS para filtrar o alvo do evento.
 * @param {...Function} filters - Funções de filtro aplicadas ao evento antes de chamar o método decorado.
 * @returns {Function} - O decorator para adicionar lógica ao método decorado.
 *
 * @description
 * Este decorator adiciona um event listener ao elemento quando ele é conectado ao DOM e o remove quando o
 * elemento é desconectado. O event listener é filtrado usando filtros opcionais fornecidos antes de chamar o
 * método decorado. É útil para gerenciar eventos de forma declarativa em Custom Elements.
 *
 * @example
 * import on, { prevent, stop } from '@bake-js/-o-id/event';
 *
 * class MyComponent extends HTMLElement {
 *   @on.click('button', prevent, stop)
 *   handleClick(event) {
 *     console.log('Botão clicado');
 *   }
 * }
 */
export declare const on: {
  [event: string]: (
    query: string,
    ...filters: Array<(target: any) => any>
  ) => (target: any, propertyKey: PropertyKey) => void;
};

/**
 * Converte os dados de um formulário em um objeto.
 *
 * @param {Event} event - O evento que contém os dados do formulário.
 * @returns {Record<string, FormDataEntryValue>} Um objeto contendo os dados do formulário.
 *
 * @description
 * Este filtro cria um objeto a partir dos dados do formulário presente no evento,
 * facilitando o acesso e manipulação dos dados submetidos. A função utiliza a API
 * `FormData` para coletar os dados do formulário e a função `Object.fromEntries`
 * para converter os pares chave-valor em um objeto.
 *
 * @example
 * import { formData } from '@bake-js/-o-id/event';
 *
 * const handleSubmit = (event: Event) => {
 *   event.preventDefault();
 *   const data = formData(event);
 *   console.log(data); // { nome: 'João', idade: '30' }
 * };
 */
export declare const formData: (
  event: Event,
) => Record<string, FormDataEntryValue>;
