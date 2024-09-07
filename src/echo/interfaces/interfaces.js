/**
 * Nomes dos callbacks para o ciclo de vida dos Custom Elements.
 *
 * Esses são os nomes padrão utilizados para os callbacks do ciclo de vida dos Custom Elements.
 *
 * @constant {string} attributeChangedCallback - Nome do callback chamado quando um atributo de um Custom Element é alterado.
 * @constant {string} connectedCallback - Nome do callback chamado quando um Custom Element é inserido no DOM.
 * @constant {string} disconnectedCallback - Nome do callback chamado quando um Custom Element é removido do DOM.
 */
export const attributeChangedCallback = "attributeChangedCallback";
export const connectedCallback = "connectedCallback";
export const disconnectedCallback = "disconnectedCallback";

/**
 * Nome do método para despachar eventos.
 *
 * Este é o nome padrão utilizado para o método que despacha eventos personalizados em um Custom Element.
 *
 * @constant {string} dispatchEvent - Nome do método utilizado para despachar eventos.
 */
export const dispatchEvent = "dispatchEvent";

/**
 * Callbacks específicos do Echo.
 *
 * Esses são os callbacks utilizados pelo módulo Echo para gerenciar a conexão e desconexão de eventos.
 *
 * @constant {symbol} echoConnectedCallback - Callback chamado pelo Echo ao conectar um protocolo de eventos.
 * @constant {symbol} echoDisconnectedCallback - Callback chamado pelo Echo ao desconectar um protocolo de eventos.
 */
export const echoConnectedCallback = Symbol.for("echoConnectedCallback");
export const echoDisconnectedCallback = Symbol.for("echoDisconnectedCallback");

/**
 * Nome do atributo para identificar um elemento.
 *
 * Este é o nome padrão utilizado para identificar um elemento através do atributo `id`.
 *
 * @constant {string} id - Nome do atributo que identifica um elemento.
 */
export const id = "id";

/**
 * Nome do atributo para observação de atributos no Custom Element.
 *
 * Este é o nome padrão utilizado para armazenar os atributos observados em um Custom Element.
 *
 * @constant {string} observedAttributes - Nome do atributo que contém a lista de atributos observados.
 */
export const observedAttributes = "observedAttributes";

/**
 * Identificador do atributo que define o protocolo de eventos usado pelo Echo.
 *
 * Este é o nome padrão utilizado para o atributo `on`, que define o protocolo de eventos utilizado pelo módulo Echo.
 *
 * @constant {string} on - Nome do atributo que define o protocolo de eventos usado pelo Echo.
 */
export const on = "on";
