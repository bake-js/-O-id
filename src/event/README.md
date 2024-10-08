# Módulo Event do **-O-id**

O módulo **Event** do **-O-id** oferece uma maneira poderosa e flexível de gerenciar eventos dentro de seus Web Components. Através do uso de decorators, é possível associar eventos a métodos específicos de forma simples e eficiente, mantendo seu código organizado e de fácil manutenção.

## Introdução

O **-O-id** simplifica a manipulação de eventos em Web Components por meio de decorators que permitem a vinculação direta de eventos a métodos. Com suporte a filtros e a possibilidade de interceptar qualquer evento do DOM, o módulo **Event** proporciona uma abordagem modular e extensível para o desenvolvimento de interfaces reativas. 

## Importação dos Decorators e Filtros

Para utilizar os módulos Event, importe-os da seguinte forma:

```javascript
import on, { stop, prevent, formData, value } from '@bake-js/-o-id/event';
```

## Principais Funcionalidades

### Vinculação de Eventos

O decorator `@on` é usado para vincular eventos a métodos específicos de um Web Component. Ele funciona como um proxy, interceptando eventos e permitindo que você aplique filtros antes de chamar o método associado. Isso não apenas simplifica a manipulação de eventos, como também permite maior controle e customização.

### Uso do `@on`

O `@on` pode mapear qualquer evento do DOM para um método específico. Aqui está como você pode usá-lo:

```javascript
@on.click('button')
handleClick() {
  // Código executado quando o botão é clicado
}

@on.submit('form', prevent, formData)
handleSubmit(data) {
  // Código executado ao enviar o formulário
  // `data` contém os dados processados pelo filtro `formData`
}

@on.input('input', stop, value)
handleInput(event) {
  const inputValue = value(event);
  console.log('Valor do input:', inputValue);
  // Outras operações com inputValue podem ser realizadas aqui
}
```

### Filtros Disponíveis

Os filtros permitem manipular e processar eventos antes de serem passados para os métodos vinculados. Os filtros disponíveis incluem:

- **`prevent`**: Interrompe o comportamento padrão do evento.
- **`stop`**: Interrompe a propagação do evento no DOM.
- **`formData`**: Extrai dados do formulário e os retorna como um objeto.
- **`value`**: Extrai o valor de um campo de entrada associado ao evento.

### Criando Filtros Personalizados

Além dos filtros nativos, você pode criar seus próprios filtros para manipular eventos conforme necessário. Um filtro personalizado segue a seguinte estrutura:

```javascript
function myFilter(event) {
  // Lógica de manipulação personalizada
  return /* resultado da minha manipulação */;
}
```

Filtros personalizados permitem que você introduza lógica adicional antes de o evento ser processado pelo método vinculado, oferecendo uma camada extra de flexibilidade e controle.

### Múltiplos Filtros

O decorator `@on` permite a aplicação de múltiplos filtros em um único evento, utilizando a abordagem de pipe & filters. Isso significa que você pode facilmente compor comportamento ao longo da cadeia de processamento de eventos, tornando o desenvolvimento mais modular e adaptável às suas necessidades.

## Por Que Usar o Decorator `@on`?

O uso do decorator `@on` no **-O-id** oferece várias vantagens que tornam o desenvolvimento de Web Components mais eficiente e menos verboso:

- **Simplicidade e Clareza**: Em vez de adicionar manualmente ouvintes de eventos e espalhar a lógica pelo código, `@on` permite associar eventos diretamente aos métodos, deixando o código mais legível e fácil de manter.

- **Modularidade**: Aplicar o mesmo decorator a vários métodos sem a necessidade de encadeamentos complexos simplifica a organização do código. Com `@on`, múltiplos métodos podem responder ao mesmo evento de forma intuitiva.

- **Controle Total**: Funcionando como um proxy, `@on` intercepta eventos e permite a aplicação de filtros personalizados antes de repassá-los ao método correspondente. Isso oferece um controle preciso sobre como e quando os eventos são processados.

- **Extensibilidade**: A capacidade de criar filtros personalizados permite adaptar o comportamento dos eventos às necessidades específicas da sua aplicação, integrando essa flexibilidade de maneira consistente com o restante do código.

## Exemplos de Uso

### Exemplo 1: Manipulação de Clique

```javascript
@on.click('button')
handleClick() {
  console.log('Botão clicado!');
}
```

### Exemplo 2: Submissão de Formulário com Extração de Dados

```javascript
@on.submit('form', prevent, formData)
handleSubmit(data) {
  console.log('Dados do formulário:', data);
}
```

### Exemplo 3: Captura de Valor de Entrada

```javascript
@on.input('input', stop, value)
handleInput(event) {
  const inputValue = value(event);
  console.log('Valor do input:', inputValue);
}
```

## Conclusão

O decorator `@on` não só simplifica a manipulação de eventos, como também oferece uma abordagem mais estruturada e flexível para o desenvolvimento de Web Components. Com ele, você ganha clareza no código, modularidade nas funções e controle total sobre o fluxo de eventos, tudo isso enquanto mantém a simplicidade e eficiência que são a marca do **-O-id**. É uma solução elegante que equilibra facilidade de uso com poder de customização, facilitando a criação de aplicações modernas e robustas.

Experimente o **-O-id** e veja como ele pode simplificar e aprimorar seu desenvolvimento de Web Components!
