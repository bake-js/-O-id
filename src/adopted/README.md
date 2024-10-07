# Guia de Uso: Decorator `adopted`

O decorator `adopted` é utilizado para interceptar e executar lógica no método `adoptedCallback` de Custom Elements. Ele simplifica a adição de lógica quando um elemento é movido para um novo contexto de documento, centralizando o comportamento de adoção no ciclo de vida do componente.

### Quando Usar

- **Monitorar Movimentos de Documento**: Quando um Custom Element é movido de um documento para outro, como de um iframe para outro ou entre janelas.
- **Centralizar a Lógica de Callbacks**: Gerencie facilmente a execução de callbacks de adoção sem sobrecarregar o código com a lógica interna de `adoptedCallback`.

### Como Funciona

O decorator `adopted` intercepta o método `adoptedCallback` de um Custom Element, permitindo que você adicione lógica personalizada sempre que o elemento for movido para um novo documento. O método decorado é registrado para ser executado automaticamente quando o evento de adoção ocorrer.

### Estrutura

```javascript
/**
 * @param {Function} target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param {string} propertyKey - O nome do método decorado.
 * @returns {Function} Um decorator que intercepta a chamada do `adoptedCallback`.
 */
const adopted = (target, propertyKey) => {
  // Cria uma instância do interceptor para o método `adoptedCallback`.
  const interceptor = intercept(adoptedCallback);

  // Adiciona o método decorado à lista de callbacks a serem executados.
  return interceptor
    .in(target) // Define o alvo do interceptor.
    .then(exec(propertyKey)); // Define o método a ser executado pelo interceptor.
};

export default adopted;
```

### Parâmetros

1. **target** (obrigatório):
   - **Tipo:** `Function`
   - **Descrição:** O alvo do decorator, geralmente a classe do Custom Element. Esse parâmetro define o contexto no qual o interceptor irá operar.

2. **propertyKey** (obrigatório):
   - **Tipo:** `string`
   - **Descrição:** O nome do método da classe que será chamado quando o `adoptedCallback` for disparado.

### Passos para Utilização

1. **Importe o decorator `adopted`**:

   ```javascript
   import { adopted } from '@bake-js/-o-id';
   ```

2. **Aplique o decorator ao método de callback de adoção**:
   
   - **Passo 1:** Escolha um método da classe que será executado quando o Custom Element for adotado em um novo documento.
   - **Passo 2:** Use o decorator diretamente sobre o método da classe que deverá reagir ao evento de adoção.

3. **Implemente a lógica de adoção**:
   
   - Defina o comportamento desejado dentro do método decorado, como atualizações no estado do componente ou respostas visuais.

### Exemplo Prático

**Caso 1: Adicionando lógica ao ser adotado em um novo documento**

Aqui está um exemplo de como usar o `adopted` para adicionar lógica personalizada ao evento de adoção de um elemento:

```javascript
import { adopted, define } from '@bake-js/-o-id';

@define('my-element')
class MyElement extends HTMLElement {
  @adopted
  handleAdoption() {
    console.log('Elemento foi adotado em um novo documento.');
  }
}
```

**Explicação:**
- O método `handleAdoption` será chamado automaticamente sempre que o elemento `MyElement` for movido para um novo documento.
- O console exibirá a mensagem `'Elemento foi adotado em um novo documento.'` quando o evento de adoção ocorrer.

**Caso 2: Atualizando o estado do elemento ao ser adotado**

Outro exemplo seria atualizar o estado interno do elemento ao ser adotado:

```javascript
import { adopted, define } from '@bake-js/-o-id';

@define('stateful-element')
class StatefulElement extends HTMLElement {
  constructor() {
    super();
    this.state = { adopted: false };
  }

  @adopted
  updateState() {
    this.state.adopted = true;
    console.log('Estado atualizado: Elemento adotado.');
  }
}
```

**Explicação:**
- Ao ser adotado, o método `updateState` atualiza a propriedade `state.adopted` para `true`.
- Além disso, imprime a mensagem `'Estado atualizado: Elemento adotado.'` no console.

### Benefícios do Decorator `adopted`

1. **Centralização de Lógica**: Ao usar o `adopted`, você evita a necessidade de escrever manualmente o método `adoptedCallback`, delegando essa responsabilidade ao decorator.
2. **Interceptação Simples**: O interceptor garante que a lógica do método decorado será executada no momento certo, sem que você precise lidar diretamente com a infraestrutura de callbacks nativos.
3. **Organização e Clareza**: O código permanece limpo, com a lógica de adoção separada de outros métodos do ciclo de vida do componente.

### Considerações Finais

O decorator `adopted` é uma maneira poderosa e conveniente de gerenciar o comportamento de Custom Elements ao serem movidos entre documentos. Ao utilizar o interceptor interno, ele assegura que a lógica definida será executada corretamente, mantendo a integridade do ciclo de vida dos elementos e reduzindo o código repetitivo.
