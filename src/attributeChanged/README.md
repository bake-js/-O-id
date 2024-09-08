# AttributeChanged

O `attributeChanged` é um decorator que permite adicionar lógica personalizada a métodos específicos de Custom Elements para execução quando um atributo definido é alterado. Ele é parte da biblioteca `@bake-js/-o-id` e fornece uma abordagem declarativa para gerenciar mudanças de atributos.

## Visão Geral

### Nome e Classificação

- **Nome:** AttributeChanged
- **Classificação:** Decorators [ES Proposals](https://www.proposals.es/proposals/Decorators), [TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)

### Objetivo

Proporcionar uma maneira eficiente de reagir a alterações de atributos em Custom Elements, simplificando a lógica de atualização de componentes.

## Motivação

O uso do `attributeChanged` oferece as seguintes vantagens:

1. **Reatividade a Alterações de Atributos:** Garante que o método decorado seja executado sempre que o atributo especificado for alterado.
2. **Manutenção da Consistência:** Facilita a atualização de estados internos e a adaptação visual do componente em resposta a mudanças de atributos.
3. **Filtros Personalizados:** Permite aplicar filtros aos novos valores dos atributos antes de executar a lógica personalizada.

## Aplicabilidade

Ideal para qualquer situação onde se deseja responder a alterações de atributos específicos em Custom Elements. É especialmente útil para:

- **Componentes Interativos:** Quando a atualização dinâmica com base em atributos é necessária.
- **Sincronização de Estados Internos:** Para manter a consistência entre atributos e o estado interno do componente.

## Importação

Para utilizar o decorator `attributeChanged`, importe-o da seguinte maneira:

```javascript
import { attributeChanged } from '@bake-js/-o-id';
```

## Implementação

```javascript
import intercept from "../intercept";
import { attributeChangedCallback, observedAttributes } from "../interfaces";

const attributeChanged =
  (attributeName, ...filters) =>
  (target, propertyKey, propertyDescriptor) => {
    const observedAttrs = target.constructor[observedAttributes] ?? [];

    Object.assign(target.constructor, {
      [observedAttributes]: [...observedAttrs, attributeName],
    });

    intercept(attributeChangedCallback)
      .in(target)
      .then(function (name, oldValue, newValue) {
        if (name === attributeName && oldValue !== newValue) {
          const value = filters.reduce(
            (value, filter) => filter(value),
            newValue,
          );

          if (propertyDescriptor.set) {
            this[propertyKey] = value;
          }

          if (propertyDescriptor.value) {
            this[propertyKey](value, oldValue);
          }
        }
      });
  };

export default attributeChanged;
```

### Exemplo de Uso

```javascript
import { attributeChanged } from '@bake-js/-o-id';

class MyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  @attributeChanged('value', value => value.toUpperCase())
  handleAttributeChange(newValue, oldValue) {
    console.log(`Atributo 'value' alterado de ${oldValue} para ${newValue}`);
  }
}

customElements.define('my-element', MyElement);
```

## Comparação com Concorrentes

### Lit

- **Sincronização Automática:** Sincroniza mudanças de atributos com propriedades reativas. Lit configura automaticamente a matriz `observedAttributes` para refletir a lista de propriedades reativas do componente.
- **Atributos e Propriedades:** O Lit utiliza o `attributeChangedCallback` para atualizar propriedades reativas com base nas alterações de atributos.

Para mais detalhes sobre Lit, veja a [documentação oficial](https://lit.dev/docs/components/lifecycle/#attributechangedcallback).

```javascript
import { LitElement, html } from 'lit';

class MyElement extends LitElement {
  static properties = {
    value: {},
  };

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value') {
      console.log(`Atributo 'value' alterado de ${oldValue} para ${newValue}`);
    }
  }

  render() {
    return html`<div>Value: ${this.value}</div>`;
  }
}

customElements.define('my-element', MyElement);
```

### Stencil

- **Propriedades e Atributos:** O Stencil usa o decorator `@Prop()` para mapear propriedades para atributos DOM, com opções para personalizar nomes e comportamento dos atributos.
- **Configuração de Atributos:** Permite definir explicitamente o nome dos atributos e se eles são refletidos no DOM.

Para mais detalhes sobre Stencil, veja a [documentação oficial](https://stenciljs.com/docs/props).

```typescript
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'todo-list-item',
})
export class ToDoListItem {
  @Prop({ attribute: 'complete' }) isComplete: boolean;
  @Prop({ attribute: 'thing' }) thingToDo: string;
  @Prop({ attribute: 'my-service' }) httpService: MyHttpService;
}
```

### Vantagens do `@attributeChanged`

- **Simplicidade na Implementação:** Facilita a adição de lógica de resposta a mudanças de atributos, centralizando a implementação.
- **Reatividade Aprimorada:** Permite que componentes respondam rapidamente a alterações de atributos, mantendo a experiência do usuário fluida.
- **Flexibilidade com Filt

ros:** Oferece a capacidade de aplicar filtros personalizados aos valores dos atributos antes da execução da lógica, aumentando a flexibilidade e a adaptabilidade do componente.

## Considerações Finais

O `attributeChanged` oferece uma solução prática e eficiente para gerenciar respostas a mudanças de atributos em Custom Elements. Ele promove a reatividade e a facilidade de manutenção dos componentes, facilitando a atualização e a sincronização do estado interno com os atributos do DOM. Com a adição de filtros, o decorator se torna ainda mais poderoso, permitindo ajustes personalizados nos valores dos atributos antes de executar a lógica específica do componente.
