# Guia de Uso: Decorator `repaint`

O decorator `repaint` é uma ferramenta que garante a chamada do callback `paintCallback` após a execução de métodos ou a atualização de propriedades em um Custom Element. Isso é crucial para garantir que as ações de pintura sejam realizadas no momento adequado do ciclo de vida do componente.

### Quando Usar

- **Atualizações Visuais**: Ideal para componentes que precisam atualizar sua interface visual sempre que um método é chamado ou uma propriedade é alterada.
- **Ciclo de Vida do Componente**: Útil para assegurar que a lógica de pintura seja invocada apenas quando o componente está conectado ao DOM.

### Como Funciona

O decorator `repaint` intercepta a execução de métodos ou a atribuição de valores a propriedades. Ele assegura que, após a execução, o callback `paintCallback` seja chamado, contanto que o componente esteja pintado (`isPainted`).

### Estrutura

```javascript
/**
 * @param {Object} _target - O alvo do decorator (classe ou protótipo).
 * @param {string} _propertyKey - O nome da propriedade/método decorado.
 * @param {Object} descriptor - O descritor de propriedade/método.
 * @returns {void}
 */
const repaint = (_target, _propertyKey, descriptor) => {
  if (descriptor.value) {
    // Caso seja um método
    const originalMethod = descriptor.value;

    Object.assign(descriptor, {
      async value(...args) {
        // Executa o método original
        await Reflect.apply(originalMethod, this, args);

        // Se o elemento estiver conectado, chama o callback de pintura
        if (this.isPainted) {
          await this[paintCallback]?.();
        }

        // Retorna a instância do componente
        return this;
      },
    });
  }

  if (descriptor.set) {
    // Caso seja um setter
    const originalSetter = descriptor.set;

    Object.assign(descriptor, {
      async set(value) {
        // Chama o setter original
        await Reflect.apply(originalSetter, this, [value]);

        // Se o elemento estiver conectado, chama o callback de pintura
        if (this.isPainted) {
          await this[paintCallback]?.();
        }
      },
    });
  }
}
```

### Parâmetros

1. **_target** (obrigatório):
   - **Tipo:** `Object`
   - **Descrição:** O alvo do decorator, que pode ser uma classe ou protótipo onde o método ou propriedade está definido.

2. **_propertyKey** (obrigatório):
   - **Tipo:** `string`
   - **Descrição:** O nome do método ou propriedade decorada.

3. **descriptor** (obrigatório):
   - **Tipo:** `Object`
   - **Descrição:** O descritor de propriedade/método que contém a lógica original a ser decorada.

### Passos para Utilização

1. **Importe o decorator `repaint`**:

   ```javascript
   import { repaint } from '@bake-js/-o-id/dom';
   ```

2. **Aplique o decorator à propriedade ou método do seu Custom Element**:

   - **Passo 1:** Identifique o método ou a propriedade que deve invocar o callback de pintura após sua execução.
   - **Passo 2:** Aplique o decorator `repaint` sobre o método ou o setter da propriedade.

### Exemplo Prático

**Exemplo 1: Usando em um Método**

Aqui está um exemplo de como utilizar o `repaint` em um método de um Custom Element:

```javascript
import { define } from '@bake-js/-o-id';
import { repaint } from '@bake-js/-o-id/dom';

@define('my-component')
class MyComponent extends HTMLElement {
  paintCallback() {
    console.log('Callback de pintura chamado');
  }

  // Método decorado com repaint
  @repaint
  handlePaint() {
    console.log('Método original executado');
  }
}
```

**Explicação:**
- Ao chamar `handlePaint()`, o método original é executado, seguido pela chamada do `paintCallback`, assegurando que a lógica de pintura seja respeitada.

**Exemplo 2: Usando em uma Propriedade**

Você também pode usar o `repaint` em setters de propriedades:

```javascript
import { define } from '@bake-js/-o-id';
import { repaint } from '@bake-js/-o-id/dom';

@define('my-component')
class MyComponent extends HTMLElement {
  #color;

  @repaint
  set color(value) {
    this.#color = value;
    console.log(`Cor definida para: ${value}`);
  }

  get color() {
    return this.#color;
  }
}
```

**Explicação:**
- Quando a propriedade `color` é atualizada, o setter decorado invoca o `paintCallback` após a execução, garantindo que a lógica de pintura do componente seja chamada corretamente.

### Benefícios do Decorator `repaint`

1. **Consistência Visual**: Assegura que a lógica de pintura seja chamada de forma consistente e no momento certo, mantendo a interface do usuário em sincronia com o estado do componente.
2. **Automação**: Automatiza a chamada do `paintCallback`, reduzindo a necessidade de gerenciar manualmente as atualizações visuais em múltiplos locais do código.
3. **Simplicidade e Legibilidade**: Facilita a leitura e manutenção do código, permitindo que os desenvolvedores se concentrem na lógica do componente sem se preocupar com a gestão de ciclos de vida de pintura.

### Considerações Finais

O decorator `repaint` é uma ferramenta essencial para desenvolvedores que buscam garantir que a lógica de pintura dos Custom Elements seja executada de forma automática e eficiente, mantendo a interface visual sempre atualizada e consistente com as mudanças de estado do componente.
