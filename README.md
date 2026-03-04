Esse projeto foi criado e desenvolvido para a etapa de Desafio Técnico para o programa Caixaverso, reforço a importância da leitura desse arquivo para a melhor compreensão do projeto.

Inicialização do Projeto:

Para rodar o programa pela primeira vez (sem node_modules), no terminal:

```bash
    npm run setup
```

Esse comando irá baixar as dependêcias necessárias para que o projeto funcione, irá iniciar o servidor local do Angular e o servidor local do Json Server, que serve como Backend para o projeto.

Se o projeto já tiver o node_modules, para iniciar a aplicação, no terminal:

```bash
    npm run start
```

Isso irá iniciar o servidor Angular e o servidor Json Server.

Por padronização o Angular está disponível no port 4200 do host local, para acessar:

```bash
    http://localhost/4200
```

Sobre as funcionalidades:

Seguindo as recomendações da banca, o projeto é um simulador de investimentos simples, contemplando 3 produtos de renda fixa: CDB, LCI e LCA.

As duas páginas propostas trabalham em conjunto para Gerar simulações de investimento, e exibir um histórico das simulações anteriores.

O projeto apresenta um CRUD completo, com Buscas nas duas páginas (GET), Envio de registros (POST) na página de Simulações, Edição e Deleção na tabela de Histórico de simulações.

Os erros mais comuns (400, 403, 404, 422 e 5XX), estão sendo tratados em todas as requisições, dificilmente será possível testar o erro 500 se somente o servidor Angular estiver rodando. 


