# Prevent

O `prevent` é um filtro utilizado junto com o decorator `@on` para prevenir o comportamento padrão de eventos em Web Components. Ele faz parte da biblioteca `@bake-js/-o-id/event`.

## Visão Geral

### Nome e Classificação

- **Nome:** Prevent
- **Classificação:** Filtros de Evento

### Objetivo

O filtro `prevent` é utilizado para impedir que o comportamento padrão de um evento ocorra, como a navegação para um link ou o envio de um formulário.

## Motivação

Usar o filtro `prevent` junto ao decorator `@on` oferece as seguintes vantagens:

1. **Controle Total:** Permite que você impeça comportamentos padrão de eventos, garantindo que a lógica do componente controle o resultado das ações do usuário.
2. **Consistência:** Garante que o comportamento padrão não interfira na lógica personalizada do componente.
3. **Simplificação de Código:** Evita a necessidade de chamar manualmente `preventDefault` em cada listener.

## Aplicabilidade

Ideal para situações onde é necessário evitar o comportamento padrão de eventos, como cliques em links ou envios de formulários, dentro de componentes que possuem interações específicas e controladas.

## Importação

Para utilizar o filtro `prevent`, importe-o da seguinte maneira:

```javascript
import on, { prevent } from '@bake-js/-o-id/event';
```

## Implementação

Aqui está a implementação do filtro `prevent`:

```javascript
function prevent(event) {
  event.preventDefault();
  return event;
}

export default prevent;
```

### Exemplo de Uso

Abaixo está um exemplo de uso do filtro `prevent` com o decorator `@on`:

```javascript
import on, { prevent } from '@bake-js/-o-id/event';

class MyElement extends HTMLElement {
  @on.click('button', prevent)
  handleClick(event) {
    console.log('Button clicked, default action prevented');
  }
}

customElements.define('my-element', MyElement);
```

Neste exemplo, o `prevent` é usado para garantir que a ação padrão do clique no botão (por exemplo, se fosse um link) não ocorra.

## Comparação com Concorrentes

### Implementação Padrão

Em JavaScript padrão, você precisaria chamar `event.preventDefault()` diretamente dentro do handler de evento:

```javascript
class MyElement extends HTMLElement {
  connectedCallback() {
    this.querySelector('button').addEventListener('click', (event) => {
      event.preventDefault();
      console.log('Button clicked, default action prevented');
    });
  }
}

customElements.define('my-element', MyElement);
```

### Vantagens do `prevent`

- **Facilidade de Uso:** Simplifica o código ao eliminar a necessidade de chamadas manuais a `preventDefault`.
- **Integração:** Se integra perfeitamente com o decorator `@on`, tornando a adição de filtros como `prevent` intuitiva e eficiente.

## Considerações Finais

O filtro `prevent` é uma ferramenta útil para controlar o comportamento padrão de eventos em Web Components. Ele melhora a legibilidade e manutenção do código, garantindo que o comportamento do componente seja gerenciado de forma consistente e centralizada.
