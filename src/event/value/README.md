# Guia de Uso: Filtro `value`

O filtro `value` é uma função que permite extrair o valor de um campo de entrada associado ao evento. Este filtro é especialmente útil em manipuladores de eventos que lidam com campos de formulários e elementos de entrada.

### Quando Usar

- **Obtenção de Valores de Input**: Ideal para situações em que é necessário capturar o valor inserido pelo usuário em campos de entrada, como caixas de texto, áreas de texto ou seletores.
- **Manipulação de Formulários**: Útil em manipulações de formulários, permitindo que você obtenha rapidamente os dados inseridos pelos usuários.

### Como Funciona

A função `value` acessa o campo de entrada que gerou o evento e retorna seu valor. Se o evento ou o campo de entrada não estiverem presentes, a função retorna `undefined`, evitando erros em situações inesperadas.

### Estrutura

```javascript
/**
 * @param {Event} event - O evento que contém o campo de entrada.
 * @returns {string|undefined} O valor do campo de entrada, ou `undefined` se o campo não estiver presente.
 */
function value(event) {
  return event.target.value;
}
```

### Parâmetros

1. **event** (obrigatório):
   - **Tipo:** `Event`
   - **Descrição:** O evento que contém o campo de entrada, geralmente um evento de interação do usuário, como `input` ou `change`.

### Retorno

- **Tipo:** `string | undefined`
- **Descrição:** O valor do campo de entrada, caso esteja presente. Retorna `undefined` se o campo não estiver acessível, garantindo que o código não falhe em situações onde o evento não contém um campo de entrada.

### Passos para Utilização

1. **Importe o filtro `value`**:

   ```javascript
   import { value } from '@bake-js/-o-id/event';
   ```

2. **Utilize o filtro em um manipulador de eventos**:

   - **Passo 1:** Capture o evento que você deseja manipular.
   - **Passo 2:** Chame a função `value`, passando o evento como argumento.

### Exemplo Prático: Usando o Filtro `value` em um Componente

Este exemplo demonstra como usar o filtro `value` para capturar o valor de um campo de entrada dentro de um componente customizado.

### Estrutura do Exemplo

```javascript
import { define } from '@bake-js/-o-id';
import on, { value } from '@bake-js/-o-id/event';

@define('my-input-component')
class MyInputComponent extends HTMLElement {
  @on.input('input', value)
  handleInput(event) {
    const inputValue = value(event);
    console.log('Valor do input:', inputValue);
    // Outras operações com inputValue podem ser realizadas aqui
  }

  connectedCallback() {
    this.innerHTML = `
      <div>
        <input type="text" placeholder="Digite algo...">
      </div>
    `;
  }
}
```

### Descrição do Código

1. **Importação de Módulos**:
   - O componente importa o decorator `define` para registrar o Custom Element.
   - Importa `on` e `value` do módulo de eventos.

2. **Definição do Componente**:
   - O componente `my-input-component` é definido usando o decorator `@define`.

3. **Manipulação do Input**:
   - O método `handleInput` é decorado com `@on.input`, que escuta o evento de entrada no campo de texto.
   - O valor do campo de entrada é obtido usando o filtro `value`, que é então exibido no console.

4. **Renderização do Campo de Entrada**:
   - No método `connectedCallback`, o HTML do campo de entrada é inserido no componente.

### Comportamento do Componente

- Quando o usuário digita algo no campo de entrada, o valor é capturado e exibido no console em tempo real.
- Isso permite que você execute outras operações com o valor, como validação ou atualização de estado.

### Exemplo de Uso

Ao digitar "Olá" no campo de entrada, a mensagem "Valor do input: Olá" será exibida no console.

### Benefícios do Uso

- **Facilidade de Captura**: Simplifica o processo de captura de valores de entrada, permitindo que você escreva código mais limpo e compreensível.
- **Integração com Decorators**: O uso do filtro `value` em conjunto com decorators permite uma abordagem declarativa para manipulação de eventos, resultando em um código mais organizado.

### Considerações Finais

Este exemplo demonstra a utilidade do filtro `value` no desenvolvimento de componentes web, proporcionando uma maneira eficaz de capturar e manipular valores de entrada dos usuários, essencial para interações ricas e dinâmicas.
