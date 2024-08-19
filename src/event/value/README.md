# Value

O `value` é um filtro utilizado com o decorator `@on` para extrair o valor de um campo de entrada de um evento. Ele faz parte da biblioteca `@bake-js/-o-id/event`.

## Visão Geral

### Nome e Classificação

- **Nome:** Value
- **Classificação:** Filtros de Evento

### Objetivo

O filtro `value` é utilizado para extrair o valor do campo de entrada (input) associado ao evento, facilitando a manipulação e acesso ao valor do campo.

## Motivação

Usar o filtro `value` oferece as seguintes vantagens:

1. **Facilidade de Acesso:** Permite acessar diretamente o valor do campo de entrada do evento.
2. **Simplicidade:** Simplifica o código ao fornecer uma forma direta e eficiente de obter o valor do campo de entrada.
3. **Centralização de Lógica:** Elimina a necessidade de acessar o valor do campo de entrada manualmente em cada handler de evento.

## Aplicabilidade

Ideal para situações onde é necessário trabalhar com o valor de um campo de entrada em eventos, como ao processar a entrada do usuário ou ao validar os dados inseridos.

## Importação

Para utilizar o filtro `value`, importe-o da seguinte maneira:

```javascript
import on, { value } from '@bake-js/-o-id/event';
```

## Implementação

Aqui está a implementação do filtro `value`:

```javascript
/**
 * Filtro que extrai o valor de um campo de entrada associado ao evento.
 *
 * @param event - O evento que contém o campo de entrada.
 * @returns O valor do campo de entrada.
 */
function value(event) {
  return event?.target?.value;
}

export default value;
```

### Exemplo de Uso

Abaixo está um exemplo de uso do filtro `value` com o decorator `@on`:

```javascript
import on, { value } from '@bake-js/-o-id/event';

class MyInputElement extends HTMLElement {
  @on.input('input', value)
  handleInput(value) {
    console.log('Input value:', value);
  }
}

customElements.define('my-input-element', MyInputElement);
```

Neste exemplo, o filtro `value` é usado para extrair o valor do campo de entrada e registrá-lo no console sempre que o usuário digita algo no campo.

## Comparação com Concorrentes

### Implementação Padrão

Em JavaScript padrão, você precisaria acessar o valor do campo de entrada manualmente dentro do handler de evento:

```javascript
class MyInputElement extends HTMLElement {
  connectedCallback() {
    this.querySelector('input').addEventListener('input', (event) => {
      const value = event.target.value;
      console.log('Input value:', value);
    });
  }
}

customElements.define('my-input-element', MyInputElement);
```

### Vantagens do `value`

- **Facilidade de Uso:** Simplifica a extração do valor do campo de entrada, eliminando a necessidade de código adicional para acessar o valor.
- **Integração:** Se integra perfeitamente com o decorator `@on`, tornando a adição de filtros como `value` intuitiva e eficiente.

## Considerações Finais

O filtro `value` oferece uma maneira prática e direta de acessar o valor dos campos de entrada dos eventos, melhorando a legibilidade e manutenção do código ao centralizar a lógica de extração do valor do campo de entrada.
