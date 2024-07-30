# Disconnected

O `disconnected` é um decorator que permite adicionar um hook a métodos específicos de Custom Elements para execução quando o elemento é desconectado do DOM. Este pacote é parte integrante da biblioteca Element.

## Visão Geral

### Nome e Classificação

- **Nome:** Disconnected
- **Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Objetivo

Facilitar a execução de lógica adicional quando o elemento for desconectado do DOM, sem a necessidade de sobrescrever manualmente o `disconnectedCallback`.

## Motivação

Usar o `disconnected` traz as seguintes vantagens:

1. **Execução Automática de Lógica Adicional:** Garante que a lógica adicional definida no método decorado seja executada sempre que o elemento for desconectado do DOM.
2. **Manutenção da Simplicidade:** Evita a necessidade de sobrescrever manualmente o `disconnectedCallback` em cada Custom Element, facilitando a manutenção do código.

## Aplicabilidade

Ideal para qualquer situação onde se deseja executar automaticamente lógica adicional quando um elemento customizado é removido do DOM. É útil em cenários como:

- **Limpeza de Recursos:** Quando é necessário liberar recursos ou listeners ao remover o componente do DOM.
- **Desconexão de Listeners:** Para remover event listeners ou outras interações quando o elemento é removido do DOM.

## Implementação

```javascript
import intercept, { exec } from "../intercept";
import { disconnectedCallback } from "../interfaces";

const disconnected = (target, propertyKey) =>
  intercept(disconnectedCallback).in(target).then(exec(propertyKey));

export default disconnected;
```

### Exemplo de Uso

```typescript
import { disconnected, define } from '@bake-js/element';

@define("element-cleanup")
class CleanupElement extends HTMLElement {
  @disconnected
  onDisconnected() {
    console.log('Elemento desconectado do DOM');
    window.removeEventListener('resize', this.handleResize);
  }

  connectedCallback() {
    window.addEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    console.log('Redimensionamento detectado');
  }
}
```

## Comparação com concorrentes

### Lit

- **Requer Sobrescrição:** Necessário sobrescrever `disconnectedCallback` manualmente.
- **Pausa Automática:** Pausa o ciclo de atualização reativa automaticamente quando o elemento é desconectado.

Para mais detalhes sobre Lit, veja a [documentação oficial](https://lit.dev/docs/components/lifecycle/#disconnectedcallback).

```typescript
disconnectedCallback() {
  super.disconnectedCallback();
  window.removeEventListener('keydown', this._handleKeydown);
}
```

### Stencil

- **Automático:** Implementa `disconnectedCallback` automaticamente para indicar que o componente foi removido do DOM. Chamado toda vez que o componente é desconectado do DOM, e pode ser disparado mais de uma vez. Não deve ser confundido com um evento de "destruição".

Para mais detalhes sobre Stencil, veja a [documentação oficial](https://stenciljs.com/docs/component-lifecycle#disconnectedcallback).

```typescript
@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  disconnectedCallback() {
    // Lógica de limpeza aqui
  }
}
```

### Vantagens do `@disconnected`

- **Interface Nativa:** Respeita a assinatura do método nativo `disconnectedCallback` ([MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks)).
- **Flexibilidade:** Não obriga a extensão de uma classe específica, oferecendo maior flexibilidade.

## Considerações Finais

O decorator `disconnected` oferece uma solução eficaz para gerenciar a execução de lógica adicional ao desconectar elementos customizados do DOM. Ao garantir que a lógica definida seja executada automaticamente, ele promove uma experiência de desenvolvimento mais simples e organizada, facilitando a manutenção do código e assegurando uma limpeza eficiente de recursos e listeners.
