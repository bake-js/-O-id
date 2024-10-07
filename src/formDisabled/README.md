# Guia de Uso: Decorator `formDisabled`

O decorator `formDisabled` é projetado para adicionar lógica personalizada ao método `formDisabledCallback` de um Custom Element. Este método é automaticamente chamado quando o elemento é desativado dentro de um formulário, permitindo que você execute ações específicas nesse momento.

### Quando Usar

- **Gerenciamento de Estado**: Ideal para Custom Elements que precisam ajustar seu estado ou comportamento quando desativados, como desativar botões, campos de entrada ou outros elementos interativos.
- **Validação e Mensagens de Erro**: Útil para notificar usuários sobre a desativação de um elemento e, possivelmente, para alterar a aparência do elemento (por exemplo, mudando estilos para indicar que ele está desativado).

### Como Funciona

O decorator `formDisabled` é aplicado a um método que deve ser chamado automaticamente sempre que o Custom Element for desativado em um formulário. Isso permite que a lógica necessária para gerenciar a desativação seja encapsulada e organizada de forma eficaz.

### Estrutura

```javascript
/**
 * @param {Object} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} Um decorator que intercepta a chamada do `formDisabledCallback`.
 */
const formDisabled = (target, propertyKey) => {
  // Cria uma instância do interceptor para o método `formDisabledCallback`.
  const interceptor = intercept(formDisabledCallback);

  // Adiciona o método decorado à lista de callbacks a serem executados.
  return interceptor
    .in(target) // Define o alvo do interceptor.
    .then(exec(propertyKey)); // Define o método a ser executado pelo interceptor.
};

export default formDisabled;
```

### Parâmetros

1. **target** (obrigatório):
   - **Tipo:** `Object`
   - **Descrição:** O alvo do decorator, geralmente a classe do Custom Element. Define o contexto onde o método decorado será interceptado.

2. **propertyKey** (obrigatório):
   - **Tipo:** `string`
   - **Descrição:** O nome do método decorado. Este método será chamado automaticamente quando o `formDisabledCallback` for disparado.

### Passos para Utilização

1. **Importe o decorator `formDisabled`**:

   ```javascript
   import { formDisabled } from '@bake-js/-o-id';
   ```

2. **Aplique o decorator ao método que deverá ser chamado quando o Custom Element for desativado**:
   
   - **Passo 1:** Identifique o método que deve executar a lógica ao ser desativado.
   - **Passo 2:** Aplique o decorator diretamente sobre esse método.

3. **Implemente a lógica de desativação**:

   - Defina o comportamento necessário no método decorado. O método será automaticamente invocado ao desativar o componente no formulário.

### Exemplo Prático

**Caso 1: Notificando sobre a desativação**

Aqui está um exemplo de como utilizar o `formDisabled` para notificar quando o elemento é desativado em um formulário:

```javascript
import { define, formDisabled } from '@bake-js/-o-id';

@define('my-element')
class MyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  @formDisabled
  handleFormDisabled() {
    console.log('O elemento foi desativado no formulário.');
  }
}
```

**Explicação:**
- O método `handleFormDisabled` é chamado automaticamente quando o `MyElement` é desativado em um formulário, permitindo que você execute a lógica necessária nesse momento.

**Caso 2: Alterando a aparência quando desativado**

Um segundo exemplo mostra como você pode alterar a aparência do elemento ao ser desativado:

```javascript
import { define, formDisabled } from '@bake-js/-o-id';

@define('custom-button')
class CustomButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.style.cursor = 'pointer';
  }

  @formDisabled
  handleFormDisabled() {
    // Muda a aparência para indicar que o botão está desativado.
    this.style.opacity = '0.5';
    this.style.pointerEvents = 'none';
    console.log('O botão foi desativado.');
  }
}
```

**Explicação:**
- O método `handleFormDisabled` é chamado automaticamente ao desativar o `CustomButton`, permitindo que o estilo do botão seja ajustado para refletir seu estado desativado.

### Benefícios do Decorator `formDisabled`

1. **Gerenciamento Simplificado**: Permite que a lógica de desativação seja centralizada em um único método, tornando o código mais limpo e organizado.
2. **Interatividade Aprimorada**: Proporciona uma forma de responder visualmente à desativação de elementos, melhorando a experiência do usuário.
3. **Flexibilidade**: Possibilita personalizar o comportamento do elemento ao ser desativado, adaptando-se facilmente a diferentes necessidades.

### Considerações Finais

O decorator `formDisabled` é uma ferramenta útil para Custom Elements que precisam reagir à desativação em formulários, permitindo uma abordagem modular e reutilizável para gerenciar o estado e o comportamento dos elementos durante esse processo.
