# Guia de Uso: Decorator `connected`

O decorator `connected` é uma ferramenta poderosa que permite adicionar lógica ao método `connectedCallback` de Custom Elements. Ele intercepta o momento em que o elemento é inserido no DOM, chamando automaticamente o método decorado, permitindo que você execute lógica personalizada ao conectar o elemento.

### Quando Usar

- **Executar Lógica ao Conectar ao DOM**: Útil para executar tarefas como inicialização de dados, configuração de listeners ou atualização da interface do usuário quando o elemento for adicionado ao DOM.
- **Centralizar a Lógica de Conexão**: Ajuda a manter o código organizado ao gerenciar o comportamento do ciclo de vida do componente.

### Como Funciona

O decorator `connected` intercepta o `connectedCallback`, permitindo que o método decorado seja chamado automaticamente sempre que o Custom Element for adicionado ao DOM. Ele faz uso de um interceptor para garantir que a lógica definida no método decorado seja executada na hora certa.

### Estrutura

```javascript
/**
 * @param {Object} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} Um decorator que intercepta a chamada do `connectedCallback`.
 */
const connected = (target, propertyKey) => {
  // Cria uma instância do interceptor para o método `connectedCallback`.
  const interceptor = intercept(connectedCallback);

  // Adiciona o método decorado à lista de callbacks a serem executados.
  interceptor
    .in(target) // Define o alvo do interceptor.
    .then(exec(propertyKey)); // Define o método a ser executado pelo interceptor.
};

export default connected;
```

### Parâmetros

1. **target** (obrigatório):
   - **Tipo:** `Object`
   - **Descrição:** O alvo do decorator, normalmente a classe do Custom Element. Esse parâmetro define o contexto no qual o interceptor operará, permitindo que o método decorado seja interceptado corretamente.

2. **propertyKey** (obrigatório):
   - **Tipo:** `string`
   - **Descrição:** O nome do método decorado. Este método será executado quando o `connectedCallback` for disparado.

### Passos para Utilização

1. **Importe o decorator `connected`**:

   ```javascript
   import { connected } from '@bake-js/-o-id';
   ```

2. **Aplique o decorator ao método que deverá ser chamado quando o Custom Element for conectado ao DOM**:
   
   - **Passo 1:** Escolha um método da classe que deverá ser executado ao inserir o elemento no DOM.
   - **Passo 2:** Use o decorator diretamente sobre esse método.

3. **Implemente a lógica de conexão**:
   
   - Defina o comportamento desejado dentro do método decorado. Esse método será chamado automaticamente ao conectar o elemento ao DOM.

### Exemplo Prático

**Caso 1: Executando código quando o elemento é conectado ao DOM**

Aqui está um exemplo de como usar o `connected` para adicionar lógica ao ciclo de vida de conexão de um Custom Element:

```javascript
import { connected, define } from '@bake-js/-o-id';

@define('my-element')
class MyElement extends HTMLElement {
  @connected
  handleConnected() {
    console.log('O elemento foi conectado ao DOM.');
  }
}
```

**Explicação:**
- O método `handleConnected` será chamado automaticamente quando o elemento `MyElement` for adicionado ao DOM.
- A mensagem `'O elemento foi conectado ao DOM.'` será exibida no console.

**Caso 2: Inicializando o estado do componente ao ser conectado**

Em outro cenário, podemos usar o `connected` para inicializar o estado do componente ao conectá-lo ao DOM:

```javascript
import { connected, define } from '@bake-js/-o-id';

@defing('stateful-element')
class StatefulElement extends HTMLElement {
  constructor() {
    super();
    this.state = { initialized: false };
  }

  @connected
  initialize() {
    this.state.initialized = true;
    console.log('Componente inicializado ao conectar ao DOM.');
  }
}
```

**Explicação:**
- O método `initialize` será chamado automaticamente quando o `StatefulElement` for conectado ao DOM.
- A propriedade `state.initialized` será definida como `true`, e a mensagem `'Componente inicializado ao conectar ao DOM.'` será exibida no console.

### Benefícios do Decorator `connected`

1. **Organização de Código**: Ao usar o `connected`, você mantém a lógica do ciclo de vida do componente organizada e centralizada, sem necessidade de lidar diretamente com o `connectedCallback`.
2. **Interceptação Inteligente**: O decorator faz uso do interceptor interno para garantir que o método decorado seja chamado no momento certo, sem a necessidade de código boilerplate.
3. **Reuso de Lógica**: A lógica que precisa ser executada quando o componente é conectado pode ser facilmente aplicada em diferentes elementos, aumentando a reutilização do código.

### Considerações Finais

O decorator `connected` é uma solução eficaz para gerenciar o comportamento de Custom Elements quando eles são adicionados ao DOM. Ao interceptar o método `connectedCallback`, ele permite a execução de lógica personalizada de forma elegante, promovendo um código limpo e mantendo a separação de responsabilidades.
