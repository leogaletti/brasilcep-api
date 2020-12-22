# Brasil CEP API (não oficial)
> Biblioteca para busca de CEP no site Brasil CEP

Biblioteca simples para buscar dados de CEPs do Brasil do site Brasil CEP.

## Instalação e Execução

```sh
npm install brasilcep-api
```

## Como usar

```sh
const getCEPInfo = require("brasilcep-api");

getCEPInfo("87035230")
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    });

```

## Histórico de lançamentos

* 1.0.1
    * Projeto pronto para uso

## Desenvolvedores

#### Leonardo Galetti de Mello

[![Leonardo Galetti][leo-image]][leo-url]

[leo-image]: https://avatars2.githubusercontent.com/u/11006979?s=400&u=a08ed3983152b6a852517b8341c53d9ab2e7ea3d&v=4
[leo-url]: https://leogaletti.github.io