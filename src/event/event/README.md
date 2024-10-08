# Guia de Uso: Decorator `event`

O decorator `event` permite que desenvolvedores declarem listeners de eventos de forma simplificada e gerenciem a conexão e desconexão desses eventos automaticamente com base no ciclo de vida do Custom Element. O decorator pode ser utilizado para eventos comuns como `click`, `keydown`, `mouseover`, entre outros, e inclui suporte para filtros que modificam o comportamento do evento antes que o método decorado seja executado.

### Quando Usar

- **Gerenciamento de Eventos Declarativo**: Útil para adicionar listeners a elementos do DOM de forma concisa, integrando-os ao ciclo de vida do componente.
- **Uso de Filtros**: Permite aplicar filtros como `preventDefault`, `stopPropagation`, ou qualquer outro modificador antes de executar a lógica associada ao evento.

### Estrutura

```javascript
/**
 * @param {string} type - O tipo do evento a ser ouvido (e.g., 'click').
 * @param {string} query - Seletor CSS para filtrar o alvo do evento.
 * @param {...Function} filters - Funções de filtro aplicadas ao evento antes de chamar o método decorado.
 * @returns {Function} - O decorator para adicionar lógica ao método decorado.
 */
const attachEventListener = (type, query, ...filters) => (target, propertyKey) => {
  intercept(connectedCallback)
    .in(target)
    .then(function () {
      const controller = (this[abortController] ??= new AbortController());
      const options = { signal: controller.signal };

      const listener = (event) => {
        if (event.target.matches(query)) {
          this[propertyKey](
            filters.reduce((target, filter) => filter(target), event),
          );
        }
      };

      this.addEventListener(type, listener, options);
      this.shadowRoot?.addEventListener(type, listener, options);
    });

  intercept(disconnectedCallback)
    .in(target)
    .then(function () {
      this[abortController].abort();
    });
};
```

### Parâmetros

1. **type**:
   - **Tipo:** `string`
   - **Descrição:** O tipo de evento a ser monitorado, como `'click'`, `'mouseover'`, ou `'keydown'`.

2. **query**:
   - **Tipo:** `string`
   - **Descrição:** Um seletor CSS que filtra o alvo do evento. Apenas eventos que correspondem ao seletor serão processados.

3. **filters**:
   - **Tipo:** `Function[]`
   - **Descrição:** Funções de filtro opcionais que são aplicadas ao evento antes de chamar o método decorado. Essas funções podem modificar o evento ou impedir sua propagação.

4. **target**:
   - **Tipo:** `Function`
   - **Descrição:** A classe que contém o método decorado, geralmente um Custom Element.

5. **propertyKey**:
   - **Tipo:** `string`
   - **Descrição:** O nome do método que será chamado quando o evento ocorrer.

### Funcionalidade

1. **Intercepta o Ciclo de Vida**: O listener do evento é adicionado quando o Custom Element é conectado ao DOM (via `connectedCallback`) e removido quando o elemento é desconectado (via `disconnectedCallback`), usando um `AbortController` para facilitar a remoção do listener.
2. **Aplicação de Filtros**: Funções de filtro, como `preventDefault()` e `stopPropagation()`, podem ser aplicadas ao evento antes de ele chegar ao método decorado. Isso permite modificar o evento ou bloquear sua propagação de forma declarativa.

### Exemplo Prático

**Exemplo: Listener para Evento de Clique com Filtros**

```javascript
import { define } from '@bake-js/-o-id'
import on, { prevent, stop } from '@bake-js/-o-id/event';

@define('my-component')
class MyComponent extends HTMLElement {
  @on.click('button', prevent, stop)
  handleClick(event) {
    console.log('Botão clicado');
  }

  connectedCallback() {
    this.innerHTML = `<button>Clique Aqui</button>`;
  }
}
```

**Explicação**:
- O decorator `@on.click('button', prevent, stop)` define um listener de clique que será disparado apenas quando o evento ocorrer em um botão dentro do componente.
- Antes de o método `handleClick` ser chamado, os filtros `prevent` (que chama `preventDefault()`) e `stop` (que chama `stopPropagation()`) são aplicados ao evento.
- O listener é automaticamente adicionado quando o componente é inserido no DOM e removido ao ser desconectado, evitando vazamento de memória.

### Filtros Disponíveis

1. **`prevent`**: Impede a ação padrão do evento chamando `event.preventDefault()`.
2. **`stop`**: Evita a propagação do evento chamando `event.stopPropagation()`.

### Proxy para Criação de Decorators

O decorator `event` utiliza um Proxy para gerar decorators dinamicamente com base no tipo de evento:

```javascript
// Proxy para gerar os decorators dinamicamente com base no tipo de evento
const event = new Proxy(
  {},
  {
    get: (_, type) => (query, ...filters) => attachEventListener(type, query, ...filters),
  },
);
```

Isso permite que você use a sintaxe `@on.eventType` para declarar listeners de eventos de maneira declarativa:

- `@on.click('button')`: Escuta cliques em um botão.
- `@on.keydown('input')`: Escuta o evento de pressionar teclas em um campo de input.

### Benefícios do Decorator `event`

1. **Centralização de Lógica**: O código para adicionar e remover listeners de eventos fica encapsulado no decorator, simplificando a lógica dos Custom Elements.
2. **Filtros Poderosos**: A adição de filtros permite modificar o comportamento do evento sem precisar duplicar código em diferentes partes do componente.
3. **Gerenciamento Automático de Listeners**: Listeners são automaticamente limpos quando o componente é desconectado, evitando vazamentos de memória e garantindo uma gestão eficiente dos eventos.
