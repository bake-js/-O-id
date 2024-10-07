# Guia de Uso: Decorator `disconnected`

O decorator `disconnected` é projetado para interceptar o momento em que um Custom Element é removido do DOM, permitindo que você adicione lógica personalizada quando o método `disconnectedCallback` for invocado. Essa abordagem torna a manipulação do ciclo de vida do componente mais limpa e organizada.

### Quando Usar

- **Gerenciamento de Limpeza**: Ideal para executar lógica de limpeza, como a remoção de listeners de eventos, cancelamento de timers ou desconexão de observadores quando o elemento for removido do DOM.
- **Evitar Vazamentos de Memória**: Útil para liberar recursos e evitar vazamentos de memória, especialmente ao trabalhar com componentes de longa duração.

### Como Funciona

O decorator `disconnected` intercepta o `disconnectedCallback`, chamando o método decorado sempre que o elemento for removido do DOM. Isso centraliza a lógica necessária, garantindo que ela seja executada no momento correto.

### Estrutura

```javascript
/**
 * @param {Object} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} Um decorator que intercepta a chamada do `disconnectedCallback`.
 */
const disconnected = (target, propertyKey) => {
  // Cria uma instância do interceptor para o método `disconnectedCallback`.
  const interceptor = intercept(disconnectedCallback);

  // Adiciona o método decorado à lista de callbacks a serem executados.
  return interceptor
    .in(target) // Define o alvo do interceptor.
    .then(exec(propertyKey)); // Define o método a ser executado pelo interceptor.
};

export default disconnected;
```

### Parâmetros

1. **target** (obrigatório):
   - **Tipo:** `Object`
   - **Descrição:** O alvo do decorator, normalmente a classe do Custom Element. Define o contexto onde o método decorado será interceptado.

2. **propertyKey** (obrigatório):
   - **Tipo:** `string`
   - **Descrição:** O nome do método decorado. Esse método será chamado automaticamente quando o `disconnectedCallback` for disparado.

### Passos para Utilização

1. **Importe o decorator `disconnected`**:

   ```javascript
   import { disconnected } from '@bake-js/-o-id';
   ```

2. **Aplique o decorator ao método que deverá ser chamado quando o Custom Element for removido do DOM**:
   
   - **Passo 1:** Identifique o método que deverá executar a lógica de remoção.
   - **Passo 2:** Aplique o decorator diretamente sobre esse método.

3. **Implemente a lógica de desconexão**:

   - Defina o comportamento necessário no método decorado. O método será automaticamente invocado ao remover o componente do DOM.

### Exemplo Prático

**Caso 1: Limpando listeners ao remover o elemento do DOM**

Aqui está um exemplo de como utilizar o `disconnected` para garantir que os event listeners sejam removidos ao desconectar o Custom Element:

```javascript
import { define, disconnected } from '@bake-js/-o-id';

@define('my-element')
class MyElement extends HTMLElement {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    document.addEventListener('click', this.handleClick);
  }

  handleClick() {
    console.log('Documento clicado');
  }

  @disconnected
  cleanUp() {
    document.removeEventListener('click', this.handleClick);
    console.log('Listeners removidos ao desconectar o elemento do DOM.');
  }
}
```

**Explicação:**
- Quando o `MyElement` é removido do DOM, o método `cleanUp` é invocado automaticamente, garantindo que os event listeners sejam removidos, evitando vazamentos de memória.

**Caso 2: Cancelando timers ao desconectar o elemento**

Um segundo exemplo mostra como podemos cancelar um timer ao remover o componente do DOM:

```javascript
import { define, disconnected } from '@bake-js/-o-id';

@define('timer-element')
class TimerElement extends HTMLElement {
  constructor() {
    super();
    this.timer = setInterval(() => {
      console.log('Timer ativo');
    }, 1000);
  }

  @disconnected
  stopTimer() {
    clearInterval(this.timer);
    console.log('Timer cancelado ao desconectar o elemento.');
  }
}
```

**Explicação:**
- O método `stopTimer` é chamado automaticamente ao remover o `TimerElement` do DOM, garantindo que o `setInterval` seja limpo corretamente.

### Benefícios do Decorator `disconnected`

1. **Centralização da Lógica**: A lógica de remoção é automaticamente chamada quando o elemento é removido do DOM, sem a necessidade de implementar diretamente o `disconnectedCallback`.
2. **Limpeza Automática de Recursos**: O decorator facilita a execução de rotinas de limpeza, como remover listeners de eventos ou cancelar timers, mantendo o código claro e organizado.
3. **Proteção Contra Vazamentos**: Ajuda a proteger contra vazamentos de memória, garantindo que recursos não utilizados sejam liberados corretamente ao remover o elemento.

### Considerações Finais

O decorator `disconnected` oferece uma solução prática e eficiente para lidar com a desconexão de Custom Elements do DOM, facilitando o gerenciamento de recursos e promovendo uma abordagem mais limpa para o ciclo de vida dos componentes.
