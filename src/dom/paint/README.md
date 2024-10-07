# Guia de Uso: Decorator `paint`

O decorator `paint` é uma ferramenta poderosa que permite a definição declarativa de HTML e estilos para um Custom Element. Ele otimiza o processo de renderização e garante que os ciclos de vida do componente sejam respeitados.

### Quando Usar

- **Renderização Controlada**: Ideal para componentes que requerem uma renderização específica e eficiente.
- **Estilos Encapsulados**: Útil para aplicar estilos encapsulados a um componente, utilizando `adoptedStyleSheets`.
- **Desempenho**: Para melhorar o desempenho de renderização ao utilizar `requestAnimationFrame`.

### Como Funciona

O decorator `paint` intercepta os métodos de ciclo de vida `paintCallback`, `willPaintCallback`, `didPaintCallback` e `connectedCallback`, permitindo uma renderização otimizada e controlada do componente.

### Estrutura

```javascript
/**
 * @param {Function} component - Função que retorna o HTML a ser renderizado.
 * @param {Function} [style] - Função opcional que retorna as folhas de estilo a serem aplicadas.
 * @returns {Function} - O decorator para ser aplicado à classe do componente.
 */
const paint =
  (component, style = () => []) =>
  (target) => {
    // Intercepta o método paintCallback para adicionar lógica de renderização
    intercept(paintCallback)
      .in(target.prototype)
      .then(async function () {
        // Função para renderizar o componente após o próximo frame
        const render = (resolve) => {
          requestAnimationFrame(() => {
            (this.shadowRoot ?? document).adoptedStyleSheets = style(this);
            (this.shadowRoot ?? this).innerHTML = component(this);
            this.isPainted = true;
            resolve();
          });
        };

        // Executa os callbacks de ciclo de vida antes e depois da renderização
        await this[willPaintCallback]?.();
        await new Promise(render);
        await this[didPaintCallback]?.();
      });

    // Intercepta o método connectedCallback para garantir que paintCallback seja chamado
    intercept(connectedCallback)
      .in(target.prototype) // Define o alvo do interceptor.
      .then(exec(paintCallback)); // Define o método a ser executado pelo interceptor.
  };

export default paint;
```

### Parâmetros

1. **component** (obrigatório):
   - **Tipo:** `Function`
   - **Descrição:** Uma função que retorna uma string contendo o HTML a ser renderizado. Essa função é chamada com a instância do componente como argumento.

2. **style** (opcional):
   - **Tipo:** `Function`
   - **Descrição:** Uma função que retorna um array de folhas de estilo (`CSSStyleSheet`) a serem aplicadas ao componente. Se não fornecido, um array vazio será utilizado por padrão.

### Passos para Utilização

1. **Importe o decorator `paint`**:

   ```javascript
   import { paint } from '@bake-js/-o-id/dom';
   ```

2. **Aplique o decorator à classe do seu Custom Element**:

   - **Passo 1:** Identifique a função que gera o HTML do seu componente.
   - **Passo 2:** Aplique o decorator `paint`, passando a função de renderização e, opcionalmente, a função de estilo.

3. **Implemente a lógica de conexão**:

   - O decorator cuida da chamada ao método `paintCallback` dentro do ciclo de vida do componente, garantindo que a renderização ocorra no momento apropriado.

### Exemplo Prático

**Exemplo 1: Renderização Simples**

Aqui está um exemplo de como utilizar o `paint` para renderizar um Custom Element com um conteúdo dinâmico:

```javascript
import { define } from '@bake-js/-o-id'
import { html, paint, css } from '@bake-js/-o-id/dom';

const component = (element) => {
  return html`
    <div>My component</div>
  `
};

const style = () => {
  return css`
    div {
      color: red;
    }
  `
};

@define('my-component')
@paint(component, style)
class MyComponent extends HTMLElement {
  connectedCallback() {
    console.log('MyComponent conectado');
  }
}
```

**Explicação:**
- O método de renderização gera um `div` contendo o valor de `someProperty`. As folhas de estilo são aplicadas através de `adoptedStyleSheets`.

**Exemplo 2: Comportamento de Estilo Personalizado**

Você pode adicionar estilos personalizados ao seu componente:

```javascript
import { define } from '@bake-js/-o-id'
import { html, paint, css } from '@bake-js/-o-id/dom';

const component = (element) => {
  return html`
    <div>${element.color}</div>
  `
};

const style = (element) => {
  return css`
    div {
      color: ${element.color};
    }
  `
};

@define('my-styled-component')
@paint(component, style)
class MyStyledComponent extends HTMLElement {
  connectedCallback() {
    console.log('MyStyledComponent conectado');
    this.color = 'blue'; // Define uma propriedade para a cor
  }
}
```

**Explicação:**
- O `customStyle` retorna uma folha de estilo que aplica uma cor dinâmica ao texto do `div` baseado na propriedade `color` do componente.

### Benefícios do Decorator `paint`

1. **Centralização da Lógica de Renderização**: Permite que a lógica de renderização e estilo seja centralizada, melhorando a legibilidade e manutenção do código.
2. **Desempenho Otimizado**: Utiliza `requestAnimationFrame` para garantir que a renderização ocorra no momento ideal, melhorando o desempenho visual.
3. **Estilos Encapsulados**: Suporte a `adoptedStyleSheets`, permitindo a aplicação de estilos sem poluir o escopo global.

### Considerações Finais

O decorator `paint` oferece uma maneira eficaz e organizada de gerenciar a renderização e os estilos de Custom Elements, garantindo que o ciclo de vida de renderização seja respeitado e otimizado.
