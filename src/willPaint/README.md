# willPaint

Bem-vindo à documentação do `willPaint`, um decorator que permite adicionar um hook a métodos específicos de Custom Elements para execução antes do método `paint`. Este pacote é parte integrante da biblioteca Element, que visa simplificar o desenvolvimento de Web Components.

## Documentação do Código

### Nome e Classificação

**Nome:** willPaint

**Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [Typescript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Interação e Objetivo

**Interação:** Este decorator é aplicado a métodos de classes de Custom Elements para executar o método decorado sempre que o método `paint` for iniciado.

**Objetivo:** Facilitar a execução de lógica personalizada antes do ciclo de vida de renderização do componente, permitindo maior controle sobre o comportamento pré-renderização.

### Também conhecido como

- Callback Pré-Renderização
- Hook Pré-Renderização
- Pre-Paint Hook

### Motivação

A motivação para usar o decorator `willPaint` é proporcionar um ponto de extensão no ciclo de vida dos Custom Elements para realizar ações adicionais antes da renderização do componente. Ele permite:

1. **Ações Pré-Renderização:** Executar lógica personalizada antes do método `paint`, garantindo que qualquer preparação de estado ou manipulação do DOM ocorra antes da renderização.
2. **Melhor Controle de Ciclo de Vida:** Fornecer um hook específico para ações que devem ocorrer antes que o componente seja pintado, promovendo um código mais limpo e organizado.

### Aplicabilidade

O decorator `willPaint` é aplicável em situações onde se deseja executar ações específicas antes da renderização de componentes customizados. É especialmente útil em cenários como:

- **Preparações Iniciais:** Quando há necessidade de realizar ajustes ou preparações no DOM antes da renderização inicial do componente.
- **Integração com Outras Lógicas:** Para integrar o componente com outras partes da aplicação que dependem de seu estado antes da renderização.

### Estrutura

A estrutura do decorator `willPaint` é simples e eficaz, modificando o método decorado para garantir que ele seja chamado antes do método `paint`.

### Participantes

1. **Função Decoradora (`willPaint`)**:
   - **Descrição:** Modifica métodos de classes de Custom Elements para execução antes do método `paint`.
   - **Responsabilidade:** Garantir que ações pré-renderização sejam executadas conforme necessário.

2. **Elemento Alvo (`target`)**:
   - **Descrição:** A classe de Custom Element que contém o método decorado com `@willPaint`.
   - **Responsabilidade:** Executar o método decorado antes da renderização do componente.

3. **Método Decorado (`propertyKey`)**:
   - **Descrição:** O método original da classe de Custom Element que é decorado com `@willPaint`.
   - **Responsabilidade:** Realizar a lógica específica do método antes da renderização do componente.

### Colaborações

O decorator `willPaint` colabora estreitamente com o decorator `paint` para garantir que ações adicionais sejam executadas antes da renderização do componente. Essa colaboração é essencial para manter um fluxo de ciclo de vida claro e eficiente.

### Consequências

#### Impactos Positivos

- **Melhoria na Organização do Código:** Centraliza a lógica pré-renderização, facilitando a manutenção e a compreensão do ciclo de vida do componente.
- **Maior Flexibilidade:** Permite que os desenvolvedores adicionem lógica personalizada em pontos específicos do ciclo de vida do componente.
- **Reutilização de Código:** Promove a reutilização de lógica pré-renderização em múltiplos componentes, reduzindo a duplicação de código.

#### Impactos Negativos

- **Complexidade Adicional:** Introduz mais um ponto no ciclo de vida do componente, o que pode aumentar a complexidade do código em projetos grandes.
- **Possível Sobrecarga de Desempenho:** A execução de lógica adicional antes da renderização pode impactar o desempenho em aplicações com muitos componentes complexos.

### Implementação

```javascript
import trait from "../trait";

function willPaint(target, propertyKey) {
  const willPaintCallback = target[trait.willPaint] ?? (() => undefined);

  Reflect.defineProperty(target, trait.willPaint, {
    async value() {
      await Reflect.apply(willPaintCallback, this, arguments);
      await this[propertyKey](...arguments);
      return this;
    },
    writable: true,
  });
}

export default willPaint;
```

### Exemplo de Uso

```javascript
import { paint, willPaint } from '@bake-js/element';

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

  @willPaint
  beforeRender() {
    console.log('Componente será pintado:', this.innerHTML);
  }
}
```

### Usos Conhecidos

- **Preparações Iniciais de Interface:** Ideal para realizar ajustes no DOM antes da renderização inicial do componente.
- **Integração com APIs ou Serviços:** Útil para sincronizar o estado do componente com serviços externos antes da renderização.

### Padrões Relacionados

- **Decorator `paint`:** Define o ciclo de vida inicial de renderização e é complementado pelo `willPaint`.
- **Callback de Ciclo de Vida:** Similar a outros callbacks de ciclo de vida, como `connectedCallback`, mas específico para ações pré-renderização.

### Considerações Finais

O decorator `willPaint` oferece uma solução eficaz para gerenciar ações pré-renderização de componentes customizados em aplicações web. Ao garantir que a lógica adicional seja executada antes do método `paint`, ele promove um ciclo de vida de componentes mais completo e flexível.
