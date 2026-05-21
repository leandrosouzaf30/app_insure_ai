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

O script grava automaticamente os valores gerados em `.env.local` como `VITE_USER_POOL_ID` e `VITE_USER_POOL_CLIENT_ID`.

## Configuração de autenticação

O projeto usa `@aws-amplify/auth` e o proxy Vite para encaminhar o tráfego de Cognito local.

- `vite.config.js` define um proxy de `/cognito` para `http://localhost:4566`
- `src/aws-exports.ts` lê `VITE_USER_POOL_ID` e `VITE_USER_POOL_CLIENT_ID` de `import.meta.env`

O `create_user.sh` já salva os valores gerados em `.env.local`, então não é necessário editar `src/aws-exports.ts` manualmente.

Exemplo de `src/aws-exports.ts` atual:

```ts
import { Amplify } from 'aws-amplify';

const userPoolId = import.meta.env.VITE_USER_POOL_ID ?? 'us-east-1_5d0d948e5';
const userPoolClientId = import.meta.env.VITE_USER_POOL_CLIENT_ID ?? '60a5190ee0ea4a9dae61012f64';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId,
      userPoolClientId,
      userPoolEndpoint: 'http://localhost:5173/cognito'
    }
  }
});
```

> O endpoint `http://localhost:5173/cognito` usa a configuração de proxy do Vite para evitar CORS e redirecionar para o Floci local.
>
> O código principal de UI agora está em `src/features/Account` e `src/features/Chat`.

## Executar em desenvolvimento

```bash
npm run dev
```

Abra `http://localhost:5173` no navegador.

## Login

A interface de login usa `signIn()` de `@aws-amplify/auth` e valida se `result.isSignedIn` para confirmar a autenticação.

O código de login está em `src/features/Account/Login.tsx`.

## Chatbot

Após o login bem-sucedido, o aplicativo renderiza o componente `Chatbot` em `src/features/Chat/Chatbot.tsx`.

- O `Chatbot` exibe uma interface de mensagens com histórico e entrada de texto.
- Ele simula respostas de assistente virtual local enquanto aguarda integração futura com um serviço de IA/LLM.
- O componente roda somente para usuários autenticados, conforme `src/App.jsx`.

## Scripts úteis

- `npm run dev` — inicia o servidor de desenvolvimento Vite
- `npm run build` — gera o build de produção
- `npm run lint` — roda o ESLint

## Observações

- Garanta que o Floci/LocalStack esteja online antes de iniciar o app.
- O script `create_user.sh` grava `.env.local` e o arquivo já está ignorado pelo Git.
- Se mudar o port do Vite ou do simulador, atualize `src/aws-exports.ts` e `vite.config.js` conforme necessário.
