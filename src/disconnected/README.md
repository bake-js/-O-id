# Disconnected

O `disconnected` é um decorator que adiciona um hook aos métodos de Custom Elements para execução quando o elemento é desconectado do DOM. Este pacote faz parte da biblioteca Element.

## Visão Geral

### Nome e Classificação

- **Nome:** Disconnected
- **Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Objetivo

Facilitar a execução de lógica adicional quando o elemento for desconectado do DOM, sem a necessidade de sobrescrever manualmente o `disconnectedCallback`.

## Motivação

Utilizar o `disconnected` proporciona as seguintes vantagens:

1. **Execução Automatizada:** Garante que a lógica definida no método decorado seja executada sempre que o elemento for desconectado do DOM.
2. **Simplicidade e Manutenção:** Elimina a necessidade de sobrescrever o `disconnectedCallback` manualmente, simplificando a manutenção do código.

## Aplicabilidade

Ideal para situações onde é necessário executar automaticamente lógica adicional ao remover um elemento customizado do DOM, como:

- **Limpeza de Recursos:** Liberação de recursos ou listeners ao desconectar o componente.
- **Desconexão de Listeners:** Remoção de event listeners ou outras interações ao remover o elemento do DOM.

## Importação

Para utilizar o decorator `disconnected`, importe-o da seguinte forma:

```javascript
import { disconnected } from '@bake-js/-o-id';
```

## Implementação

```javascript
import intercept from "../intercept";
import { disconnectedCallback } from "../interfaces";

/**
 * Decorator que adiciona lógica ao método `disconnectedCallback` de um Custom Element.
 *
 * @param target - O alvo do decorator, geralmente a classe do Custom Element.
 * @param propertyKey - O nome do método decorado.
 * @returns Um decorator que intercepta a chamada do `disconnectedCallback`.
 */
const disconnected = (target, propertyKey) => {
  // Cria uma instância do interceptor para o método `disconnectedCallback`.
  const interceptor = intercept(disconnectedCallback);

  // Adiciona o método decorado à lista de callbacks a serem executados.
  return interceptor
    .in(target) // Define o alvo do interceptor.
    .then(exec(propertyKey)); // Define o método a ser executado pelo interceptor.
};

export default disconnected;
```

### Exemplo de Uso

```javascript
import { disconnected, define } from '@bake-js/-o-id';

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

## Comparação com Concorrentes

### Lit

- **Requer Sobrescrição:** É necessário sobrescrever `disconnectedCallback` manualmente.
- **Pausa Automática:** Pausa o ciclo de atualização reativa automaticamente ao desconectar o elemento.

Para mais detalhes sobre Lit, veja a [documentação oficial](https://lit.dev/docs/components/lifecycle/#disconnectedcallback).

```typescript
disconnectedCallback() {
  super.disconnectedCallback();
  window.removeEventListener('keydown', this._handleKeydown);
}
```

### Stencil

- **Automático:** O `disconnectedCallback` é chamado automaticamente sempre que o componente é desconectado do DOM, podendo ser disparado mais de uma vez. Diferente do evento de "destruição", é usado para limpar o componente.

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
- **Flexibilidade:** Não exige a extensão de uma classe específica, proporcionando maior flexibilidade.

## Considerações Finais

O decorator `disconnected` oferece uma solução eficiente para gerenciar a execução de lógica adicional ao desconectar elementos customizados do DOM. Facilita a manutenção do código e garante uma limpeza eficiente de recursos e listeners, promovendo uma experiência de desenvolvimento mais organizada e simplificada.
