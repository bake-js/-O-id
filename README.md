# Element

Bem-vindo à documentação da biblioteca Element, uma poderosa ferramenta para desenvolvedores que desejam criar componentes web personalizados de forma rápida e eficiente. Element simplifica o desenvolvimento de componentes web personalizados utilizando JavaScript/TypeScript e HTML.

## Instalação

Para começar a usar a biblioteca Element, você precisa instalá-la em seu projeto. Você pode fazer isso via npm ou yarn:

```bash
npm install @bake-js/element
# ou
yarn add @bake-js/element
```

## Uso Básico

Aqui está um exemplo simples de como usar a biblioteca Element para criar um componente de contador:

```typescript
import { connected, define, on, paint, repaint } from '@bake-js/element';

function component(counter): string {
  return (`
    <div>
      <strong>${counter.n}</strong>
      <button>+ add</button>
    </div>
  `);
}

@define('element-counter')
@paint(component)
class Counter extends HTMLElement {
  #n: number;

  get n(): number {
    return (this.#n ??= 0);
  }

  set n(value: number): void {
    this.#n = value;
  }

  @on.click('button')
  @repaint
  inc(): Counter {
    this.n += 1;
    return this;
  }
}
```

Este é um exemplo de um componente contador simples. O decorator `@define` é usado para definir o nome do componente. Os decorators `@on.click`, `@repaint`, `@connected` e `@paint` são utilizados para definir o comportamento de clique e renderização.

## API

Abaixo estão descrições detalhadas das funcionalidades da API disponíveis na biblioteca Element:

### `@adopted`

O decorator `@adopted` é utilizado para definir um método que é chamado quando o componente é adotado por um novo documento, ou seja, quando é movido de um documento DOM para outro. Isso permite que você manipule eventos de adoção e ajuste o comportamento do componente se necessário.

```typescript
@adopted
handleAdoption(): void {
  // Lógica a ser executada quando o componente é adotado por um novo documento
}
```

### `@connected`

O decorator `@connected` é utilizado para definir um método que é chamado quando o componente é conectado ao DOM. Isso é útil para realizar tarefas de inicialização ou configuração após o componente ser renderizado no documento.

```typescript
@connected
initializeComponent(): void {
  // Lógica de inicialização após ser conectado ao DOM
}
```

### `@define(name: string)`

O decorator `@define` é utilizado para definir o nome do componente. O nome é crucial para identificar o componente no HTML e é usado na forma de um elemento personalizado.

```typescript
@define('element-counter')
class Counter {
  // Definição do componente
}
```

### `@disconnected`

O decorator `@disconnected` é utilizado para definir um método que é chamado quando o componente é desconectado do DOM. Isso permite que você realize limpeza ou manipulação antes do componente ser removido do documento.

```typescript
@disconnected
cleanupComponent(): void {
  // Lógica de limpeza antes de ser desconectado do DOM
}
```

### `@on[event](selector: string)`

O decorator `@on` é utilizado para definir um manipulador de eventos para um elemento HTML específico. Você pode especificar o tipo de evento (por exemplo, 'click' ou 'input') e um seletor para o elemento alvo.

```typescript
@on.click('button')
handleClick(event: Event): void {
  // Lógica a ser executada quando um botão é clicado
}
```

### `@paint`

O decorator `@paint` é utilizado para definir um método que retorna o HTML do componente. O HTML gerado por este método é inserido no DOM como a representação visual do componente.

```typescript
@paint(component)
class Counter {
  // Definição do componente
}
```

### `@repaint`

O decorator `@repaint` é utilizado para sinalizar que o componente precisa ser redesenhado após uma ação. Isso é útil para atualizar a visualização do componente quando ocorrem mudanças no estado.

```typescript
@on.click('button')
@repaint
handleClick(event: Event): void {
  // Lógica para atualizar o estado e redesenhar o componente
}
```

Este é um panorama da API da biblioteca Element, destacando as principais funcionalidades e como utilizá-las em seus componentes. Certifique-se de consultar os exemplos fornecidos na documentação para um entendimento mais aprofundado de como usar essas funcionalidades em cenários reais.

## Contribuindo

Se você deseja contribuir para o desenvolvimento desta biblioteca, sinta-se à vontade para abrir issues ou enviar pull requests. Estamos ansiosos para colaborar com você!

## Licença

Esta biblioteca está licenciada sob a Licença MIT. Consulte o arquivo LICENSE para mais detalhes.
