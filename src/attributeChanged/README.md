# Guia de Uso: Decorator `attributeChanged`

O decorator `attributeChanged` é utilizado para adicionar lógica ao método `attributeChangedCallback` de um Custom Element. Ele permite que você defina ações que devem ser executadas quando um atributo específico é modificado.

### Quando Usar

- **Mudança de Estado**: Ideal para Custom Elements que precisam reagir a alterações de atributos e atualizar seu estado ou aparência de acordo.
- **Validação de Atributos**: Útil para validar ou transformar valores de atributos sempre que eles mudam.

### Como Funciona

O decorator `attributeChanged` é aplicado a um método que será chamado automaticamente quando o atributo especificado (definido pelo parâmetro `attributeName`) for alterado. O método decorado recebe os valores antigo e novo do atributo, permitindo a execução de lógica personalizada.

### Estrutura

```javascript
/**
 * @param {string} attributeName - O nome do atributo a ser monitorado.
 * @returns {Function} Um decorator que intercepta a chamada do `attributeChangedCallback`.
 */
const attributeChanged =
  (attributeName, ...filters) =>
  (target, propertyKey, propertyDescriptor) => {
    // Atualiza a lista de atributos observados do Custom Element.
    const observedAttrs = target.constructor[observedAttributes] ?? [];

    Object.assign(target.constructor, {
      [observedAttributes]: [...observedAttrs, attributeName],
    });

    // Configura o interceptor para o método `attributeChangedCallback`.
    intercept(attributeChangedCallback)
      .in(target)
      .then(function (name, oldValue, newValue) {
        if (name === attributeName && oldValue !== newValue) {
          // Aplica filtros ao novo valor do atributo.
          const value = filters.reduce(
            (value, filter) => filter(value),
            newValue,
          );

          // Se o método for um setter, atualiza o valor do atributo.
          if (propertyDescriptor.set) {
            this[propertyKey] = value;
          }

          // Se o método for uma função, executa o método decorado com os novos e antigos valores do atributo.
          if (propertyDescriptor.value) {
            this[propertyKey](value, oldValue);
          }
        }
      });
  };

export default attributeChanged;
```

### Parâmetros

1. **attributeName** (obrigatório):
   - **Tipo:** `string`
   - **Descrição:** O nome do atributo que deve ser monitorado. Quando esse atributo for alterado, o método decorado será chamado.

2. **...filters** (opcional):
   - **Tipo:** `Function`
   - **Descrição:** Filtros que podem ser aplicados ao novo valor do atributo antes de ele ser usado no método decorado. Você pode passar múltiplos filtros, que serão aplicados em sequência.

### Passos para Utilização

1. **Importe o decorator `attributeChanged`**:

   ```javascript
   import { attributeChanged } from '@bake-js/-o-id';
   ```

2. **Aplique o decorator ao método que deverá ser chamado quando o atributo específico for alterado**:

   - **Passo 1:** Identifique o método que deve executar a lógica após a alteração do atributo.
   - **Passo 2:** Aplique o decorator, passando o nome do atributo que deseja monitorar.

3. **Implemente a lógica de alteração**:

   - Defina o comportamento necessário no método decorado. O método será automaticamente invocado ao alterar o atributo especificado.

### Exemplo Prático

**Caso 1: Notificando sobre a alteração de um atributo**

Aqui está um exemplo de como utilizar o `attributeChanged` para notificar quando um atributo é alterado:

```javascript
import { attributeChanged, define } from '@bake-js/-o-id';

@define('my-element')
class MyElement extends HTMLElement {
  @attributeChanged('my-attribute')
  handleAttributeChange(newValue, oldValue) {
    console.log(`Atributo alterado de ${oldValue} para ${newValue}`);
  }
}
```

**Explicação:**
- O método `handleAttributeChange` é chamado automaticamente quando o atributo `my-attribute` é alterado, permitindo que você execute a lógica necessária.

**Caso 2: Aplicando filtros ao novo valor do atributo**

Um segundo exemplo mostra como você pode aplicar filtros ao novo valor do atributo antes de executá-lo:

```javascript
import { attributeChanged, define } from '@bake-js/-o-id';

// Um filtro simples que converte o valor para maiúsculas.
const toUpperCase = (value) => value.toUpperCase();

@define('custom-element')
class CustomElement extends HTMLElement {
  @attributeChanged('title', toUpperCase)
  handleTitleChange(newValue, oldValue) {
    console.log(`Título alterado de ${oldValue} para ${newValue}`);
  }
}
```

**Explicação:**
- O método `handleTitleChange` é chamado quando o atributo `title` é alterado. O novo valor é passado através do filtro `toUpperCase`, garantindo que o valor seja sempre registrado em maiúsculas.

### Benefícios do Decorator `attributeChanged`

1. **Encapsulamento da Lógica**: Permite que a lógica de alteração de atributos seja centralizada em um único método, melhorando a organização do código.
2. **Reatividade**: Facilita a construção de Custom Elements reativos que respondem a alterações de atributos de maneira intuitiva.
3. **Flexibilidade com Filtros**: Os filtros permitem a transformação dos valores dos atributos, possibilitando uma lógica de manipulação mais robusta.

### Considerações Finais

O decorator `attributeChanged` é uma ferramenta poderosa para gerenciar alterações em atributos de Custom Elements, permitindo uma abordagem modular e limpa para implementar lógica específica em resposta a essas alterações.
