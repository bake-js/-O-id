// Nomes dos callbacks para o ciclo de vida dos Custom Elements
export const attributeChangedCallback = "attributeChangedCallback";
export const connectedCallback = "connectedCallback";
export const disconnectedCallback = "disconnectedCallback";

// Nome do método para despachar eventos
export const dispatchEvent = "dispatchEvent";

// Callbacks específicos do Echo
export const echoConnectedCallback = Symbol("echoConnectedCallback");
export const echoDisconnectedCallback = Symbol("echoDisconnectedCallback");

// Nome do atributo para identificar um elemento
export const id = "id";

// Nome do atributo para observação de atributos no Custom Element
export const observedAttributes = "observedAttributes";

// Identificador para o atributo que define o protocolo de eventos usado pelo Echo
export const on = "on";
