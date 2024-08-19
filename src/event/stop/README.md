# Stop

O `stop` é um filtro utilizado junto com o decorator `@on` para prevenir a propagação de eventos em Web Components. Ele faz parte da biblioteca `@bake-js/-o-id/event`.

## Visão Geral

### Nome e Classificação

- **Nome:** Stop
- **Classificação:** Filtros de Evento

### Objetivo

O filtro `stop` é utilizado para interromper a propagação de um evento dentro de um Web Component, garantindo que o evento não se propague para elementos ancestrais.

## Motivação

Usar o filtro `stop` junto ao decorator `@on` oferece as seguintes vantagens:

1. **Controle de Eventos:** Facilita o controle sobre a propagação de eventos em componentes complexos.
2. **Isolamento de Comportamento:** Garante que a lógica de um evento não afete outros componentes, mantendo um comportamento isolado.
3. **Simplificação de Código:** Evita a necessidade de chamar manualmente `stopPropagation` em cada listener.

## Aplicabilidade

Ideal para situações onde é necessário evitar a propagação de eventos, como cliques ou teclas pressionadas, em componentes que possuem interações específicas e isoladas.

## Importação

Para utilizar o filtro `stop`, importe-o da seguinte maneira:

```javascript
import on, { stop } from '@bake-js/-o-id/event';
```

## Implementação

Aqui está a implementação do filtro `stop`:

```javascript
/**
 * Filtro que interrompe a propagação de um evento.
 *
 * @param event - O evento a ser filtrado.
 * @returns O próprio evento, após interromper a propagação.
 */
function stop(event) {
  event.stopPropagation();
  return event;
}

export default stop;
```

### Exemplo de Uso

Abaixo está um exemplo de uso do filtro `stop` com o decorator `@on`:

```javascript
import on, { stop } from '@bake-js/-o-id/event';

class MyElement extends HTMLElement {
  @on.click('button', stop)
  handleClick(event) {
    console.log('Button clicked, propagation stopped');
  }
}

customElements.define('my-element', MyElement);
```

Neste exemplo, o `stop` é usado para garantir que o clique no botão não se propague além do elemento.

## Comparação com Concorrentes

### Implementação Padrão

Em JavaScript padrão, você precisaria chamar `event.stopPropagation()` diretamente dentro do handler de evento:

```javascript
class MyElement extends HTMLElement {
  connectedCallback() {
    this.querySelector('button').addEventListener('click', (event) => {
      event.stopPropagation();
      console.log('Button clicked, propagation stopped');
    });
  }
}

customElements.define('my-element', MyElement);
```

### Vantagens do `stop`

- **Facilidade de Uso:** Simplifica o código ao eliminar a necessidade de chamadas manuais a `stopPropagation`.
- **Integração:** Se integra perfeitamente com o decorator `@on`, tornando a adição de filtros como `stop` intuitiva e eficiente.

## Considerações Finais

O filtro `stop` é uma ferramenta poderosa para controlar a propagação de eventos em Web Components. Ele torna o código mais limpo, fácil de manter e garante que a lógica de eventos permaneça isolada e consistente.
