# On

Bem-vindo à documentação do `on`, um decorator que permite adicionar event delegation a métodos específicos de Custom Elements, executando-os quando um evento ocorre em elementos que correspondem a um seletor CSS específico. Este pacote é parte integrante da biblioteca Element, que visa simplificar o desenvolvimento de Web Components.

## Documentação do Código

### Nome e Classificação

**Nome:** On

**Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [Typescript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Interação e Objetivo

**Interação:** Este decorator é aplicado a métodos de classes de Custom Elements para executar o método decorado sempre que um evento ocorre em elementos que correspondem a um seletor CSS específico.

**Objetivo:** Facilitar a adição de lógica de manipulação de eventos a elementos específicos dentro de um Custom Element, sem a necessidade de adicionar manualmente event listeners para cada elemento.

### Também conhecido como

- Event Delegation
- Event Listener Decorator

### Motivação

A motivação para usar o decorator `on` é simplificar a gestão de eventos em elementos customizados em aplicações web. Ele permite:

1. **Execução Automática de Lógica de Eventos:** Garante que a lógica de manipulação de eventos seja executada sempre que o evento especificado ocorre em elementos que correspondem ao seletor CSS.
2. **Manutenção da Simplicidade:** Evita a necessidade de adicionar manualmente event listeners para cada elemento individual, facilitando a manutenção do código.

### Aplicabilidade

O decorator `on` é aplicável em situações onde se deseja adicionar logicamente manipulação de eventos a elementos específicos dentro de um Custom Element. É útil em cenários como:

- **Interação do Usuário:** Quando é necessário adicionar lógica de interação ao usuário a elementos específicos dentro de um Custom Element.
- **Manipulação de Formulários:** Para manipular eventos de entrada do usuário em formulários dentro de um Custom Element.

### Estrutura

A estrutura do decorator `on` é simples, adicionando event listeners para elementos que correspondem a um seletor CSS específico dentro de um Custom Element.

### Participantes

1. **Função Decoradora (`on`)**:
   - **Descrição:** Adiciona event listeners para eventos específicos em elementos que correspondem a um seletor CSS dentro de um Custom Element.
   - **Responsabilidade:** Garantir que a lógica de manipulação de eventos seja executada quando o evento ocorre em elementos que correspondem ao seletor CSS.

2. **Elemento Alvo (`target`)**:
   - **Descrição:** A classe de Custom Element que contém o método decorado com `@on`.
   - **Responsabilidade:** Executar a lógica de manipulação de eventos definida no método decorado quando o evento ocorre em elementos que correspondem ao seletor CSS.

3. **Método Decorado (`propertyKey`)**:
   - **Descrição:** O método original da classe de Custom Element que é decorado com `@on`.
   - **Responsabilidade:** Realizar a lógica específica de manipulação de eventos definida para ser executada quando o evento ocorre em elementos que correspondem ao seletor CSS.

### Colaborações

O decorator `on` funciona em conjunto com os métodos `connectedCallback` e `disconnectedCallback` do Custom Element para garantir que os event listeners sejam adicionados e removidos corretamente quando o elemento é conectado ou desconectado do DOM.

### Consequências

#### Impactos Positivos

- **Simplificação da Lógica de Eventos:** Centraliza a lógica de manipulação de eventos em métodos específicos, facilitando a manutenção e a extensão dos componentes.
- **Automatização da Execução de Lógica de Eventos:** Garante que a lógica definida seja executada sempre que o evento ocorre em elementos que correspondem ao seletor CSS, sem necessidade de intervenção manual.

#### Impactos Negativos

- **Complexidade Adicional:** Pode introduzir complexidade na gestão de eventos, especialmente em aplicações que exigem muitas interações de eventos.
- **Possível Sobrecarga de Desempenho:** Muitos event listeners podem impactar o desempenho da aplicação, necessitando de cuidados extras em cenários de uso intensivo.

### Implementação

```javascript
const on = new Proxy(
  {},
  {
    get(_, event) {
      return (query) => (target, propertyKey) => {
        const connectedCallback = target.connectedCallback ?? (() => undefined);

        const disconnectedCallback =
          target.disconnectedCallback ?? (() => undefined);

        function listener(event) {
          event.target.matches(query) && this[propertyKey](event);
        }

        Reflect.defineProperty(target, "connectedCallback", {
          async value() {
            await Reflect.apply(connectedCallback, this, arguments);
            (this.shadowRoot ?? this).addEventListener(
              event,
              listener.bind(this),
            );
            return this;
          },
          writable: true,
        });

        Reflect.defineProperty(target, "disconnectedCallback", {
          async value() {
            await Reflect.apply(disconnectedCallback, this, arguments);
            (this.shadowRoot ?? this).removeEventListener(
              event,
              listener.bind(this),
            );
            return this;
          },
          writable: true,
        });
      };
    },
  },
);

export default on;
```

### Exemplo de Uso

```javascript
import { on, define } from '@bake-js/element';

@define("element-counter")
class Counter extends HTMLElement {
  @on.click('button')
  handleClick(event) {
    console.log('Button clicked!', event);
  }
}
```

### Usos Conhecidos

- **Interação com Botões:** Ideal para adicionar lógica de manipulação de cliques em botões dentro de um Custom Element.
- **Formulários:** Útil para manipular eventos de entrada do usuário em formulários dentro de um Custom Element.

### Padrões Relacionados

- **Decorator `attributeChanged`:** Pode ser usado em conjunto para gerenciar mudanças de atributos em elementos que disparam eventos.
- **Decorator `connected`:** Complementa o `on`, gerenciando lógica adicional quando o elemento é conectado ao DOM.
- **Observer Pattern:** Pode ser integrado para notificar componentes sobre mudanças relevantes que disparam eventos.

### Considerações Finais

O decorator `on` oferece uma solução eficaz para gerenciar a manipulação de eventos em elementos customizados dentro de um Custom Element. Ao garantir que a lógica de eventos seja executada automaticamente, ele promove uma experiência de desenvolvimento mais simples e organizada.
