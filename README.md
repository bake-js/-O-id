# Element

Bem-vindo à documentação da biblioteca Element, uma poderosa ferramenta que permite aos desenvolvedores criar Web Components personalizados de maneira rápida e eficiente.

## Installation

Para começar a usar a biblioteca Element, instale-a no seu projeto via npm, yarn ou bun:

**npm**

```bash
npm install @bake-js/element
```

**yarn**

```bash
yarn add @bake-js/element
```

**bun**

```bash
bun add @bake-js/element
```

## Usage

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

## Demo

Para iniciar um projeto do zero, utilize um dos comandos abaixo:

**npx**

```bash
npx degit @bake-js/element my-project
```

**bunx**

```bash
bunx degit @bake-js/element my-project
```

## Documentation

Para mais detalhes, acesse a [Documentação](https://linktodocumentation).

## Tech Stack

- JavaScript (Vanilla)
- Bun

## Run Locally

Clone o repositório

```bash
git clone https://github.com/bake-js/element.git
```

Acesse o diretório do projeto

```bash
cd element
```

Instale as dependências

```bash
bun install
```

Inicie o servidor

```bash
bun run dev
```

## Authors

- [deMGoncalves](https://www.github.com/deMGoncalves)

## Support

Para suporte, envie um e-mail para cleber.demgoncalves@gmail.com ou junte-se ao nosso canal no Slack.

## License

Distribuído sob a licença [MIT](https://choosealicense.com/licenses/mit/).
