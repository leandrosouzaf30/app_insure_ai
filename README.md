# React + Vite

Aplicação React + Vite com autenticação Cognito local usando AWS Floci.

## Requisitos

- Node.js 18+ / npm
- AWS CLI configurado localmente
- AWS Floci ou LocalStack executando em `http://localhost:4566`

## Instalação

1. Instale as dependências:

```bash
npm install
```

2. Inicie o simulador AWS Floci / LocalStack.

3. Crie o User Pool, App Client e usuário de teste com o script:

```bash
./create_user.sh
```

O script exibirá os valores gerados para `userPoolId` e `userPoolClientId`.

## Configuração de autenticação

O projeto usa `@aws-amplify/auth` e o proxy Vite para encaminhar o tráfego de Cognito local.

- `vite.config.js` define um proxy de `/cognito` para `http://localhost:4566`
- `src/aws-exports.ts` deve conter a configuração Cognito com `userPoolEndpoint: 'http://localhost:5173/cognito'`

Exemplo de `src/aws-exports.ts`:

```ts
import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_xxxxxxxx',
      userPoolClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
      userPoolEndpoint: 'http://localhost:5173/cognito'
    }
  }
});
```

> O endpoint `http://localhost:5173/cognito` usa a configuração de proxy do Vite para evitar CORS e redirecionar para o Floci local.

## Executar em desenvolvimento

```bash
npm run dev
```

Abra `http://localhost:5173` no navegador.

## Login

A interface de login usa `signIn()` de `@aws-amplify/auth` e valida se `result.isSignedIn` para confirmar a autenticação.

## Scripts úteis

- `npm run dev` — inicia o servidor de desenvolvimento Vite
- `npm run build` — gera o build de produção
- `npm run lint` — roda o ESLint

## Observações

- Garanta que o Floci/LocalStack esteja online antes de iniciar o app.
- Se mudar o port do Vite ou do simulador, atualize `src/aws-exports.ts` e `vite.config.js` conforme necessário.
