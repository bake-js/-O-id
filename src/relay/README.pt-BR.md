[🇧🇷 Read in Portuguese](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# Módulo Relay do **-O-id**

O módulo **Relay** do **-O-id** fornece uma maneira eficaz de observar eventos emitidos pelo elemento pai de um Web Component. Através de decorators, você pode facilmente associar eventos do elemento pai a métodos específicos, mantendo seu código organizado e eficiente.

## Introdução

O **-O-id** simplifica a escuta de eventos do elemento pai em Web Components por meio de decorators que permitem a vinculação direta de eventos do `parentElement` a métodos. Com o suporte a filtros e uma abordagem declarativa, o módulo **Relay** facilita o gerenciamento de eventos em hierarquias de componentes.

## Importação do Decorator

Para utilizar o módulo Relay, importe-o da seguinte forma:

```javascript
import relay from '@bake-js/-o-id/relay';
```

## Principais Funcionalidades

### Escuta de Eventos do Pai

O decorator `@relay` permite que um Web Component escute eventos emitidos pelo seu `parentElement`. Este decorator adiciona um event listener no `parentElement` quando o componente é conectado ao DOM e o remove automaticamente quando o componente é desconectado. A escuta de eventos é feita de maneira eficiente e declarativa.

### Uso do `@relay`

O `@relay` pode mapear qualquer evento do `parentElement` para um método específico. Aqui está como você pode usá-lo:

```javascript
@relay.changed(prevent, stop)
handleChanged(event) {
  console.log('Evento "changed" recebido do parentElement');
}

@relay.updated(stop)
handleUpdated(event) {
  console.log('Evento "updated" recebido do parentElement');
}
```

### Filtros Disponíveis

Assim como no módulo Event, os filtros permitem manipular e processar eventos antes de serem passados para os métodos vinculados. Os filtros disponíveis incluem:

- **`prevent`**: Interrompe o comportamento padrão do evento.
- **`stop`**: Interrompe a propagação do evento no DOM.

### Estrutura do Decorator

O decorator `@relay` é projetado para ser simples e intuitivo. Ele gera decorators dinamicamente com base no tipo de evento. Diferente do `@on`, ele não requer um seletor, já que o evento é sempre escutado no pai do elemento.

## Exemplos de Uso

### Exemplo 1: Escuta de Evento "changed"

```javascript
@relay.changed(prevent, stop)
handleChanged(event) {
  console.log('O pai emitiu um evento "changed"');
}
```

### Exemplo 2: Escuta de Evento "updated"

```javascript
@relay.updated(stop)
handleUpdated(event) {
  console.log('O pai emitiu um evento "updated"');
}
```

## Conclusão

O decorator `@relay` simplifica a escuta de eventos do `parentElement`, oferecendo uma abordagem declarativa e flexível para o desenvolvimento de Web Components. Com ele, você pode facilmente reagir a eventos emitidos pelo elemento pai, mantendo a clareza e a modularidade no código. É uma solução poderosa que facilita a criação de interações dinâmicas em aplicações modernas.

Experimente o **-O-id** e descubra como o módulo **Relay** pode otimizar o gerenciamento de eventos em seus Web Components!
