[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# Módulo de Ciclo de Vida e Formulários do **-O-id**

O módulo de **Ciclo de Vida e Formulários** do **-O-id** fornece uma série de decorators que simplificam a manipulação do ciclo de vida de Web Components e a interação com formulários. Esses decorators permitem que você adicione lógica personalizada a eventos cruciais do ciclo de vida dos componentes e gerencie a interação com elementos de formulário de maneira eficiente.

## Introdução

O **-O-id** oferece uma abordagem modular e reativa para gerenciar eventos do ciclo de vida dos Web Components e a associação a formulários. Com decorators específicos, você pode encapsular a lógica necessária para responder a alterações de atributos, estados de conexão, e eventos relacionados a formulários, promovendo uma experiência de desenvolvimento mais clara e organizada.

## Importação dos Decorators

Para utilizar as funcionalidades deste módulo, importe os decorators da seguinte forma:

```javascript
import { define, adopted, attributeChanged, connected, disconnected, formAssociated, formDisabled, formReset, formStateRestore } from '@bake-js/-o-id';
```

## Principais Funcionalidades

### Decorators de Ciclo de Vida

Os decorators fornecem hooks para diferentes momentos no ciclo de vida do componente:

- **`@define`**: Define um Custom Element.
- **`@adopted`**: Executa lógica quando o elemento é movido para um novo contexto no DOM.
- **`@attributeChanged`**: Responde a mudanças em atributos do elemento.
- **`@connected`**: Executa lógica quando o elemento é conectado ao DOM.
- **`@disconnected`**: Executa lógica quando o elemento é desconectado do DOM.

### Decorators para Formulários

Os decorators específicos para interação com formulários permitem que você responda a eventos relacionados ao estado do formulário:

- **`@formAssociated`**: Indica que o elemento está associado a um formulário.
- **`@formDisabled`**: Executa lógica quando o elemento é desabilitado dentro de um formulário.
- **`@formReset`**: Responde ao evento de redefinição do formulário.
- **`@formStateRestore`**: Executa lógica quando o estado do formulário associado é restaurado.

### Estrutura dos Decorators

Os decorators podem ser utilizados para simplificar a lógica de ciclo de vida e interação com formulários dos componentes. Aqui está um exemplo de como utilizá-los:

```javascript
@define('my-component')
class MyComponent extends HTMLElement {
  constructor() {
    super();
  }

  @adopted
  handleAdopted() {
    // Lógica a ser executada quando o componente é movido no DOM.
  }

  @attributeChanged
  handleAttributeChange(name, oldValue, newValue) {
    // Lógica a ser executada quando um atributo é alterado.
  }

  @connected
  handleConnected() {
    // Lógica a ser executada quando o componente é conectado ao DOM.
  }

  @disconnected
  handleDisconnected() {
    // Lógica a ser executada quando o componente é desconectado do DOM.
  }

  @formAssociated
  handleFormAssociated() {
    // Lógica para associar o componente a um formulário.
  }

  @formDisabled
  handleFormDisabled() {
    // Lógica a ser executada quando o formulário é desabilitado.
  }

  @formReset
  handleFormReset() {
    // Lógica a ser executada quando o formulário é redefinido.
  }

  @formStateRestore
  handleFormStateRestore() {
    // Lógica a ser executada quando o estado do formulário é restaurado.
  }
}
```

## Exemplo Prático

**Exemplo: Usando `@define`, `@connected`, e `@formStateRestore`**

```javascript
import { define, connected, formStateRestore } from '@bake-js/-o-id';

@define('custom-element')
class CustomElement extends HTMLElement {
  constructor() {
    super();
  }

  @connected
  handleConnected() {
    console.log('O elemento foi conectado ao DOM.');
  }

  @formStateRestore
  handleFormStateRestore() {
    console.log('O estado do formulário foi restaurado.');
  }
}
```

## Por Que Usar o Módulo de Ciclo de Vida e Formulários?

A utilização deste módulo no **-O-id** oferece várias vantagens que tornam o desenvolvimento de Web Components mais eficiente e modular:

- **Gerenciamento Eficiente**: Encapsula a lógica de ciclo de vida e interação com formulários em decorators, mantendo o código organizado e fácil de manter.
  
- **Flexibilidade**: Permite que você responda a eventos específicos do ciclo de vida e alterações de estado em formulários, melhorando a reatividade dos componentes.

- **Simplicidade**: Os decorators oferecem uma maneira clara e direta de implementar lógica sem complicar a estrutura do componente.

## Exemplos de Uso

### Exemplo 1: Criando um Componente com Ciclo de Vida

```javascript
@define('life-cycle-component')
class LifeCycleComponent extends HTMLElement {
  constructor() {
    super();
  }

  @connected
  handleConnected() {
    console.log('O componente foi conectado ao DOM.');
  }

  @disconnected
  handleDisconnected() {
    console.log('O componente foi desconectado do DOM.');
  }
}
```

### Exemplo 2: Usando `@formAssociated` e `@formReset`

```javascript
@define('form-component')
class FormComponent extends HTMLElement {
  constructor() {
    super();
  }

  @formAssociated
  handleFormAssociated() {
    console.log('O componente está associado a um formulário.');
  }

  @formReset
  handleFormReset() {
    console.log('O formulário foi redefinido.');
  }
}
```

## Conclusão

O módulo de Ciclo de Vida e Formulários do **-O-id** fornece uma maneira eficiente de gerenciar eventos de ciclo de vida e interações com formulários em Web Components. Com sua abordagem modular e flexível, você pode construir interfaces reativas e de fácil manutenção, garantindo que seu código permaneça claro e organizado. Experimente o módulo e descubra como ele pode aprimorar seu desenvolvimento de Web Components!
