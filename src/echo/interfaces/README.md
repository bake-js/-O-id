# Interfaces

O módulo `interfaces` define constantes usadas como identificadores de callbacks e eventos específicos para Custom Elements, especialmente em relação ao módulo `Echo`. Essas constantes permitem a padronização de métodos, eventos e atributos nos componentes, facilitando a implementação do ciclo de vida e lógica personalizada.

## Visão Geral

### Nome e Classificação

- **Nome:** Interfaces
- **Classificação:** Módulo Interno do -O-id

### Objetivo

Prover identificadores padronizados para callbacks, eventos e atributos em Custom Elements, promovendo consistência e reutilização de código.

## Implementação

```javascript
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
```

## Constantes

### Callbacks do Ciclo de Vida de Custom Elements

#### `attributeChangedCallback`

- **Tipo:** `string`
- **Descrição:** Identificador para o callback `attributeChangedCallback`, que é executado quando um atributo do elemento é adicionado, removido ou alterado.

#### `connectedCallback`

- **Tipo:** `string`
- **Descrição:** Identificador para o callback `connectedCallback`, que é executado quando um elemento é conectado ao DOM.

#### `disconnectedCallback`

- **Tipo:** `string`
- **Descrição:** Identificador para o callback `disconnectedCallback`, que é executado quando um elemento é desconectado do DOM.

### Métodos e Atributos

#### `dispatchEvent`

- **Tipo:** `string`
- **Descrição:** Identificador para o método `dispatchEvent`, utilizado para despachar eventos de um Custom Element.

#### `id`

- **Tipo:** `string`
- **Descrição:** Identificador para o atributo `id`, utilizado para identificar um Custom Element no contexto do `Echo`.

#### `observedAttributes`

- **Tipo:** `string`
- **Descrição:** Identificador para o array `observedAttributes`, que especifica quais atributos observar para mudanças.

### Callbacks Específicos do Echo

#### `echoConnectedCallback`

- **Tipo:** `symbol`
- **Descrição:** Identificador para o callback `echoConnectedCallback`, que é executado quando um protocolo `Echo` é conectado.

#### `echoDisconnectedCallback`

- **Tipo:** `symbol`
- **Descrição:** Identificador para o callback `echoDisconnectedCallback`, que é executado quando um protocolo `Echo` é desconectado.

### Identificador de Protocolo de Eventos

#### `on`

- **Tipo:** `string`
- **Descrição:** Identificador para o atributo `on`, que define o protocolo de eventos usados pelo `Echo`.

## Aplicabilidade

Ideal para qualquer projeto que utilize Custom Elements e precise de uma forma consistente de definir e gerenciar callbacks, eventos e atributos, especialmente quando integrado com o módulo `Echo`.

## Considerações Finais

O módulo `interfaces` é essencial para manter a consistência e a clareza no desenvolvimento de Custom Elements, padronizando a utilização de callbacks, eventos e atributos, facilitando a integração com o módulo `Echo`.
