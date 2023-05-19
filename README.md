# server

This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

## Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
npm install
```

To only install resolved dependencies in `package-lock.json`:

```sh
npm ci
```

## Run the application

```sh
npm start
```

You can also run `node .` to skip the build step.

Open http://127.0.0.1:3000 in your browser.

## Rebuild the project

To incrementally build the project:

```sh
npm run build
```

To force a full build by cleaning up cached artifacts:

```sh
npm run rebuild
```

## Fix code style and formatting issues

```sh
npm run lint
```

To automatically fix such issues:

```sh
npm run lint:fix
```

## Other useful commands

- `npm run migrate`: Migrate database schemas for models
- `npm run openapi-spec`: Generate OpenAPI spec into a file
- `npm run docker:build`: Build a Docker image for this application
- `npm run docker:run`: Run this application inside a Docker container

## Tests

```sh
npm test
```

## What's next

USANDO A APLICAÇÃO

OBS: O BANCO DE DADOS ESTÁ NA INTERNET PORTANTO É SÓ RODAR O PROJETO

BANCO DE DADOS EM MYSQL

Nome do Banco: restofles_fluxo_caixa<br/>
Servidor:  robb0498.publiccloud.com.br<br/>
porta:3306<br/>
Usuario: resto_fluxo<br/>
Senha: Opah#102030<br/>


1- Crie uma conta no EndPoint de Post do Account>

![image](https://github.com/restofles/fluxodecaixa/assets/13588921/a0f671ac-ec18-4946-849b-a83b981ca515)

Agora você tem um número de conta:

![image](https://github.com/restofles/fluxodecaixa/assets/13588921/bccfc250-bc49-4e66-8bc8-ba3835b72ab1)

2 - lance transações de crédito ou débito, lembrando-se de colocar numero negativo em caso de debito.

![image](https://github.com/restofles/fluxodecaixa/assets/13588921/89578843-1bfb-43b8-9fa6-85fc0de01bc2)

3- confira seu saldo consolidado a partir de um dia lembrando-se de que a data é yyyy-mm-dd

![image](https://github.com/restofles/fluxodecaixa/assets/13588921/05a725d9-b22a-4929-9c81-a1e3bdba7beb)

4-você pode conferir também todas as transações da conta:

![image](https://github.com/restofles/fluxodecaixa/assets/13588921/5ebd6778-8a0e-4389-b261-55b129080efc)

![image](https://github.com/restofles/fluxodecaixa/assets/13588921/c46114a5-74ba-4b8b-b248-fd22f6f7dec1)




