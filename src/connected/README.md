# Connected

Bem-vindo à documentação do `connected`, um decorator que permite adicionar um hook a métodos específicos de Custom Elements para execução quando o elemento é conectado ao DOM. Este pacote é parte integrante da biblioteca Element, que visa simplificar o desenvolvimento de Web Components.

## Documentação do Código

### Nome e Classificação

**Nome:** Connected

**Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [Typescript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Interação e Objetivo

**Interação:** Este decorator é aplicado a métodos de classes de Custom Elements para executar o método decorado sempre que o `connectedCallback` for chamado, ou seja, quando o elemento for adicionado ao DOM.

**Objetivo:** Facilitar a execução de lógica adicional quando o elemento for conectado ao DOM, sem necessidade de sobrescrever manualmente o `connectedCallback`.

### Também conhecido como

- Callback de Conexão
- Hook de Conexão

### Motivação

A motivação para usar o decorator `connected` é simplificar a gestão da lógica de conexão de elementos customizados em aplicações web. Ele permite:

1. **Execução Automática de Lógica Adicional:** Garante que a lógica adicional definida no método decorado seja executada sempre que o elemento for conectado ao DOM.
2. **Manutenção da Simplicidade:** Evita a necessidade de sobrescrever manualmente o `connectedCallback` em cada Custom Element, facilitando a manutenção do código.

### Aplicabilidade

O decorator `connected` é aplicável em situações onde se deseja executar automaticamente lógica adicional quando um elemento customizado é adicionado ao DOM. É útil em cenários como:

- **Inicialização de Estado:** Quando é necessário inicializar o estado do componente ao ser conectado ao DOM.
- **Configuração de Listeners:** Para configurar event listeners ou outras interações quando o elemento é adicionado ao DOM.

### Estrutura

A estrutura do decorator `connected` é simples, modificando o `connectedCallback` do elemento para incluir a execução do método decorado.

### Participantes

1. **Função Decoradora (`connected`)**:
   - **Descrição:** Modifica o `connectedCallback` de classes de Custom Elements para executar o método decorado quando o elemento é conectado ao DOM.
   - **Responsabilidade:** Garantir a execução da lógica adicional ao conectar o elemento ao DOM.

2. **Elemento Alvo (`target`)**:
   - **Descrição:** A classe de Custom Element que contém o método decorado com `@connected`.
   - **Responsabilidade:** Executar a lógica adicional definida no método decorado ao ser conectado ao DOM.

3. **Método Decorado (`propertyKey`)**:
   - **Descrição:** O método original da classe de Custom Element que é decorado com `@connected`.
   - **Responsabilidade:** Realizar a lógica específica definida para ser executada quando o elemento é conectado ao DOM.

### Colaborações

O decorator `connected` funciona em conjunto com o `connectedCallback` do Custom Element para garantir que a lógica adicional seja executada sempre que o elemento é conectado ao DOM.

### Consequências

#### Impactos Positivos

- **Simplificação da Lógica de Conexão:** Centraliza a lógica de conexão em métodos específicos, facilitando a manutenção e a extensão dos componentes.
- **Automatização da Execução de Lógica:** Garante que a lógica definida seja executada sempre que o elemento for conectado ao DOM, sem necessidade de intervenção manual.

#### Impactos Negativos

- **Complexidade Adicional:** Pode introduzir complexidade na gestão do ciclo de vida de conexão, especialmente em aplicações que exigem muitas interações ao conectar elementos.
- **Possível Sobrecarga de Desempenho:** Execuções frequentes ao conectar elementos podem impactar o desempenho da aplicação, necessitando de cuidados extras em cenários de uso intensivo.

### Implementação

```javascript
function connected(target, propertyKey) {
  const connectedCallback = target.connectedCallback ?? (() => undefined);

  Reflect.defineProperty(target, "connectedCallback", {
    async value() {
      await Reflect.apply(connectedCallback, this, arguments);
      await this[propertyKey](...arguments);
      return this;
    },
    writable: true,
  });
}

export default connected;
```

### Exemplo de Uso

```javascript
import { connected, define } from '@bake-js/element';

@define("element-counter")
class Counter extends HTMLElement {
  @connected
  onConnected() {
    console.log('Elemento conectado ao DOM');
  }
}
```

### Usos Conhecidos

- **Inicialização de Componentes:** Ideal para inicializar o estado de componentes ao serem adicionados ao DOM.
- **Configuração de Interações:** Útil para configurar event listeners ou outras interações ao conectar o elemento ao DOM.

### Padrões Relacionados

- **Decorator `attributeChanged`:** Pode ser usado em conjunto para gerenciar mudanças de atributos em elementos conectados ao DOM.
- **Decorator `disconnected`:** Complementa o `connected`, gerenciando lógica adicional quando o elemento é desconectado do DOM.
- **Observer Pattern:** Pode ser integrado para notificar componentes sobre mudanças relevantes ao serem conectados ao DOM.

### Considerações Finais

O decorator `connected` oferece uma solução eficaz para gerenciar a execução de lógica adicional ao conectar elementos customizados ao DOM. Ao garantir que a lógica definida seja executada automaticamente, ele promove uma experiência de desenvolvimento mais simples e organizada.
