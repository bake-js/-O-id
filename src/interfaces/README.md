# Interfaces

O módulo `interfaces` define constantes usadas como identificadores de callbacks e estados em Custom Elements. Estas constantes permitem a padronização de métodos e atributos nos componentes, facilitando a implementação do ciclo de vida e lógica personalizada.

## Visão Geral

### Nome e Classificação

- **Nome:** Interfaces
- **Classificação:** Módulo Interno do -O-id

### Objetivo

Prover identificadores padronizados para callbacks e estados em Custom Elements, promovendo consistência e reutilização de código.

## Implementação

```javascript
export const adoptedCallback = "adoptedCallback";
export const attributeChangedCallback = "attributeChangedCallback";
export const connectedCallback = "connectedCallback";
export const disconnectedCallback = "disconnectedCallback";
export const formAssociatedCallback = "formAssociatedCallback";
export const formDisabledCallback = "formDisabledCallback";
export const formResetCallback = "formResetCallback";
export const formStateRestoreCallback = "formStateRestoreCallback";
export const observedAttributes = "observedAttributes";
```

## Constantes

### Callbacks do Ciclo de Vida de Custom Elements

#### `adoptedCallback`

- **Tipo:** `string`
- **Descrição:** Identificador para o callback `adoptedCallback`, que é executado quando um elemento é movido para um novo documento.

#### `attributeChangedCallback`

- **Tipo:** `string`
- **Descrição:** Identificador para o callback `attributeChangedCallback`, que é executado quando um atributo do elemento é adicionado, removido ou alterado.

#### `connectedCallback`

- **Tipo:** `string`
- **Descrição:** Identificador para o callback `connectedCallback`, que é executado quando um elemento é conectado ao DOM.

#### `disconnectedCallback`

- **Tipo:** `string`
- **Descrição:** Identificador para o callback `disconnectedCallback`, que é executado quando um elemento é desconectado do DOM.

### Callbacks Específicos para Interação com Formulários

#### `formAssociatedCallback`

- **Tipo:** `string`
- **Descrição:** Identificador para o callback `formAssociatedCallback`, que é executado quando um elemento é associado a um formulário.

#### `formDisabledCallback`

- **Tipo:** `string`
- **Descrição:** Identificador para o callback `formDisabledCallback`, que é executado quando um elemento é desativado dentro de um formulário.

#### `formResetCallback`

- **Tipo:** `string`
- **Descrição:** Identificador para o callback `formResetCallback`, que é executado quando um formulário associado é resetado.

#### `formStateRestoreCallback`

- **Tipo:** `string`
- **Descrição:** Identificador para o callback `formStateRestoreCallback`, que é executado quando o estado de um elemento é restaurado dentro de um formulário.

### Observação de Atributos

#### `observedAttributes`

- **Tipo:** `string`
- **Descrição:** Identificador para o array `observedAttributes`, que especifica quais atributos observar para mudanças.

## Aplicabilidade

Ideal para qualquer projeto que utilize Custom Elements e precise de uma forma consistente de definir e gerenciar callbacks e estados.

## Considerações Finais

O módulo `interfaces` é essencial para manter a consistência e a clareza no desenvolvimento de Custom Elements, padronizando a utilização de callbacks e estados.
