[🇧🇷 Leia em Português](./README.pt-BR.md) | [🇺🇸 Read in English](./README.md)

# Módulo Echo do **-O-id**

> **Em fase beta**: O módulo Echo está em fase beta, o que significa que pode haver alterações na API e no comportamento antes da versão final. Fique atento às atualizações para garantir a compatibilidade.

## Introdução

O módulo Echo do **-O-id** oferece uma solução poderosa para gerenciar eventos entre Web Components. Ele permite que você defina e escute eventos entre componentes de maneira fácil e eficiente. A seguir, apresentamos como utilizar o Echo para criar um sistema de eventos interconectados.

## Importação

Para utilizar o módulo Echo, importe-o da seguinte forma:

```javascript
import Echo from '@bake-js/-o-id/echo';
```

## Estrutura do Atributo `on`

O atributo `on` do módulo Echo segue a estrutura "topic:mapper". A estrutura é detalhada a seguir:

- **Topic:** Define o tópico do evento e é composto por "element/event".
- **Mapper:** Especifica o destino e o nome do alvo dentro do evento. O mapper é composto por "target/target-name", onde os alvos podem ser:
  - **attribute**: Referência a atributos do componente.
  - **setter**: Referência a métodos setter do componente.
  - **method**: Referência a métodos do componente.

### Exemplos de Uso

#### Definindo um Componente com Echo

```javascript
import { define } from '@bake-js/element';
import Echo from '@bake-js/element/echo';

@define('sender-component')
class SenderComponent extends Echo(HTMLElement) {

}

@define('receiver-component')
class ReceiverComponent extends Echo(HTMLElement) {

}
```

#### Comunicação entre Componentes no HTML

```html
<sender-component></sender-component>
<receiver-component on="sender-component/messageSent:method/handleMessage"></receiver-component>
```

No exemplo acima:
- O `SenderComponent` emite um evento personalizado `messageSent` quando o botão é clicado.
- O `ReceiverComponent` escuta esse evento e atualiza seu conteúdo com a mensagem recebida.

## Por Que Usar o Decorator `@on`

Utilizar o decorator `@on` oferece várias vantagens:

- **Simplicidade e Clareza:** Reduz a verbosidade do código, tornando a associação de eventos mais clara e direta.
- **Reusabilidade:** Permite o uso de múltiplos decorators no mesmo método, simplificando a configuração e evitando a necessidade de chamar métodos manualmente.
- **Eficiência:** Facilita a escrita e manutenção do código, pois o decorator gerencia automaticamente a associação e desassociação de eventos.

## Conclusão

Adotar o decorator `@on` proporciona uma abordagem mais limpa e organizada para gerenciar eventos em seus Web Components, resultando em uma implementação mais eficiente e menos propensa a erros.

Experimente o -O-id e veja como ele pode simplificar e aprimorar seu desenvolvimento de Web Components!
