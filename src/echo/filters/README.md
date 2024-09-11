# Filters

O `filters` é um módulo interno da biblioteca `@bake-js/-o-id/echo`, que fornece uma série de funções utilitárias projetadas para transformar dados, especialmente no contexto de eventos. Embora atualmente tenha um único filtro (`prop`), este módulo será expandido para incluir outros filtros que possibilitem manipulações mais complexas de dados antes que eles sejam processados por métodos, atributos ou setters.

## Visão Geral

### Nome e Classificação

- **Nome:** Filters
- **Classificação:** Funções utilitárias

### Objetivo

O `filters` fornece uma coleção de funções que podem ser usadas para transformar dados antes de serem processados por eventos dentro da arquitetura do `Echo`. O primeiro e principal filtro disponível é o `prop`, que permite acessar propriedades aninhadas de objetos. Novos filtros serão adicionados no futuro, oferecendo maior flexibilidade na transformação de dados.

## Motivação

Ao utilizar eventos no `Echo`, muitas vezes é necessário modificar ou transformar os dados recebidos antes de processá-los. O `filters` oferece uma maneira de desacoplar a transformação de dados da lógica de eventos. Com o tempo, novos filtros aumentarão a capacidade de manipulação e permitirão mais transformações dinâmicas.

### Benefícios:

1. **Flexibilidade:** Transforme dados de eventos de maneira simples antes que eles sejam utilizados em métodos, atributos ou setters.
2. **Escalabilidade:** O `filters` será expandido para incluir novos filtros, atendendo a uma variedade de cenários de transformação de dados.
3. **Desacoplamento:** Centralize a lógica de transformação de dados, mantendo o código de manipulação de eventos mais limpo e fácil de manter.

## Aplicabilidade

O `filters` é ideal para cenários onde a transformação de dados é necessária antes do processamento de eventos. Ele se integra diretamente com o `Echo`, permitindo que filtros sejam aplicados dentro do atributo `on`, no formato pipes & filters, para manipular os dados recebidos.

## Importação

Embora seja um módulo interno, o `filters` pode ser importado e usado diretamente:

```javascript
import filters from '@bake-js/-o-id/echo/filters';
```

## Implementação

### Filtro Atual: `prop`

Atualmente, o `filters` oferece o filtro `prop`, que permite acessar propriedades aninhadas de um objeto com base em um caminho de string.

```javascript
/**
 * Acessa uma propriedade aninhada de um objeto com base em um caminho de string.
 *
 * @param {Object} object - O objeto alvo de onde a propriedade será extraída.
 * @param {string} propertyPath - O caminho da propriedade no formato de string.
 * @returns {*} O valor da propriedade acessada ou `undefined` se o caminho não for válido.
 */
filters.prop = (object, propertyPath) => {
  try {
    return new Function(
      "data",
      `return data${/(^\[$)/.test(propertyPath) ? "" : "."}${propertyPath}`,
    )(object);
  } catch (_error) {
    return undefined;
  }
};
```

### Exemplo de Uso do `prop`

O `prop` é usado para acessar propriedades aninhadas de objetos complexos.

```javascript
const user = {
  name: 'Alice',
  address: {
    city: 'Wonderland',
  },
};

const cityName = filters.prop(user, 'address.city');
console.log(cityName); // 'Wonderland'

const invalidProp = filters.prop(user, 'address.country');
console.log(invalidProp); // undefined
```

## Exemplo com `Echo` e Filters

Quando utilizado no contexto do `Echo`, os filtros são aplicados ao atributo `on` para manipular dados de eventos antes que sejam processados por métodos, atributos ou setters.

```javascript
element.setAttribute(
  'on',
  'sender/message:method/handleMessage|prop=address.city',
);
```

Neste exemplo, o filtro `prop` acessa a propriedade `address.city` dos dados do evento antes de serem processados pelo método `handleMessage`.

### Exemplo Completo

```javascript
import Echo from '@bake-js/-o-id/echo';

class MyElement extends Echo(HTMLElement) {
  handleMessage(cityName) {
    console.log(`Received city: ${cityName}`);
  }
}

customElements.define('my-element', MyElement);

const element = document.querySelector('my-element');
element.setAttribute(
  'on',
  'sender/message:method/handleMessage|prop=address.city',
);

element.dispatchEvent(new CustomEvent('sender/message', {
  detail: { address: { city: 'Wonderland' } },
}));
// Output: 'Received city: Wonderland'
```

## Futuros Filtros

O módulo `filters` está em constante evolução, e novos filtros serão adicionados para fornecer maior controle e manipulação de dados. Exemplos de futuros filtros podem incluir:

- **`map`**: Para aplicar transformações em arrays ou objetos.
- **`uppercase`**: Para transformar strings em letras maiúsculas.
- **`truncate`**: Para cortar strings ou arrays em um tamanho específico.

Esses novos filtros permitirão que os desenvolvedores transformem os dados de eventos de maneira cada vez mais sofisticada e adaptável.

## Comparação com Concorrentes

### Lit e Stencil

- **Filtros Nativos:** Lit e Stencil não fornecem um sistema de filtros para transformação de dados de eventos. O uso de filtros no `Echo` torna a manipulação de dados muito mais flexível.
  
### Vantagens do `Echo` com `filters`

- **Manipulação Dinâmica de Dados:** Os filtros permitem acessar e transformar os dados dos eventos de forma simples, o que torna o `Echo` uma ferramenta mais poderosa para a comunicação entre componentes.
- **Centralização de Lógica:** A lógica de transformação de dados é centralizada, tornando o código mais limpo e fácil de manter.

## Considerações Finais

O módulo `filters` oferece um meio eficiente de transformar e manipular dados no contexto de eventos com o `Echo`. Com o filtro inicial `prop` e a perspectiva de mais filtros no futuro, o `filters` promove flexibilidade e escalabilidade no tratamento de dados em aplicações web. Seja para acessar propriedades aninhadas ou realizar outras transformações, os filtros ampliam significativamente as capacidades do `Echo`.
