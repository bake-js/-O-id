# JoinCut

Bem-vindo à documentação do `joinCut`, um decorator que permite adicionar um método adicional para ser executado após o método decorado em Custom Elements. Este pacote é parte integrante da biblioteca Element, que visa simplificar o desenvolvimento de Web Components.

## Documentação do Código

### Nome e Classificação

**Nome:** JoinCut

**Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Interação e Objetivo

**Interação:** Este decorator é aplicado a métodos de classes de Custom Elements para executar um método adicional especificado após a execução do método decorado.

**Objetivo:** Facilitar a adição de lógica adicional que deve ser executada após um método específico sem a necessidade de sobrescrever manualmente o método original.

### Também conhecido como

- Join Point
- Post Method Hook

### Motivação

A motivação para usar o decorator `joinCut` é simplificar a adição de lógica adicional após a execução de um método específico em classes de Custom Elements. Ele permite:

1. **Execução Automática de Lógica Adicional:** Garante que a lógica adicional definida em um método específico seja executada após o método decorado.
2. **Manutenção da Simplicidade:** Evita a necessidade de modificar manualmente cada método para adicionar lógica adicional.

### Aplicabilidade

O decorator `joinCut` é aplicável em situações onde se deseja executar automaticamente lógica adicional após a execução de um método específico em classes de Custom Elements. É útil em cenários como:

- **Execução de Limpeza:** Para executar tarefas de limpeza ou finalização após a execução de métodos principais.
- **Encadeamento de Métodos:** Para encadear métodos de forma que um método adicional seja sempre executado após o método principal.

### Estrutura

A estrutura do decorator `joinCut` é simples, modificando o método original para incluir a execução do método adicional especificado após a sua execução.

### Participantes

1. **Função Decoradora (`joinCut`)**:
   - **Descrição:** Modifica métodos de classes de Custom Elements para executar um método adicional após a execução do método decorado.
   - **Responsabilidade:** Garantir a execução da lógica adicional após o método decorado.

2. **Elemento Alvo (`target`)**:
   - **Descrição:** A classe de Custom Element que contém o método decorado com `@joinCut`.
   - **Responsabilidade:** Executar a lógica específica definida no método decorado e a lógica adicional no método especificado.

3. **Método Decorado (`propertyKey`)**:
   - **Descrição:** O método original da classe de Custom Element que é decorado com `@joinCut`.
   - **Responsabilidade:** Realizar a lógica principal definida e, em seguida, executar o método adicional especificado.

### Colaborações

O decorator `joinCut` funciona em conjunto com o método original da classe de Custom Element para garantir que a lógica adicional seja executada após o método decorado.

### Consequências

#### Impactos Positivos

- **Simplificação da Lógica:** Centraliza a lógica adicional em métodos específicos, facilitando a manutenção e a extensão dos componentes.
- **Automatização da Execução de Lógica:** Garante que a lógica definida seja executada após o método decorado, sem necessidade de intervenção manual.

#### Impactos Negativos

- **Complexidade Adicional:** Pode introduzir complexidade na gestão de métodos encadeados, especialmente em aplicações que exigem muitas interações entre métodos.
- **Possível Sobrecarga de Desempenho:** Execuções frequentes de lógica adicional podem impactar o desempenho da aplicação, necessitando de cuidados extras em cenários de uso intensivo.

### Implementação

```javascript
function joinCut(method) {
  return (_target, _propertyKey, descriptor) => {
    const value = descriptor.value;

    Object.assign(descriptor, {
      async value() {
        await Reflect.apply(value, this, arguments);
        await this[method]?.();
        return this;
      },
    });
  };
}

export default joinCut;
```

### Exemplo de Uso

```javascript
import { joinCut, define } from '@bake-js/element';

@define("element-example")
class Example extends HTMLElement {
  @joinCut('afterMethod')
  someMethod() {
    console.log('Método principal executado');
  }

  afterMethod() {
    console.log('Método adicional executado após o método principal');
  }
}
```

### Usos Conhecidos

- **Execução de Limpeza:** Ideal para executar tarefas de limpeza ou finalização após métodos principais.
- **Encadeamento de Métodos:** Útil para encadear métodos de forma que um método adicional seja sempre executado após o método principal.

### Padrões Relacionados

- **Decorator `connected`:** Pode ser usado em conjunto para gerenciar lógica adicional ao conectar elementos ao DOM.
- **Decorator `disconnected`:** Complementa o `joinCut`, gerenciando lógica adicional quando o elemento é desconectado do DOM.
- **Observer Pattern:** Pode ser integrado para notificar componentes sobre mudanças relevantes após a execução de métodos.

### Considerações Finais

O decorator `joinCut` oferece uma solução eficaz para gerenciar a execução de lógica adicional após métodos específicos em classes de Custom Elements. Ao garantir que a lógica definida seja executada automaticamente após o método decorado, ele promove uma experiência de desenvolvimento mais simples e organizada.
