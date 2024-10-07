# Guia de Uso: Decorator `formReset`

O decorator `formReset` é projetado para adicionar lógica personalizada ao método `formResetCallback` de um Custom Element. Este método é automaticamente chamado quando o formulário ao qual o elemento pertence é redefinido, permitindo que você execute ações específicas nesse momento.

### Quando Usar

- **Gerenciamento de Estado**: Ideal para Custom Elements que precisam redefinir seu estado interno ou aparência quando o formulário é redefinido.
- **Validação e Mensagens de Erro**: Útil para remover mensagens de erro ou realizar validações necessárias após a redefinição do formulário.

### Como Funciona

O decorator `formReset` é aplicado a um método que deve ser chamado automaticamente sempre que o formulário associado ao Custom Element for redefinido. Isso permite que a lógica necessária para gerenciar a redefinição seja encapsulada e organizada de forma eficaz.

### Estrutura

```javascript
/**
 * @param {Object} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} Um decorator que intercepta a chamada do `formResetCallback`.
 */
const formReset = (target, propertyKey) => {
  // Cria uma instância do interceptor para o método `formResetCallback`.
  const interceptor = intercept(formResetCallback);

  // Adiciona o método decorado à lista de callbacks a serem executados.
  return interceptor
    .in(target) // Define o alvo do interceptor.
    .then(exec(propertyKey)); // Define o método a ser executado pelo interceptor.
};

export default formReset;
```

### Parâmetros

1. **target** (obrigatório):
   - **Tipo:** `Object`
   - **Descrição:** O alvo do decorator, geralmente a classe do Custom Element. Define o contexto onde o método decorado será interceptado.

2. **propertyKey** (obrigatório):
   - **Tipo:** `string`
   - **Descrição:** O nome do método decorado. Este método será chamado automaticamente quando o `formResetCallback` for disparado.

### Passos para Utilização

1. **Importe o decorator `formReset`**:

   ```javascript
   import { formReset } from '@bake-js/-o-id';
   ```

2. **Aplique o decorator ao método que deverá ser chamado quando o formulário for redefinido**:
   
   - **Passo 1:** Identifique o método que deve executar a lógica após a redefinição do formulário.
   - **Passo 2:** Aplique o decorator diretamente sobre esse método.

3. **Implemente a lógica de redefinição**:

   - Defina o comportamento necessário no método decorado. O método será automaticamente invocado ao redefinir o componente no formulário.

### Exemplo Prático

**Caso 1: Notificando sobre a redefinição do formulário**

Aqui está um exemplo de como utilizar o `formReset` para notificar quando o formulário é redefinido:

```javascript
import { define, formReset } from '@bake-js/-o-id';

@define('my-element')
class MyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  @formReset
  handleFormReset() {
    console.log('O formulário foi redefinido.');
  }
}
```

**Explicação:**
- O método `handleFormReset` é chamado automaticamente quando o formulário que contém o `MyElement` é redefinido, permitindo que você execute a lógica necessária nesse momento.

**Caso 2: Resetando o estado visual após a redefinição**

Um segundo exemplo mostra como você pode redefinir a aparência do elemento após o formulário ser redefinido:

```javascript
import { define, formReset } from '@bake-js/-o-id';

@define('custom-input')
class CustomInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.input = document.createElement('input');
    this.shadowRoot.appendChild(this.input);
  }

  @formReset
  handleFormReset() {
    // Limpa o valor do input ao redefinir o formulário.
    this.input.value = '';
    console.log('O input foi redefinido.');
  }
}
```

**Explicação:**
- O método `handleFormReset` é chamado automaticamente ao redefinir o formulário que contém o `CustomInput`, permitindo que o valor do input seja limpo e o estado seja ajustado.

### Benefícios do Decorator `formReset`

1. **Gerenciamento Simplificado**: Permite que a lógica de redefinição seja centralizada em um único método, tornando o código mais limpo e organizado.
2. **Interatividade Aprimorada**: Proporciona uma forma de responder visualmente à redefinição do formulário, melhorando a experiência do usuário.
3. **Flexibilidade**: Possibilita personalizar o comportamento do elemento ao ser redefinido, adaptando-se facilmente a diferentes necessidades.

### Considerações Finais

O decorator `formReset` é uma ferramenta útil para Custom Elements que precisam reagir à redefinição em formulários, permitindo uma abordagem modular e reutilizável para gerenciar o estado e o comportamento dos elementos durante esse processo.
