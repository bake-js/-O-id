# Disconnected

Bem-vindo à documentação do `disconnected`, um decorator que permite adicionar um hook a métodos específicos de Custom Elements para execução quando o elemento é desconectado do DOM. Este pacote é parte integrante da biblioteca Element, que visa simplificar o desenvolvimento de Web Components.

## Documentação do Código

### Nome e Classificação

**Nome:** Disconnected

**Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [Typescript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Interação e Objetivo

**Interação:** Este decorator é aplicado a métodos de classes de Custom Elements para executar o método decorado sempre que o `disconnectedCallback` for chamado, ou seja, quando o elemento for removido do DOM.

**Objetivo:** Facilitar a execução de lógica adicional quando o elemento for desconectado do DOM, sem necessidade de sobrescrever manualmente o `disconnectedCallback`.

### Também conhecido como

- Callback de Desconexão
- Hook de Desconexão

### Motivação

A motivação para usar o decorator `disconnected` é simplificar a gestão da lógica de desconexão de elementos customizados em aplicações web. Ele permite:

1. **Execução Automática de Lógica Adicional:** Garante que a lógica adicional definida no método decorado seja executada sempre que o elemento for desconectado do DOM.
2. **Manutenção da Simplicidade:** Evita a necessidade de sobrescrever manualmente o `disconnectedCallback` em cada Custom Element, facilitando a manutenção do código.

### Aplicabilidade

O decorator `disconnected` é aplicável em situações onde se deseja executar automaticamente lógica adicional quando um elemento customizado é removido do DOM. É útil em cenários como:

- **Limpeza de Recursos:** Quando é necessário liberar recursos ou listeners ao remover o componente do DOM.
- **Desconexão de Listeners:** Para remover event listeners ou outras interações quando o elemento é removido do DOM.

### Estrutura

A estrutura do decorator `disconnected` é simples, modificando o `disconnectedCallback` do elemento para incluir a execução do método decorado.

### Participantes

1. **Função Decoradora (`disconnected`)**:
   - **Descrição:** Modifica o `disconnectedCallback` de classes de Custom Elements para executar o método decorado quando o elemento é desconectado do DOM.
   - **Responsabilidade:** Garantir a execução da lógica adicional ao desconectar o elemento do DOM.

2. **Elemento Alvo (`target`)**:
   - **Descrição:** A classe de Custom Element que contém o método decorado com `@disconnected`.
   - **Responsabilidade:** Executar a lógica adicional definida no método decorado ao ser desconectado do DOM.

3. **Método Decorado (`propertyKey`)**:
   - **Descrição:** O método original da classe de Custom Element que é decorado com `@disconnected`.
   - **Responsabilidade:** Realizar a lógica específica definida para ser executada quando o elemento é desconectado do DOM.

### Colaborações

O decorator `disconnected` funciona em conjunto com o `disconnectedCallback` do Custom Element para garantir que a lógica adicional seja executada sempre que o elemento é removido do DOM.

### Consequências

#### Impactos Positivos

- **Simplificação da Lógica de Desconexão:** Centraliza a lógica de desconexão em métodos específicos, facilitando a manutenção e a extensão dos componentes.
- **Automatização da Execução de Lógica:** Garante que a lógica definida seja executada sempre que o elemento for desconectado do DOM, sem necessidade de intervenção manual.

#### Impactos Negativos

- **Complexidade Adicional:** Pode introduzir complexidade na gestão do ciclo de vida de desconexão, especialmente em aplicações que exigem muitas interações ao desconectar elementos.
- **Possível Sobrecarga de Desempenho:** Execuções frequentes ao desconectar elementos podem impactar o desempenho da aplicação, necessitando de cuidados extras em cenários de uso intensivo.

### Implementação

```javascript
function disconnected(target, propertyKey) {
  const disconnectedCallback = target.disconnectedCallback ?? (() => undefined);

  Reflect.defineProperty(target, "disconnectedCallback", {
    async value() {
      await Reflect.apply(disconnectedCallback, this, arguments);
      await this[propertyKey](...arguments);
      return this;
    },
    writable: true,
  });
}

export default disconnected;
```

### Exemplo de Uso

```javascript
import { disconnected, define } from '@bake-js/element';

@define("element-counter")
class Counter extends HTMLElement {
  @disconnected
  onDisconnected() {
    console.log('Elemento desconectado do DOM');
  }
}
```

### Usos Conhecidos

- **Limpeza de Recursos:** Ideal para liberar recursos ou remover listeners ao desconectar o componente do DOM.
- **Desconexão de Interações:** Útil para remover event listeners ou outras interações ao desconectar o elemento do DOM.

### Padrões Relacionados

- **Decorator `connected`:** Pode ser usado em conjunto para gerenciar a lógica de conexão e desconexão de elementos no DOM.
- **Decorator `attributeChanged`:** Complementa o `disconnected`, gerenciando mudanças de atributos em elementos conectados e desconectados do DOM.
- **Observer Pattern:** Pode ser integrado para notificar componentes sobre mudanças relevantes ao serem desconectados do DOM.

### Considerações Finais

O decorator `disconnected` oferece uma solução eficaz para gerenciar a execução de lógica adicional ao desconectar elementos customizados do DOM. Ao garantir que a lógica definida seja executada automaticamente, ele promove uma experiência de desenvolvimento mais simples e organizada.
