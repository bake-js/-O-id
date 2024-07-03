# paint

#### Nome e Classificação

**Nome:** Paint Decorator  
**Classificação:** Decorator Pattern (Padrão de Projeto Estrutural)

#### Interação e Objetivo

**Interação:** Este decorator é aplicado a classes de componentes web para adicionar um ciclo de vida de pintura (renderização).  
**Objetivo:** Simplificar a adição de um ciclo de vida de pintura a componentes, garantindo que certas ações ocorram antes e depois da renderização do conteúdo do componente.

#### Também Conhecido Como

- Decorator de Renderização
- Render Lifecycle Decorator

#### Motivação

Garantir que componentes web passem por um ciclo de vida específico durante sua renderização, permitindo que ações personalizadas sejam executadas antes e depois da atualização do conteúdo.

#### Aplicabilidade

Este padrão é aplicável quando se deseja:
- Adicionar comportamentos específicos de ciclo de vida a componentes web.
- Garantir que certos métodos sejam chamados antes e depois da renderização do componente.
- Facilitar a reutilização de lógica de renderização entre diferentes componentes.

#### Estrutura

1. **Função `paint`**: A função decoradora que adiciona métodos de ciclo de vida ao componente alvo.
2. **Métodos no `trait`**: Métodos específicos (`willPaint`, `didPaint`, `painted`) usados para controlar o ciclo de vida.

#### Participantes

- **Função Decoradora (`paint`)**: Adiciona os métodos de ciclo de vida ao componente.
- **Componente (`Element`)**: O componente ao qual o decorator é aplicado.
- **Trait**: Um conjunto de propriedades e métodos que definem o ciclo de vida de pintura.

#### Colaborações

- O decorator `paint` colabora com os métodos definidos no `trait` para garantir que as ações de pré e pós-renderização sejam executadas corretamente.
- O componente decorado chama os métodos `connectedCallback` e `paint` em seu ciclo de vida.

#### Consequências

- **Positivas**: Adiciona um ciclo de vida de pintura consistente aos componentes. Facilita a manutenção e a legibilidade do código.
- **Negativas**: Pode adicionar complexidade ao ciclo de vida do componente, exigindo conhecimento do decorator para compreensão completa.

#### Implementação

```javascript
import trait from "../trait";

function paint(component) {
  return (target) => {
    const connectedCallback =
      target.prototype.connectedCallback ?? (() => undefined);

    Reflect.defineProperty(target.prototype, trait.paint, {
      async value() {
        await this[trait.willPaint]?.();
        (this.shadowRoot ?? this).innerHTML = await component(this);
        await this[trait.didPaint]?.();
        this[trait.painted] = true;
      },
      writable: true,
    });

    Reflect.defineProperty(target.prototype, "connectedCallback", {
      async value() {
        await Reflect.apply(connectedCallback, this, arguments);
        await this[trait.paint]();
        return this;
      },
      writable: true,
    });
  };
}

export default paint;
```

#### Exemplo de Código

```typescript
import { paint } from "@bake-js/element";

function component() {
  return "<div />";
}

@paint(component)
class Element {

}
```

#### Usos Conhecidos

- Componentes web que requerem um ciclo de vida específico de renderização, como atualizações dinâmicas de conteúdo.

#### Padrões Relacionados

- **Decorator Pattern**: O padrão geral do qual este código é uma implementação específica.
- **Observer Pattern**: Pode ser usado em conjunto com o decorator para notificar outras partes do sistema sobre mudanças de estado no componente.

### Considerações Finais

Este decorator simplifica a gestão do ciclo de vida de renderização em componentes web, facilitando a adição de lógica antes e depois da renderização de forma declarativa e reutilizável.
