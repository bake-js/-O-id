# Adopted

Bem-vindo à documentação do `adopted`, um decorator que permite adicionar um hook a métodos específicos de Custom Elements para execução quando o elemento é movido no DOM. Este pacote é parte integrante da biblioteca Element, que visa simplificar o desenvolvimento de Web Components.

## Documentação do Código

### Nome e Classificação

**Nome:** Adopted

**Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Interação e Objetivo

**Interação:** Este decorator é aplicado a métodos de classes de Custom Elements para garantir que o método seja executado quando o elemento é movido para um novo documento ou Shadow DOM.

**Objetivo:** Fornecer um hook conveniente que é chamado automaticamente sempre que um Custom Element é adotado em um novo contexto do DOM.

### Também conhecido como

- Hook de Adoção de Elemento
- Adoção de Elemento no DOM
- Adopted Callback [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)

### Motivação

A motivação para usar o decorator `adopted` é simplificar a gestão de Custom Elements que precisam executar lógica específica ao serem movidos para um novo documento ou Shadow DOM. Ao usar `adopted`, você pode:

1. **Simplificar o Código:** Eliminar a necessidade de definir manualmente o método `adoptedCallback` e garantir que ele seja executado junto com outros métodos específicos.
2. **Facilidade de Manutenção:** Centralizar a lógica relacionada à adoção de elementos em um único método decorado.

### Aplicabilidade

O decorator `adopted` é aplicável em qualquer situação onde se deseja executar lógica personalizada sempre que um Custom Element é movido para um novo documento ou Shadow DOM. É especialmente útil em componentes que mantêm estado ou precisam reagir a mudanças de contexto.

### Estrutura

A estrutura do decorator `adopted` é simples, e ele funciona ao:

- **Sobrescrever o Método `adoptedCallback`:** Adicionar lógica para chamar o método decorado sempre que o elemento é adotado em um novo contexto do DOM.

### Participantes

1. **Função Decoradora (`adopted`)**:
   - **Descrição:** Função que modifica métodos de classes de Custom Elements para serem executados no hook `adoptedCallback`.
   - **Responsabilidade:** Garantir que o método decorado seja chamado quando o elemento é adotado.

2. **Elemento Alvo (`target`)**:
   - **Descrição:** A classe que está sendo registrada como Custom Element.
   - **Responsabilidade:** Definir a lógica e estrutura do Custom Element, incluindo o método decorado com `@adopted`.

3. **Método Decorado (`propertyKey`)**:
   - **Descrição:** O método original da classe de Custom Element que é decorado com `@adopted`.
   - **Responsabilidade:** Executar a lógica específica definida pelo desenvolvedor quando o elemento é adotado.

### Colaborações

O decorator `adopted` trabalha isoladamente, mas pode ser combinado com outros decorators e padrões de design para criar componentes mais modulares e reutilizáveis.

### Consequências

#### Impactos Positivos

- **Facilidade de Uso:** Simplifica a adição de lógica ao método `adoptedCallback`.
- **Código Mais Limpo:** Centraliza a lógica de adoção em um único método decorado.
- **Manutenção Facilitada:** Facilita a manutenção e a leitura do código, especialmente em projetos grandes.

#### Impactos Negativos

- **Complexidade Adicional:** Introduz uma camada de abstração que pode esconder a chamada direta ao `adoptedCallback`, o que pode ser um problema para novos desenvolvedores.

### Implementação

```javascript
function adopted(target, propertyKey) {
  const adoptedCallback = target.adoptedCallback ?? (() => undefined);

  Object.defineProperty(target, "adoptedCallback", {
    async value() {
      await Reflect.apply(adoptedCallback, this, arguments);
      await this[propertyKey](...arguments);
      return this;
    },
    writable: true,
  });
}

export default adopted;
```

### Exemplo de Uso

```typescript
import { adopted } from '@bake-js/element';

class MyElement extends HTMLElement {
  @adopted
  onAdopted() {
    console.log('Element has been adopted into a new document or shadow DOM.');
  }
}

customElements.define('my-element', MyElement);
```

### Usos Conhecidos

- **Componentes de Interface de Usuário:** Ideal para componentes que mantêm estado e precisam reagir a mudanças de contexto no DOM.
- **Elementos Personalizados:** Útil em aplicações que fazem uso extensivo de elementos personalizados para criar componentes altamente modularizados.

### Padrões Relacionados

- **Custom Elements:** Integra-se com a API de Custom Elements, parte da especificação de Web Components.
- **Lifecycle Callbacks:** Trabalha com outros métodos de callback do ciclo de vida de Custom Elements, como `connectedCallback` e `disconnectedCallback`.

### Considerações Finais

O decorator `adopted` oferece uma maneira eficaz e declarativa de adicionar lógica ao método `adoptedCallback`, simplificando o desenvolvimento e melhorando a legibilidade do código. Ele é uma ferramenta valiosa para qualquer desenvolvedor que trabalha com Web Components.
