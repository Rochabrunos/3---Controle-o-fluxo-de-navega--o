# Curso 2 - Controle o fluxo de navegação

Este projeto foi desenvolvido no curso da Alura, dentro da formação de angular. A aplicação consiste em um book de fotos, chamado Gatito Book. Onde os usuários podem compartilhar tanto as fotos de seus gatos quanto curtir e/ou comentar fotos de outras pessoas.

Meu objetivo então é mesclar o que fora aprendido em outros cursos a respeito de testes unitários, e aplicar neste projeto.

# Instalando as dependências:

-   BackEnd:

    -   Entre na pasta API

    -   Execute o comando: 'npm install'

-   FrontEnd:

    -   Entre na pasta gatitobook

    -   Execute o comando 'npm install '

Os requisitos necessário podem ser vistos através dos arquivo 'package.json' que estão localizados na raiz tanto do BackEnd quanto do FrontEnd.

# Como executar o projeto:

-   O projeto consiste em duas pastas, entre na raiz do projeto, na pasta gatito book

-   Execute o comando: npm run all

-   Abra o seu navegador

-   Navegue até a página: "http://localhost:4200"

Com isso, será iniciado o BackEnd, e o FronEnd da aplicação.

# Como executar os testes

Como o objetivo deste projeto é testá-lo, pode-se executar os testes usando o comando: 'npm run test'. Além disso, há como gerar relatórios de cobertura de teste para melhor visualizar como os testes estão abrangendo toda a aplicação, com o comando: 'npm run test-with-coverage'. O acompanhamento da cobertura de testes pode ser feito através do terminal, onde tem um relatório sempre quando termina de executar os testes:

```
=============================== Coverage summary ===============================
Statements   : 76.39% ( 165/216 )
Branches     : 34.44% ( 31/90 )
Functions    : 73.03% ( 65/89 )
Lines        : 72.73% ( 136/187 )
================================================================================
```

Também é possível acompanhar de forma gráfica, abrindo o arquivo 'index.html' dentro da pasta raiz do projeto 'coverage' dentro de seu navegador.

