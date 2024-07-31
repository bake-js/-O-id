# Interfaces

O módulo `interfaces` define constantes usadas como identificadores de callbacks e estados em Custom Elements. Estas constantes permitem a padronização de métodos e atributos nos componentes, facilitando a implementação de ciclo de vida e lógica personalizada.

## Visão Geral

### Nome e Classificação

- **Nome:** Interfaces
- **Classificação:** Modulo Interno

### Objetivo

Prover identificadores padronizados para callbacks e estados em Custom Elements, promovendo consistência e reutilização de código.

## Implementação

```javascript
export const adoptedCallback = "adoptedCallback";
export const attributeChangedCallback = "attributeChangedCallback";
export const connectedCallback = "connectedCallback";
export const didPaintCallback = Symbol("didPaintCallback");
export const disconnectedCallback = "disconnectedCallback";
export const observedAttributes = "observedAttributes";
export const paintCallback = Symbol("paintCallback");
export const willPaintCallback = Symbol("willPaintCallback");
```

## Constantes

### `adoptedCallback`

- **Tipo:** `string`
- **Descrição:** Identificador para o callback `adoptedCallback`, executado quando um elemento é movido para um novo documento.

### `attributeChangedCallback`

- **Tipo:** `string`
- **Descrição:** Identificador para o callback `attributeChangedCallback`, executado quando um atributo do elemento é adicionado, removido ou alterado.

### `connectedCallback`

- **Tipo:** `string`
- **Descrição:** Identificador para o callback `connectedCallback`, executado quando um elemento é conectado ao DOM.

### `didPaintCallback`

- **Tipo:** `symbol`
- **Descrição:** Identificador simbólico para o callback `didPaintCallback`, executado após o ciclo de pintura do elemento.

### `disconnectedCallback`

- **Tipo:** `string`
- **Descrição:** Identificador para o callback `disconnectedCallback`, executado quando um elemento é desconectado do DOM.

### `observedAttributes`

- **Tipo:** `string`
- **Descrição:** Identificador para o array `observedAttributes`, que especifica quais atributos observar para mudanças.

### `paintCallback`

- **Tipo:** `symbol`
- **Descrição:** Identificador simbólico para o callback `paintCallback`, executado durante o ciclo de pintura do elemento.

### `willPaintCallback`

- **Tipo:** `symbol`
- **Descrição:** Identificador simbólico para o callback `willPaintCallback`, executado antes do ciclo de pintura do elemento.

## Aplicabilidade

Ideal para qualquer projeto que utilize Custom Elements e precise de uma forma consistente de definir e gerenciar callbacks e estados.

## Considerações Finais

O módulo `interfaces` é essencial para manter a consistência e a clareza no desenvolvimento de Custom Elements, padronizando a utilização de callbacks e estados.
