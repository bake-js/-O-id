[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# Guia de Uso: Filtro `stop`

O filtro `stop` é uma função que permite interromper a propagação de um evento no DOM, evitando que ele seja transmitido para outros elementos que possam estar ouvindo o mesmo evento.

### Quando Usar

- **Interrupção de Eventos**: Ideal em situações onde você deseja evitar que eventos sejam processados em elementos ancestrais ou irmãos, como prevenir efeitos colaterais indesejados.
- **Eventos Complexos**: Útil em manipuladores de eventos que precisam isolar a ação de um evento específico, garantindo que a lógica não afete outros componentes.

### Como Funciona

A função `stop` utiliza o método `stopPropagation` do objeto `Event` para evitar que o evento continue sua propagação para outros elementos no DOM. Após interromper a propagação, a função retorna o próprio evento, permitindo que você realize outras operações com ele.

### Estrutura

```javascript
/**
 * @param {Event} event - O evento a ser filtrado.
 * @returns {Event} O próprio evento, após interromper a propagação.
 */
function stop(event) {
  event.stopPropagation();
  return event
}
```

### Parâmetros

1. **event** (obrigatório):
   - **Tipo:** `Event`
   - **Descrição:** O evento a ser filtrado, geralmente um evento de interação do usuário, como um clique ou um movimento do mouse.

### Retorno

- **Tipo:** `Event`
- **Descrição:** O próprio evento, após a interrupção da propagação, permitindo que você execute operações adicionais com o evento modificado.

### Passos para Utilização

1. **Importe o filtro `stop`**:

   ```javascript
   import { stop } from '@bake-js/-o-id/event';
   ```

2. **Utilize o filtro em um manipulador de eventos**:

   - **Passo 1:** Capture o evento que você deseja manipular.
   - **Passo 2:** Chame a função `stop`, passando o evento como argumento.

# Exemplo Prático: Usando o Filtro `stop` com o Decorator `on`

Este exemplo demonstra como usar o filtro `stop` em conjunto com o decorator `on` para interromper a propagação de um evento de clique em um botão dentro de um componente customizado.

### Estrutura do Exemplo

```javascript
import { define } from '@bake-js/-o-id';
import on, { stop } from '@bake-js/-o-id/event';

@define('my-component')
class MyComponent extends HTMLElement {
  @on.click('button', stop)
  handleClick(event) {
    console.log('Botão clicado!'); // Mensagem exibida no console
    // A propagação do evento é interrompida aqui
  }

  connectedCallback() {
    this.innerHTML = `
      <div>
        <button>Click Me!</button>
      </div>
    `;
  }
}
```

### Descrição do Código

1. **Importação de Módulos**:
   - O componente importa o decorator `define` para registrar o Custom Element.
   - Importa `on` e `stop` do módulo de eventos.

2. **Definição do Componente**:
   - O componente `my-component` é definido usando o decorator `@define`.

3. **Manipulação do Clique do Botão**:
   - O método `handleClick` é decorado com `@on.click`, que escuta o evento de clique no botão.
   - O filtro `stop` é aplicado para interromper a propagação do evento, garantindo que ele não alcance elementos ancestrais.

4. **Renderização do Botão**:
   - No método `connectedCallback`, o HTML do botão é inserido no componente.

### Comportamento do Componente

- Quando o botão "Click Me!" é clicado, a mensagem "Botão clicado!" é exibida no console.
- A propagação do evento de clique é interrompida, evitando que o evento seja processado por outros manipuladores de eventos que possam estar associados a elementos ancestrais.

### Exemplo de Uso

Ao clicar no botão, a mensagem "Botão clicado!" será exibida no console, e a propagação do evento será interrompida, evitando ações adicionais em elementos superiores.

### Benefícios do Uso

- **Controle Total**: Permite que você controle a propagação de eventos, evitando efeitos colaterais indesejados em sua aplicação.
- **Integração com Decorators**: O uso do filtro `stop` em combinação com decorators permite uma abordagem declarativa para manipulação de eventos, resultando em um código mais organizado e limpo.

### Considerações Finais

Este exemplo demonstra a utilidade do filtro `stop` no desenvolvimento de componentes web, proporcionando uma maneira eficaz de gerenciar a propagação de eventos e garantindo que sua lógica de aplicação se mantenha isolada e controlada.
