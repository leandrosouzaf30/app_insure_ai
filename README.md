# app_insure_ai

Aplicação frontend React com autenticação AWS Cognito local e interface de chatbot para atendimento no segmento de seguros.

## Visão geral

Este projeto é uma interface web construída com React e Vite. Ele usa AWS Amplify para autenticação Cognito local e oferece um chatbot com renderização de mensagens em Markdown.

## Tecnologias principais

- React 19
- Vite
- AWS Amplify (`@aws-amplify/auth`)
- Axios
- React Markdown (`react-markdown` + `remark-gfm`)

## Requisitos

- Node.js 18+ / npm
- AWS CLI configurado localmente
- LocalStack ou AWS Floci executando em `http://localhost:4566`

## Instalação

1. Instale as dependências:

```bash
npm install
```

2. Inicie o LocalStack ou o serviço AWS Floci local.

3. Gere o User Pool, App Client e usuário de teste:

```bash
./create_user.sh
```

O script `create_user.sh` grava automaticamente os valores gerados em `.env.local`:

- `VITE_USER_POOL_ID`
- `VITE_USER_POOL_CLIENT_ID`

## Configuração

O arquivo `src/aws-exports.ts` lê as variáveis de ambiente do Vite e configura o Amplify:

- `import.meta.env.VITE_USER_POOL_ID`
- `import.meta.env.VITE_USER_POOL_CLIENT_ID`

O proxy configurado em `vite.config.js` encaminha as chamadas para Cognito local e evita problemas de CORS.

## Executando o projeto

```bash
npm run dev
```

Abra o endereço exibido no terminal para acessar a aplicação.

## Estrutura do projeto

- `src/App.jsx` — componente principal do app
- `src/features/Account/Login.tsx` — tela de login com `@aws-amplify/auth`
- `src/features/Chat/Chatbot.tsx` — interface do chat
- `src/hooks/useChatSession.ts` — lógica de sessão e envio de mensagens
- `src/storage/chatStorage.ts` — persistência de sessão no `localStorage`
- `src/features/Chat/services/api.ts` — chamadas HTTP para a API de chat
- `src/features/Chat/services/chatService.ts` — serviços de chat e formatação de mensagens
- `src/types/chats.ts` — tipos TypeScript usados pelo chat

## Uso

1. Inicie a aplicação.
2. Faça login com o usuário criado pelo `create_user.sh`.
3. Utilize o chatbot para enviar perguntas e receber respostas formatadas em Markdown.

## Observações

- A autenticação depende de um backend Cognito local em execução.
- O frontend espera variáveis de ambiente em `.env.local`.
- A renderização de mensagens usa `react-markdown` e `remark-gfm`.

## Scripts disponíveis

- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — cria a versão de produção
- `npm run preview` — pré-visualiza a build de produção
- `npm run lint` — executa o ESLint no código

## Contato

Se precisar ajustar o ambiente local ou a configuração do Cognito, revise `create_user.sh` e `src/aws-exports.ts`.
