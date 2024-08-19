# FormData

O `formData` é um filtro utilizado com o decorator `@on` para extrair e transformar os dados de um formulário em um objeto. Ele faz parte da biblioteca `@bake-js/-o-id/event`.

## Visão Geral

### Nome e Classificação

- **Nome:** FormData
- **Classificação:** Filtros de Evento

### Objetivo

O filtro `formData` é utilizado para converter os dados de um formulário em um objeto JavaScript, facilitando a manipulação e acesso aos valores dos campos do formulário.

## Motivação

Usar o filtro `formData` oferece as seguintes vantagens:

1. **Facilidade de Acesso:** Permite acessar os dados do formulário em um formato de objeto, facilitando a manipulação e uso dos valores.
2. **Centralização de Lógica:** Elimina a necessidade de conversão manual dos dados do formulário em cada handler de evento.
3. **Simplicidade:** Simplifica o código ao fornecer uma forma direta e eficiente de acessar os dados do formulário.

## Aplicabilidade

Ideal para situações onde é necessário trabalhar com os dados de um formulário em um formato de objeto, especialmente quando se precisa manipular ou validar esses dados antes de enviá-los ou processá-los.

## Importação

Para utilizar o filtro `formData`, importe-o da seguinte maneira:

```javascript
import on, { formData } from '@bake-js/-o-id/event';
```

## Implementação

Aqui está a implementação do filtro `formData`:

```javascript
/**
 * Filtro que converte os dados de um formulário em um objeto.
 *
 * @param event - O evento que contém os dados do formulário.
 * @returns Um objeto contendo os dados do formulário.
 */
const formData = (event) =>
  Object.fromEntries(new FormData(event.target, event.submitter));

export default formData;
```

### Exemplo de Uso

Abaixo está um exemplo de uso do filtro `formData` com o decorator `@on`:

```javascript
import on, { formData } from '@bake-js/-o-id/event';

class MyFormElement extends HTMLElement {
  @on.submit('form', formData)
  handleSubmit(data) {
    console.log('Form data:', data);
  }
}

customElements.define('my-form-element', MyFormElement);
```

Neste exemplo, o `formData` é usado para converter os dados do formulário em um objeto, que é então registrado no console quando o formulário é enviado.

## Comparação com Concorrentes

### Implementação Padrão

Em JavaScript padrão, você precisaria converter os dados do formulário manualmente dentro do handler de evento:

```javascript
class MyFormElement extends HTMLElement {
  connectedCallback() {
    this.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const dataObject = Object.fromEntries(formData);
      console.log('Form data:', dataObject);
    });
  }
}

customElements.define('my-form-element', MyFormElement);
```

### Vantagens do `formData`

- **Facilidade de Uso:** Simplifica a conversão de dados do formulário em um objeto, eliminando a necessidade de código adicional para manipulação.
- **Integração:** Se integra perfeitamente com o decorator `@on`, tornando a adição de filtros como `formData` intuitiva e eficiente.

## Considerações Finais

O filtro `formData` oferece uma maneira prática e direta de acessar os dados dos formulários como um objeto, melhorando a legibilidade e manutenção do código ao centralizar a lógica de conversão dos dados do formulário.
