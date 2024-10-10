[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# Guia de Uso: Filtro `formData`

O filtro `formData` é uma função que permite converter os dados de um formulário em um objeto JavaScript, facilitando a manipulação e o acesso a esses dados após a submissão do formulário.

### Quando Usar

- **Manipulação de Dados de Formulário**: Ideal para situações em que você precisa capturar dados submetidos por um formulário e convertê-los em um formato mais acessível.
- **Eventos de Submissão**: Útil em manipuladores de eventos de submissão, onde o acesso a dados chave-valor é necessário.

### Como Funciona

A função `formData` utiliza a API `FormData` para coletar os dados do formulário e a função `Object.fromEntries` para converter os pares chave-valor em um objeto JavaScript. Essa abordagem proporciona uma forma eficiente de transformar dados de formulários em um objeto simples.

### Estrutura

```javascript
/**
 * @param {Event} event - O evento que contém os dados do formulário.
 * @returns {Object} Um objeto contendo os dados do formulário.
 */
const formData = (event) => {
  Object.fromEntries(new FormData(event.target, event.submitter));
};
```

### Parâmetros

1. **event** (obrigatório):
   - **Tipo:** `Event`
   - **Descrição:** O evento que contém os dados do formulário, geralmente um evento de submissão.

### Retorno

- **Tipo:** `Object`
- **Descrição:** Um objeto contendo os dados do formulário, onde cada chave corresponde a um nome de campo e cada valor corresponde ao valor do campo.

### Passos para Utilização

1. **Importe o filtro `formData`**:

   ```javascript
   import { formData } from '@bake-js/-o-id/event';
   ```

2. **Utilize o filtro em um manipulador de eventos de submissão**:

   - **Passo 1:** Captura o evento de submissão do formulário.
   - **Passo 2:** Chame a função `formData` passando o evento como argumento.

# Exemplo Prático: Usando o Filtro `formData` com o Decorator `on`

Este exemplo demonstra como usar o filtro `formData` em conjunto com o decorator `on` para manipular a submissão de um formulário em um componente customizado.

### Estrutura do Exemplo

```javascript
import { define } from '@bake-js/-o-id';
import on, { prevent, formData } from '@bake-js/-o-id/event';

@define('my-component')
class MyComponent extends HTMLElement {
  @on.submit('form', prevent, formData)
  handleSubmit(data) {
    console.log(data); // Os dados do formulário são exibidos aqui
  }

  connectedCallback() {
    this.innerHTML = `
      <form>
        <input name="age" />
        <button>Save</button>
      </form>
    `;
  }
}
```

### Descrição do Código

1. **Importação de Módulos**:
   - O componente importa o decorator `define` para registrar o Custom Element.
   - Importa `on`, `prevent`, e `formData` do módulo de eventos.

2. **Definição do Componente**:
   - O componente `my-component` é definido usando o decorator `@define`.

3. **Manipulação da Submissão do Formulário**:
   - O método `handleSubmit` é decorado com `@on.submit`, que escuta o evento de submissão do formulário. 
   - O filtro `prevent` é usado para evitar o comportamento padrão de submissão, e o filtro `formData` converte os dados do formulário em um objeto.
   - Os dados do formulário são passados como argumento para o método `handleSubmit`.

4. **Renderização do Formulário**:
   - No método `connectedCallback`, o HTML do formulário é inserido no componente.
   - O formulário contém um campo de entrada (`input`) para a idade e um botão de envio.

### Comportamento do Componente

- Quando o botão "Save" é clicado, o evento de submissão é acionado.
- O comportamento padrão de submissão é prevenido, e os dados do formulário são coletados e convertidos em um objeto JavaScript.
- O objeto de dados é então passado para o método `handleSubmit`, onde pode ser manipulado como necessário (neste caso, exibido no console).

### Exemplo de Uso

Ao preencher o campo de entrada e clicar no botão "Save", os dados do formulário serão exibidos no console no formato:

```javascript
{ age: '30' } // Exemplo de dado coletado
```

### Benefícios do Uso

- **Simplicidade**: O uso de `formData` torna fácil a conversão dos dados do formulário em um formato utilizável.
- **Integração com Decorators**: A combinação de decorators permite uma abordagem declarativa para manipulação de eventos, resultando em código mais limpo e organizado.
- **Evitando Comportamento Padrão**: O uso do filtro `prevent` assegura que o formulário não seja enviado de forma tradicional, permitindo que você controle como os dados são processados.

### Considerações Finais

Este exemplo ilustra a eficácia de utilizar filtros e decorators no desenvolvimento de componentes web, proporcionando uma maneira eficiente e organizada de lidar com eventos e dados de formulários.
