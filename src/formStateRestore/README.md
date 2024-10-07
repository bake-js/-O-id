# Guia de Uso: Decorator `formStateRestore`

O decorator `formStateRestore` é projetado para adicionar lógica personalizada ao método `formStateRestoreCallback` de um Custom Element. Este método é automaticamente chamado quando o estado do formulário ao qual o elemento pertence é restaurado, permitindo que você execute ações específicas nesse momento.

### Quando Usar

- **Restauração de Estado**: Ideal para Custom Elements que precisam restaurar seu estado visual ou interno quando o estado do formulário é recuperado.
- **Validação de Dados**: Útil para revalidar dados ou ajustar visualmente o elemento de acordo com o estado restaurado do formulário.

### Como Funciona

O decorator `formStateRestore` é aplicado a um método que deve ser chamado automaticamente sempre que o estado do formulário associado ao Custom Element for restaurado. Isso permite que a lógica necessária para gerenciar a restauração seja encapsulada e organizada de forma eficaz.

### Estrutura

```javascript
/**
 * @param {Object} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} Um decorator que intercepta a chamada do `formStateRestoreCallback`.
 */
const formStateRestore = (target, propertyKey) => {
  // Cria uma instância do interceptor para o método `formStateRestoreCallback`.
  const interceptor = intercept(formStateRestoreCallback);

  // Adiciona o método decorado à lista de callbacks a serem executados.
  return interceptor
    .in(target) // Define o alvo do interceptor.
    .then(exec(propertyKey)); // Define o método a ser executado pelo interceptor.
};

export default formStateRestore;
```

### Parâmetros

1. **target** (obrigatório):
   - **Tipo:** `Object`
   - **Descrição:** O alvo do decorator, geralmente a classe do Custom Element. Define o contexto onde o método decorado será interceptado.

2. **propertyKey** (obrigatório):
   - **Tipo:** `string`
   - **Descrição:** O nome do método decorado. Este método será chamado automaticamente quando o `formStateRestoreCallback` for disparado.

### Passos para Utilização

1. **Importe o decorator `formStateRestore`**:

   ```javascript
   import { formStateRestore } from '@bake-js/-o-id';
   ```

2. **Aplique o decorator ao método que deverá ser chamado quando o estado do formulário for restaurado**:
   
   - **Passo 1:** Identifique o método que deve executar a lógica após a restauração do estado do formulário.
   - **Passo 2:** Aplique o decorator diretamente sobre esse método.

3. **Implemente a lógica de restauração**:

   - Defina o comportamento necessário no método decorado. O método será automaticamente invocado ao restaurar o estado do componente no formulário.

### Exemplo Prático

**Caso 1: Notificando sobre a restauração do estado do formulário**

Aqui está um exemplo de como utilizar o `formStateRestore` para notificar quando o estado do formulário é restaurado:

```javascript
import { define, formStateRestore } from '@bake-js/-o-id';

@define('my-element')
class MyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  @formStateRestore
  handleFormStateRestore() {
    console.log('O estado do formulário foi restaurado.');
  }
}
```

**Explicação:**
- O método `handleFormStateRestore` é chamado automaticamente quando o estado do formulário que contém o `MyElement` é restaurado, permitindo que você execute a lógica necessária nesse momento.

**Caso 2: Restaurando valores de entrada ao estado anterior**

Um segundo exemplo mostra como você pode restaurar valores específicos de um elemento após a restauração do estado do formulário:

```javascript
import { define, formStateRestore } from '@bake-js/-o-id';

@define('custom-input')
class CustomInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.input = document.createElement('input');
    this.shadowRoot.appendChild(this.input);
    this.defaultValue = 'Valor Padrão'; // Valor padrão
  }

  @formStateRestore
  handleFormStateRestore() {
    // Restaura o valor do input ao valor padrão após a restauração do estado.
    this.input.value = this.defaultValue;
    console.log('O valor do input foi restaurado para o padrão.');
  }
}
```

**Explicação:**
- O método `handleFormStateRestore` é chamado automaticamente ao restaurar o estado do formulário que contém o `CustomInput`, permitindo que o valor do input seja restaurado para um padrão específico.

### Benefícios do Decorator `formStateRestore`

1. **Gerenciamento Eficiente**: Permite que a lógica de restauração seja centralizada em um único método, facilitando a manutenção e o entendimento do código.
2. **Experiência do Usuário**: Proporciona uma forma de garantir que a interface do usuário reflita corretamente o estado restaurado do formulário.
3. **Flexibilidade**: Possibilita personalizar o comportamento do elemento ao ser restaurado, adaptando-se a diferentes necessidades.

### Considerações Finais

O decorator `formStateRestore` é uma ferramenta útil para Custom Elements que precisam reagir à restauração do estado em formulários, permitindo uma abordagem modular e reutilizável para gerenciar o estado e o comportamento dos elementos durante esse processo.
