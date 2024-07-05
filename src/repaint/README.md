# Repaint

Bem-vindo à documentação do `repaint`, um decorator que permite adicionar um hook a métodos específicos de Custom Elements para forçar a execução do método `paint` sempre que o método decorado for chamado. Este pacote é parte integrante da biblioteca Element, que visa simplificar o desenvolvimento de Web Components.

## Documentação do Código

### Nome e Classificação

**Nome:** Repaint

**Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [Typescript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Interação e Objetivo

**Interação:** Este decorator é aplicado a métodos de classes de custom elements para forçar a execução do método `paint` sempre que o método decorado for chamado, garantindo a atualização da renderização do componente.

**Objetivo:** Integrar-se com o decorator `paint` para proporcionar uma maneira eficiente de atualizar a renderização de componentes customizados quando necessário, sem precisar reinventar a lógica de renderização.

### Também conhecido como

- Atualização de Renderização
- Forçar Renderização
- Re-render [React](https://legacy.reactjs.org/docs/rendering-elements.html#updating-the-rendered-element)

### Motivação

A motivação para usar o decorator `repaint` é simplificar a gestão da atualização da renderização de componentes customizados em aplicações web. Ao trabalhar em conjunto com o `paint`, ele permite:

1. **Atualização Forçada de Renderização:** Garante que a renderização do componente seja atualizada sempre que um método decorado com `@repaint` for executado, reexecutando o ciclo de vida de renderização definido pelo `paint`.
2. **Manutenção da Consistência:** Mantém a consistência na atualização visual do componente, evitando renderizações desatualizadas ou inconsistentes.

### Aplicabilidade

O decorator `repaint` é aplicável em situações onde se deseja atualizar manualmente a renderização de componentes customizados em resposta a eventos ou mudanças de estado. É especialmente útil quando combinado com o decorator `paint` em cenários como:

- **Atualização Dinâmica de Conteúdo:** Quando componentes precisam reagir a alterações de dados ou eventos e atualizar sua interface de usuário de forma eficiente.
- **Interatividade em Tempo Real:** Para elementos que exigem uma resposta imediata a ações do usuário, garantindo que as mudanças visuais sejam refletidas instantaneamente.

### Estrutura

A estrutura do decorator `repaint` é simples, complementando o decorator `paint` ao:

- **Modificar o Método Decorado:** Sobrescreve o método decorado para chamar o método `paint` após sua execução, se o componente já tiver sido previamente pintado (`trait.painted` é verdadeiro).

### Participantes

1. **Função Decoradora (`repaint`)**:
   - **Descrição:** Modifica métodos de classes de custom elements para forçar a execução do método `paint` após a execução do método decorado.
   - **Responsabilidade:** Garantir que a renderização do componente seja atualizada quando necessário, mantendo a consistência visual.

2. **Elemento Alvo (`target`)**:
   - **Descrição:** A classe de custom element que contém o método decorado com `@repaint`.
   - **Responsabilidade:** Executar o método `paint` para atualizar a renderização do componente após a execução do método decorado.

3. **Método Decorado (`descriptor.value`)**:
   - **Descrição:** O método original da classe de custom element que é decorado com `@repaint`.
   - **Responsabilidade:** Realizar a lógica específica do método, seguida pela atualização da renderização do componente.

### Colaborações

O decorator `repaint` colabora estreitamente com o decorator `paint` para garantir que a renderização do componente seja atualizada conforme necessário. Essas colaborações são essenciais para manter a consistência e a eficiência na gestão de atualizações visuais em componentes web customizados.

### Consequências

#### Impactos Positivos

- **Melhoria na Responsividade:** Permite que componentes respondam rapidamente a mudanças de estado ou dados, proporcionando uma experiência de usuário mais fluida.
- **Simplicação da Manutenção:** Centraliza a lógica de atualização visual em um método `paint`, facilitando a manutenção e a extensão dos componentes.
- **Aumento da Reutilização:** Encoraja a criação de componentes mais reutilizáveis ao separar a lógica de renderização da lógica de negócio.

#### Impactos Negativos

- **Complexidade Adicional:** Introduz complexidade na gestão do ciclo de vida de renderização, especialmente em aplicações que exigem muitas atualizações.
- **Possível Sobrecarga de Desempenho:** Repaints frequentes podem impactar o desempenho da aplicação, necessitando de cuidados extras em cenários de uso intensivo.

### Implementação

```javascript
import trait from "../trait";

function repaint(_target, _propertyKey, descriptor) {
  const value = descriptor.value;

  Object.assign(descriptor, {
    async value() {
      await Reflect.apply(value, this, arguments);
      this[trait.painted] && (await this[trait.paint]());
      return this;
    },
  });
}

export default repaint;
```

### Exemplo de Uso

```javascript
import { paint, repaint } from '@bake-js/element';

@paint((self) => {
  return `<p>Hello, ${self.name}</p>`;
})
class GreetingElement extends HTMLElement {
  #name;

  get name() {
    return (this.#name ??= 'World');
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  @repaint
  changeName(value) {
    this.#name = value
    return this
  }
}
```

### Usos Conhecidos

- **Atualização Dinâmica de Interfaces:** Ideal para interfaces que necessitam de atualizações em tempo real baseadas em eventos ou mudanças de dados.
- **Aplicações Reativas:** Útil para componentes que precisam reagir dinamicamente a mudanças de estado, mantendo a consistência visual e funcional.

### Padrões Relacionados

- **Decorator `paint`:** Complementa o `repaint`, definindo o ciclo de vida inicial de renderização e sendo invocado automaticamente após mudanças que exigem uma nova renderização.
- **Observer Pattern:** Pode ser integrado para notificar componentes sobre mudanças relevantes, desencadeando repaints apenas quando necessário.
- **State Management Patterns:** Padrões como Flux ou Redux podem coordenar repaints com atualizações de estado centralizadas, mantendo a sincronia entre dados e interface.

### Considerações Finais

O decorator `repaint` oferece uma solução eficaz para gerenciar a atualização da renderização de componentes customizados em aplicações web, especialmente quando combinado com o decorator `paint`. Ao garantir que a renderização seja atualizada automaticamente após a execução de métodos específicos, ele promove uma experiência de usuário mais fluida e responsiva.
