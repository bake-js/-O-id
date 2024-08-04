# Intercept

O módulo `intercept` permite a interceptação de métodos em Custom Elements, permitindo a execução de lógica adicional antes ou depois da lógica original. Este módulo é fundamental para implementar decorators que precisam modificar ou estender o comportamento padrão de métodos.

## Visão Geral

### Nome e Classificação

- **Nome:** Intercept
- **Classificação:** Modulo Interno

### Objetivo

Interceptar métodos de Custom Elements para adicionar ou modificar comportamentos sem alterar diretamente o método original.

## Implementação

### `intercept`

```javascript
const intercept = (propertyKey) => ({
  in: (target) => ({
    then: (substituent) => {
      const substituted = target[propertyKey] ?? (() => undefined);

      Reflect.defineProperty(target, propertyKey, {
        async value(...args) {
          await Reflect.apply(substituted, this, args);
          await Reflect.apply(substituent, this, args);
          return this;
        },
        writable: true,
      });
    },
  }),
});

export default intercept;
```

### `exec`

```javascript
const exec = (propertyKey) =>
  async function (...args) {
    await this[propertyKey](...args);
  };

export default exec;
```

## Funções

### `intercept(propertyKey)`

- **Parâmetros:** 
  - `propertyKey` (`string` | `symbol`): O nome do método a ser interceptado.
- **Retorna:** Um objeto com métodos `in` e `then`.

#### Métodos Internos

- **`in(target)`**
  - **Parâmetros:** 
    - `target` (`object`): O protótipo ou instância do objeto onde o método será interceptado.
  - **Retorna:** Um objeto com o método `then`.

- **`then(substituent)`**
  - **Parâmetros:** 
    - `substituent` (`function`): A função que será executada após a execução do método original.
  - **Descrição:** Define o substituto que será executado após o método original.

### `exec(propertyKey)`

- **Parâmetros:** 
  - `propertyKey` (`string` | `symbol`): O nome do método a ser executado.
- **Retorna:** Uma função assíncrona que executa o método especificado no contexto (`this`) atual.
- **Descrição:** Executa o método especificado com os argumentos fornecidos, utilizando o contexto do objeto atual.

## Aplicabilidade

Ideal para qualquer projeto que utilize Custom Elements e precise adicionar ou modificar comportamentos de métodos sem alterar diretamente o código original.

## Considerações Finais

O módulo `intercept` é uma ferramenta poderosa para modificar ou estender comportamentos de métodos em Custom Elements, promovendo a reutilização de código e facilitando a implementação de decorators.
