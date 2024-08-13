# Guia Rápido do **-O-id**

Este guia fornece uma visão geral dos decorators da biblioteca **-O-id** para a criação e gerenciamento de Web Components. Utilize este cheat sheet para entender como aplicar cada decorator e como os ciclos de vida dos componentes e formulários funcionam.

## Introdução e Importação dos Decorators

### Introdução

A biblioteca **-O-id** facilita a criação de Web Components personalizados, oferecendo uma maneira eficiente e simples de gerenciar seus componentes por meio de decorators específicos. Os decorators ajudam a evitar um código excessivamente verboso, permitindo a aplicação de múltiplos decorators em um mesmo método, o que simplifica a codificação e a manutenção.

### Importação dos Decorators

Para utilizar os módulos essenciais e decorators da biblioteca, importe-os assim:

```javascript
import {
  define,
  adopted,
  attributeChanged,
  connected,
  disconnected,
  formAssociated,
  formDisabled,
  formReset,
  formStateRestore
} from '@bake-js/-o-id';
```

## Ciclos de Evento Padrão dos Web Components

Os Web Components passam por um ciclo de vida padrão, com eventos específicos que permitem gerenciar seu comportamento em diferentes fases. A seguir, estão os principais eventos do ciclo de vida:

### Criação do Elemento

**`@define()`**: Define um novo Web Component com o nome especificado.

**Uso:**

```javascript
@define('o-id-counter')
class Counter extends HTMLElement {
  // Implementação do componente
}
```

### Conexão ao DOM

**`@connected`**: Chamado quando o componente é adicionado ao DOM. Ideal para iniciar tarefas que dependem da presença do componente no DOM, como configurar ouvintes de eventos ou executar lógica de inicialização.

**Uso:**

```javascript
@connected
setup() {
  // Código para quando o componente for conectado ao DOM
}
```

### Desconexão do DOM

**`@disconnected`**: Chamado quando o componente é removido do DOM. Use este método para limpar recursos, como remover ouvintes de eventos ou parar processos desnecessários.

**Uso:**

```javascript
@disconnected
cleanup() {
  // Código para quando o componente for desconectado do DOM
}
```

### Mudança de Atributos

**`@attributeChanged(attributeName)`**: Chamado quando um dos atributos observados do componente muda. Permite atualizar o estado interno ou a aparência do componente com base nas alterações dos atributos.

**Uso:**

```javascript
@attributeChanged('number')
updateOnAttributeChange(oldValue, newValue) {
  // Código para manipular mudanças no atributo
}
```

### Adoção de Document

**`@adopted`**: Chamado quando o componente é movido para um novo document. Use este método para gerenciar tarefas relacionadas à mudança de contexto, como ao mover o componente para uma nova aba ou janela.

**Uso:**

```javascript
@adopted
handleAdoption() {
  // Código para quando o componente for adotado pelo document
}
```

## Callbacks do Ciclo de Vida do Formulário

Web Components associados a formulários têm callbacks adicionais que são acionados em momentos específicos do ciclo de vida do formulário:

### `@formAssociated`

**Descrição:** Chamado quando o navegador associa ou desassocia o componente de um formulário. Use este callback para executar ações quando o componente é associado ou desassociado de um formulário.

**Uso:**

```javascript
@formAssociated
handleFormAssociation(form) {
  // Código para quando o componente for associado a um formulário
}
```

### `@formDisabled`

**Descrição:** Chamado quando o estado `disabled` do componente muda. O parâmetro `disabled` representa o novo estado de desativação. Use este callback para ajustar o estado interno do componente quando ele for desativado ou ativado.

**Uso:**

```javascript
@formDisabled
handleFormDisabled(disabled) {
  // Código para quando o componente for desativado ou ativado no formulário
  // `disabled` é o novo estado de desativação do componente
}
```

### `@formReset`

**Descrição:** Chamado após o formulário ser redefinido. O componente deve ser restaurado a um estado predeterminado, como redefinir valores ou estados internos.

**Uso:**

```javascript
@formReset
handleFormReset() {
  // Código para redefinir o componente a um estado predeterminado
}
```

### `@formStateRestore`

**Descrição:** Chamado quando o navegador restaura o estado do elemento ou quando funções de assistência de entrada, como o autocompletamento, estabelecem um valor. O parâmetro `state` é o estado restaurado, e `mode` pode ser "restore" (restaurado pelo navegador) ou "autocomplete" (preenchido automaticamente).

**Uso:**

```javascript
@formStateRestore
handleFormStateRestore(state, mode) {
  // Código para restaurar o estado do componente
  // `state` é o estado restaurado, e `mode` pode ser "restore" ou "autocomplete"
}
```

### Como Definir um Elemento Personalizado Associado com um Formulário

Para transformar um elemento personalizado em um controle associado a um formulário, siga estes passos adicionais:

1. **Adicione uma Propriedade `formAssociated` Estática:**

   Adicione uma propriedade estática `formAssociated` à sua classe de elemento personalizado para indicar ao navegador que o elemento deve ser tratado como um controle de formulário. Esta propriedade deve ser definida como `true`.

   ```javascript
   @define('nome-do-componente')
   class MeuComponente extends HTMLElement {
     static formAssociated = true;

     // Implementação do componente
   }
   ```

2. **Implemente os Callbacks do Formulário:**

   Implemente os callbacks `formAssociatedCallback`, `formDisabledCallback`, `formResetCallback`, e `formStateRestoreCallback` para gerenciar como o componente interage com o formulário em diferentes momentos do ciclo de vida.

## Por Que Usar Decorators?

Os decorators são uma poderosa ferramenta para simplificar a escrita e evitar um código excessivamente verboso. Aqui estão algumas das principais vantagens:

- **Código Mais Limpo e Menos Verboso:** Ao usar decorators, você pode evitar a criação de métodos extensivos e complexos. Decorators permitem que você anote métodos com funcionalidades específicas de maneira clara e concisa.

- **Múltiplos Decorators no Mesmo Método:** Você pode aplicar o mesmo decorator várias vezes a um mesmo método, permitindo que diversas ações sejam executadas em momentos diferentes do ciclo de vida do componente. Isso evita a necessidade de chamar métodos um dentro do outro, facilitando a manutenção e a leitura do código.

Essas características tornam o desenvolvimento de Web Components mais ágil e menos propenso a erros, proporcionando uma maneira mais eficiente de gerenciar os ciclos de vida e interações dos componentes.
