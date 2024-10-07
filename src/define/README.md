# Guia de Uso: Decorator `define`

O decorator `define` é utilizado para registrar classes como Custom Elements de maneira declarativa. Ele simplifica o processo de registro de um Custom Element, que geralmente envolve a chamada manual de `customElements.define`.

### Quando Usar

- **Criar um Custom Element**: Registre uma nova tag personalizada no DOM.
- **Estender Elementos Nativos**: Crie Custom Elements baseados em elementos HTML nativos, como `<div>`, `<button>`, etc.

### Como Funciona

Quando o `define` é aplicado a uma classe, ele registra automaticamente a classe como um Custom Element no `CustomElementRegistry`. A tag do elemento, definida pelo parâmetro `name`, se torna a representação visual do Custom Element.

### Estrutura

```javascript
/**
 * @param {string} name - Nome da tag do Custom Element.
 * @param {ElementDefinitionOptions} [options] - Configurações opcionais para a definição do Custom Element.
 * @returns {Function} Um decorator que registra o Custom Element.
 */
const define = (name, options) => (constructor) => {
  // Registra o Custom Element se ele ainda não estiver registrado.
  customElements.get(name) ?? customElements.define(name, constructor, options);
};

export default define;
```

### Parâmetros

1. **name** (obrigatório):
   - **Tipo:** `string`
   - **Descrição:** O nome da tag HTML que será associada ao Custom Element. Deve seguir as convenções de nomes de tags, ou seja, conter um hífen, como `'my-element'`.

2. **options** (opcional):
   - **Tipo:** `ElementDefinitionOptions`
   - **Descrição:** Um objeto que pode conter a propriedade `extends`, especificando qual elemento nativo será estendido pelo Custom Element. Exemplo: `{ extends: 'div' }` estende um elemento `div` nativo.

### Passos para Utilização

1. **Importe o decorator `define`**:

   ```javascript
   import { define } from '@bake-js/-o-id';
   ```

2. **Aplique o decorator à sua classe**:
   
   - **Passo 1:** Escolha um nome único para o Custom Element, seguindo as regras de nomeação de tags (precisa conter um hífen).
   - **Passo 2:** Use o decorator diretamente sobre a declaração da classe.

3. **Construa a lógica do seu componente**:
   
   - Defina a funcionalidade e comportamento da classe que será associada ao Custom Element.
   - Se necessário, utilize o parâmetro `options` para especificar elementos nativos a serem estendidos.

### Exemplo Prático

**Caso 1: Criando um Custom Element simples**

Aqui está um exemplo de como definir um Custom Element chamado `my-element`:

```javascript
import { define } from '@bake-js/-o-id';

@define('my-element')
class MyElement extends HTMLElement {
  constructor() {
    super();
    this.textContent = 'Hello, world!';
  }
}
```

**Explicação:**
- O `define('my-element')` registra a classe `MyElement` com o nome de tag `my-element`.
- A classe estende `HTMLElement`, criando um Custom Element genérico.
- Ao adicionar `<my-element></my-element>` no HTML, o conteúdo "Hello, world!" será exibido.

**Caso 2: Extensão de um elemento nativo (`div`)**

Você pode estender elementos HTML nativos como `div`:

```javascript
import { define } from '@bake-js/-o-id';

@define('my-div', { extends: 'div' })
class MyDivElement extends HTMLDivElement {
  constructor() {
    super();
    this.textContent = 'This is an extended div!';
  }
}
```

**Explicação:**
- O `define('my-div', { extends: 'div' })` registra um Custom Element que estende o comportamento de um `div` nativo.
- O conteúdo do `div` é modificado para "This is an extended div!".
- Este elemento pode ser utilizado da seguinte maneira no HTML: `<div is="my-div"></div>`.

### Benefícios do Decorator `define`

1. **Simplificação do Registro**: Não é necessário chamar manualmente `customElements.define`. O decorator gerencia o processo de registro automaticamente.
2. **Extensão de Elementos Nativos**: Usando o parâmetro `options`, você pode facilmente estender qualquer elemento nativo do HTML.
3. **Redução de Boilerplate**: O uso de `define` torna o código mais conciso e legível, removendo a repetição de chamadas explícitas de `customElements`.

### Considerações Finais

O decorator `define` é uma solução eficiente para registrar Custom Elements de forma declarativa e sem necessidade de invocações manuais do registro de elementos. Sua flexibilidade permite não apenas criar novos componentes, mas também estender elementos nativos com facilidade.
