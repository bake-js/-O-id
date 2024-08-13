# Guia de Contribuição para **-O-id**

Estamos animados por você estar interessado em contribuir para o **-O-id**! Sua ajuda é essencial para continuar melhorando esta biblioteca e garantir que ela atenda às necessidades da comunidade de desenvolvedores. Este documento tem como objetivo orientar você sobre como contribuir de maneira eficaz.

## Como Contribuir

Existem várias maneiras de contribuir para o projeto **-O-id**:

1. **Reportar Problemas**: Se encontrar algum bug ou comportamento inesperado, abra uma issue para que possamos investigar e corrigir.
2. **Sugerir Funcionalidades**: Se tiver ideias para novas funcionalidades ou melhorias, ficaremos felizes em recebê-las.
3. **Enviar Pull Requests**: Se você já tem uma solução para um problema ou uma melhoria em mente, sinta-se à vontade para enviar um pull request.

## Começando

### 1. Fork o Repositório

Primeiro, crie um fork do repositório **-O-id** para a sua conta do GitHub. Você pode fazer isso clicando no botão "Fork" no canto superior direito da página do repositório.

### 2. Clone o Repositório

Depois de fazer o fork, clone o repositório na sua máquina local:

```bash
git clone https://github.com/bake-js/-O-id.git
cd element
```

### 3. Instale as Dependências

Antes de começar a desenvolver, instale todas as dependências do projeto:

```bash
bun install
```

### 4. Crie uma Branch para o Seu Trabalho

Crie uma branch para isolar o seu trabalho:

```bash
git checkout -b minha-branch-incrivel
```

### 5. Faça Suas Modificações

Agora você está pronto para fazer suas modificações! Certifique-se de seguir as diretrizes de codificação e de adicionar testes, se necessário.

### 6. Teste Suas Modificações

Antes de enviar suas alterações, execute os testes para garantir que tudo está funcionando corretamente:

```bash
bun test
```

### 7. Envie as Alterações

Depois de testar suas alterações, faça o commit e envie suas modificações para o seu repositório:

```bash
git add .
git commit -m "Descrição do que foi alterado"
git push origin minha-branch-incrivel
```

### 8. Abra um Pull Request

Por fim, volte ao repositório original no GitHub e abra um pull request para a branch `main`. Descreva brevemente as mudanças que você fez e como elas melhoram o projeto.

## Diretrizes de Contribuição

### Estilo de Código

- Siga as convenções de código JavaScript usadas no projeto.
- Utilize `Biome` para garantir a consistência de formatação.
- Nomeie suas variáveis e funções de forma descritiva e clara.

### Testes

- Adicione testes para qualquer nova funcionalidade ou correção de bugs.
- Certifique-se de que todos os testes existentes continuam passando após suas alterações.

### Documentação

- Mantenha a documentação atualizada com qualquer mudança na funcionalidade.
- Se você adicionar uma nova funcionalidade, inclua exemplos de uso na documentação.

## Comunicação

- Se você não tiver certeza sobre como proceder com uma alteração ou se precisa de orientação, abra uma issue para discutir a ideia antes de começar a trabalhar.
- Sinta-se à vontade para participar de discussões em issues existentes, mesmo que você não esteja trabalhando em uma solução.

## Código de Conduta

Esperamos que todos os colaboradores respeitem nosso [Código de Conduta](https://github.com/bake-js/-O-id/blob/main/CODE_OF_CONDUCT.md), mantendo um ambiente acolhedor e respeitoso para todos.

## Agradecimentos

Obrigado por considerar contribuir para o **-O-id**! Sua participação é fundamental para o crescimento e sucesso do projeto.
