[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# Guia de Uso: Filtro `prevent`

O filtro `prevent` é uma função que impede o comportamento padrão de um evento, permitindo que você tenha controle total sobre a manipulação do evento em seu código.

### Quando Usar

- **Prevenção de Comportamento Padrão**: Ideal para situações em que você precisa evitar a ação padrão associada a um evento, como a submissão de um formulário ou o comportamento de um botão.
- **Manipulação de Eventos**: Útil em manipuladores de eventos onde a ação padrão não é desejada e você deseja implementar um comportamento customizado.

### Como Funciona

A função `prevent` chama o método `preventDefault` do evento, evitando que a ação padrão associada ao evento seja executada. Após impedir o comportamento padrão, o próprio evento é retornado, permitindo que outras operações sejam realizadas com o evento modificado.

### Estrutura

```javascript
/**
 * @param {Event} event - O evento a ser filtrado.
 * @returns {Event} O próprio evento, após impedir o comportamento padrão.
 */
function prevent(event) {
  event.preventDefault();
  return event
}
```

### Parâmetros

1. **event** (obrigatório):
   - **Tipo:** `Event`
   - **Descrição:** O evento que será filtrado para impedir seu comportamento padrão.

### Retorno

- **Tipo:** `Event`
- **Descrição:** O próprio evento, permitindo que você continue a manipulação após impedir a ação padrão.

### Passos para Utilização

1. **Importe o filtro `prevent`**:

   ```javascript
   import { prevent } from '@bake-js/-o-id/event';
   ```

2. **Utilize o filtro em um manipulador de eventos**:

   - **Passo 1:** Captura o evento que você deseja modificar.
   - **Passo 2:** Chame a função `prevent` passando o evento como argumento.

### Exemplo Prático: Usando o Filtro `prevent` com o Decorator `on`

Este exemplo demonstra como usar o filtro `prevent` em conjunto com o decorator `on` para controlar a submissão de um formulário em um componente customizado.

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
- O comportamento padrão de submissão é prevenido, permitindo que você controle como os dados são processados.
- O objeto de dados do formulário é então passado para o método `handleSubmit`, onde pode ser manipulado como necessário (neste caso, exibido no console).

### Exemplo de Uso

Ao preencher o campo de entrada e clicar no botão "Save", os dados do formulário serão exibidos no console no formato:

```javascript
{ age: '30' } // Exemplo de dado coletado
```

### Benefícios do Uso

- **Controle Total**: A função `prevent` proporciona controle total sobre o comportamento do evento, permitindo que você evite ações indesejadas.
- **Integração com Decorators**: A combinação de decorators permite uma abordagem declarativa para manipulação de eventos, resultando em código mais limpo e organizado.

### Considerações Finais

Este exemplo ilustra a eficácia de utilizar filtros e decorators no desenvolvimento de componentes web, proporcionando uma maneira eficiente e organizada de lidar com eventos e evitar comportamentos padrão indesejados.
