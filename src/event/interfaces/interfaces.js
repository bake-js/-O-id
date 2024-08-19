// Define um símbolo para identificar e armazenar a instância de um AbortController.
// Usado para gerenciar a adição e remoção de event listeners de forma controlada.
export const abortController = Symbol("abortController");

// Identificador para o método `connectedCallback`, que é chamado automaticamente
// quando um Custom Element é conectado ao DOM. Usado para associar lógica específica
// ao evento de conexão com o DOM.
export const connectedCallback = "connectedCallback";

// Identificador para o método `disconnectedCallback`, que é chamado automaticamente
// quando um Custom Element é desconectado do DOM. Usado para limpar listeners e
// realizar outras tarefas relacionadas à desconexão do DOM.
export const disconnectedCallback = "disconnectedCallback";
