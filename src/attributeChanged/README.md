# AttributeChanged

Bem-vindo à documentação do `attributeChanged`, um decorator que permite adicionar um hook a métodos específicos de Custom Elements para execução quando um atributo definido é alterado. Este pacote é parte integrante da biblioteca Element, que visa simplificar o desenvolvimento de Web Components.

## Documentação do Código

### Nome e Classificação

**Nome:** AttributeChanged

**Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [Typescript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Interação e Objetivo

**Interação:** Este decorator é aplicado a métodos de classes de Custom Elements para executar o método decorado sempre que o atributo especificado for alterado.

**Objetivo:** Proporcionar uma maneira eficiente de responder a mudanças de atributos em Custom Elements, simplificando a lógica de atualização de componentes.

### Também conhecido como

- Alteração de Atributo
- Mudança de Atributo
- Atualização de Atributo

### Motivação

A motivação para usar o decorator `attributeChanged` é simplificar a resposta a mudanças de atributos em Custom Elements. Ele permite:

1. **Reatividade a Alterações de Atributos:** Garante que o método decorado seja executado sempre que o atributo especificado for alterado, proporcionando uma maneira reativa de atualizar o componente.
2. **Manutenção da Consistência:** Facilita a manutenção de estados internos e a atualização visual do componente em resposta a mudanças de atributos.

### Aplicabilidade

O decorator `attributeChanged` é aplicável em situações onde se deseja responder a alterações de atributos específicos em Custom Elements. É especialmente útil em cenários como:

- **Interatividade Dinâmica:** Quando componentes precisam reagir dinamicamente a mudanças de atributos definidos pelo usuário ou por scripts.
- **Atualização de Estados Internos:** Para manter a consistência entre os atributos e o estado interno do componente.

### Estrutura

A estrutura do decorator `attributeChanged` é simples, definindo o método `attributeChangedCallback` para responder a alterações de atributos.

### Participantes

1. **Função Decoradora (`attributeChanged`)**:
   - **Descrição:** Modifica métodos de classes de Custom Elements para executar o método decorado quando o atributo especificado é alterado.
   - **Responsabilidade:** Garantir que o método decorado seja chamado em resposta a alterações do atributo especificado.

2. **Elemento Alvo (`target`)**:
   - **Descrição:** A classe de Custom Element que contém o método decorado com `@attributeChanged`.
   - **Responsabilidade:** Executar o método decorado quando o atributo especificado for alterado.

3. **Método Decorado (`propertyKey`)**:
   - **Descrição:** O método original da classe de Custom Element que é decorado com `@attributeChanged`.
   - **Responsabilidade:** Realizar a lógica específica em resposta à alteração do atributo.

### Colaborações

O decorator `attributeChanged` colabora estreitamente com o método `attributeChangedCallback` do Custom Element para garantir que mudanças de atributos desencadeiem a execução do método decorado.

### Consequências

#### Impactos Positivos

- **Reatividade Aprimorada:** Permite que componentes respondam rapidamente a mudanças de atributos, proporcionando uma experiência de usuário mais dinâmica.
- **Simplicidade na Implementação:** Centraliza a lógica de resposta a mudanças de atributos, facilitando a manutenção e a extensão dos componentes.
- **Consistência Visual:** Garante que as mudanças de atributos sejam refletidas visualmente no componente de maneira consistente.

#### Impactos Negativos

- **Complexidade Adicional:** Introduz complexidade na gestão de atributos, especialmente em componentes com muitos atributos observados.
- **Possível Sobrecarga de Desempenho:** Mudanças frequentes de atributos podem impactar o desempenho da aplicação, necessitando de cuidados extras em cenários de uso intensivo.

### Implementação

```javascript
function attributeChanged(attributeName) {
  return (target, propertyKey) => {
    const attributeChangedCallback =
      target.attributeChangedCallback ?? (() => undefined);

    Object.assign(target.constructor, {
      observedAttributes: [
        attributeName,
        ...(target.constructor.observedAttributes ?? []),
      ],
    });

    Reflect.defineProperty(target, "attributeChangedCallback", {
      async value(name, oldValue, newValue) {
        await Reflect.apply(attributeChangedCallback, this, arguments);
        name === attributeName && (await this[propertyKey](newValue, oldValue));
        return this;
      },
      writable: true,
    });
  };
}

export default attributeChanged;
```

### Exemplo de Uso

```javascript
import { attributeChanged } from '@bake-js/element';

class MyElement extends HTMLElement {
  @attributeChanged('value')
  onValueChange(newValue, oldValue) {
    console.log(`Atributo 'value' alterado de ${oldValue} para ${newValue}`);
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
}

customElements.define('my-element', MyElement);
```

### Usos Conhecidos

- **Componentes Interativos:** Ideal para componentes que precisam responder a mudanças de atributos de maneira dinâmica e eficiente.
- **Formulários e Inputs:** Útil para elementos de formulário que necessitam atualizar seu estado interno em resposta a mudanças de atributos.

### Padrões Relacionados

- **Observer Pattern:** Pode ser integrado para notificar componentes sobre mudanças de atributos, desencadeando a lógica necessária em resposta.
- **State Management Patterns:** Padrões como Flux ou Redux podem coordenar mudanças de atributos com atualizações de estado centralizadas, mantendo a sincronia entre dados e interface.

### Considerações Finais

O decorator `attributeChanged` oferece uma solução eficaz para gerenciar respostas a mudanças de atributos em Custom Elements, simplificando a lógica de atualização e mantendo a consistência visual e funcional dos componentes.
