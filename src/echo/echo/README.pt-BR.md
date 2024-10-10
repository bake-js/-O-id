[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# Guia de Uso: Módulo `Echo`

O módulo `Echo` fornece uma solução para a comunicação entre Custom Elements, implementando um Event Bus (barramento de eventos) de maneira declarativa. Ele facilita a emissão e escuta de eventos entre componentes, permitindo uma comunicação desacoplada e eficiente.

### Quando Usar

- **Comunicação entre Componentes**: Ideal para componentes que precisam compartilhar informações ou notificações sem uma referência direta entre si.
- **Event Bus Centralizado**: Quando há a necessidade de gerenciar eventos em uma arquitetura distribuída, o `Echo` fornece um barramento central para os eventos.
- **Protocolos de Evento Declarativos**: Útil para declarar como os componentes se conectam ao Event Bus via atributos HTML.

### Estrutura

```javascript
/**
 * Mixin Echo para adicionar suporte a um Event Bus em um Custom Element.
 *
 * @param {typeof HTMLElement} Klass - A classe do Custom Element a ser estendida.
 * @returns {typeof HTMLElement} A classe estendida com suporte ao Event Bus.
 */
const Echo = (Klass) => class extends Klass {
  // Implementação do Echo mixin
}
```

### Parâmetros

1. **Klass**:
   - **Tipo:** `typeof HTMLElement`
   - **Descrição:** A classe do Custom Element que será estendida para suportar o Event Bus.

2. **protocol**:
   - **Tipo:** `string`
   - **Descrição:** O protocolo de eventos que define como o componente se conecta ao barramento de eventos.

### Funcionalidade

1. **Atributo `on`**: O principal ponto de integração do `Echo` é o atributo `on`, que especifica como o componente está conectado ao Event Bus. O formato do valor do `on` segue o padrão `target/event:action`.

2. **Interceptação de Ciclo de Vida**: O `Echo` intercepta os callbacks `connectedCallback` e `disconnectedCallback` para garantir que os eventos sejam registrados quando o componente é adicionado ao DOM e removidos quando ele sai do DOM. Isso é feito usando `AbortController` para cancelar eventos.

3. **Observação de Atributos**: O `Echo` observa o atributo `on` e reage automaticamente às suas mudanças, conectando ou desconectando o componente do barramento de eventos com base nas alterações do atributo.

4. **Comunicação de Eventos**: Quando o `Echo` dispatcha um evento, ele o faz de maneira centralizada, notificando outros componentes que estão inscritos no barramento de eventos, sem que esses componentes precisem conhecer diretamente uns aos outros.

### Exemplo Prático

**Exemplo: Componente de busca e lista**

Neste exemplo, temos um componente de busca que permite ao usuário filtrar uma lista de frutas. O componente de busca emite um evento sempre que o valor de entrada muda, e o componente de lista escuta esse evento para atualizar sua exibição de acordo.

```javascript
import { define } from '@bake-js/-o-ids';
import { css, html, paint, repaint } from '@bake-js/-o-id/dom';
import Echo from '@bake-js/-o-id/echo';
import on, { value } from '@bake-js/-o-id/event';

// Componente de busca
function searchComponent() {
  return html`
    <input placeholder="Digite um nome de fruta" />
  `;
}

@define('dem-search')
@paint(searchComponent)
class Search extends Echo(HTMLElement) {
  @on.input('input', value)
  onInput(value) {
    this.dispatchEvent(new CustomEvent('changed', { detail: value }));
    return this;
  }
}

// Componente de lista
function listComponent(self) {
  return html`
    <ul>
      ${self.data.map((d) => html`<li>${d}</li>`)}
    </ul>
  `;
}

@define('dem-list')
@paint(listComponent)
class List extends Echo(HTMLElement) {
  #criteria = /./ig;
  #data = ['uva', 'pera', 'laranja', 'banana', 'melancia', 'melao', 'abacaxi'];
  
  get data() {
    return this.#data.filter(v => this.#criteria.test(v));
  }
  
  @repaint
  filter(value) {
    this.#criteria = new RegExp(value, 'ig');
    return this;
  }

  connectedCallback() {
    // Conecta-se ao barramento de eventos
    this.addEventListener('changed', (e) => this.filter(e.detail));
  }
}
```

**Explicação**:
- O `SenderComponent` (componente de busca) emite um evento `changed` quando o valor de entrada muda, passando o novo valor como detalhe.
- O `ReceiverComponent` (componente de lista) escuta o evento `changed` e filtra a lista de frutas com base no valor recebido.

### Benefícios do Módulo `Echo`

1. **Desacoplamento**: O `Echo` permite que componentes se comuniquem sem precisar conhecer diretamente uns aos outros, facilitando a construção de sistemas modulares e escaláveis.
2. **Gerenciamento de Ciclo de Vida**: Eventos são gerenciados automaticamente com base nos callbacks `connectedCallback` e `disconnectedCallback`, garantindo que os listeners sejam removidos corretamente quando o componente for removido do DOM.
3. **Flexibilidade**: O protocolo de eventos é declarativo, permitindo uma configuração simples e flexível de como os componentes se comunicam.

### Atributos Suportados

1. **`on`**:
   - **Descrição**: Define o protocolo de eventos para comunicação com o barramento de eventos.
   - **Formato**: `target/event:action`
   - **Exemplo**: `dem-search/changed:method/filter`

### Actions Disponíveis

1. **`attribute`**: Mapeia eventos a um **atributo** do componente.
   - **Descrição**: Atualiza um atributo do componente com o valor do evento.
   - **Exemplo**: `sender/message:attribute/myAttribute`

2. **`setter`**: Mapeia eventos a um **setter** do componente.
   - **Descrição**: Chama o setter correspondente no componente com o valor do evento.
   - **Exemplo**: `sender/message:setter/mySetter`

3. **`method`**: Mapeia eventos a um **método** do componente.
   - **Descrição**: Invoca um método do componente, passando os detalhes do evento como parâmetro.
   - **Exemplo**: `dem-search/changed:method/filter`

### Filtros Disponíveis

Filtros permitem manipular o evento antes que ele seja despachado ou recebido pelo alvo.

1. **`prop`**: Mapeia um nome de propriedade, permitindo percorrer um namespace para obter um valor específico.
   - **Exemplo**: `sender/message:prop/user.name`

### Exemplo Avançado

```html
<!-- Protocolo declarativo de Echo: sender envia mensagem, receiver escuta -->
<dem-search on="dem-list/changed:method/filter"></dem-search>
<dem-list></dem-list>
```

Neste exemplo, o `dem-list` está configurado para escutar eventos `changed` enviados pelo `dem-search` e chamar o método `filter` para processar a mensagem.

### Considerações Finais

O `Echo` é uma solução inovadora para comunicação entre componentes em aplicações Web. Sua implementação simples e eficiente permite que desenvolvedores criem interações complexas sem a sobrecarga de bibliotecas adicionais. O módulo continua em fase beta, e feedback é bem-vindo para melhorias contínuas.
