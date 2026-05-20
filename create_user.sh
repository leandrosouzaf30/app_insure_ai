#!/bin/bash
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_DEFAULT_REGION=us-east-1
export ENDPOINT=http://localhost:4566

echo "1. Criando User Pool..."
# Criamos o pool e extraímos o ID gerado usando grep/awk para evitar dependência do jq
USER_POOL_ID=$(aws cognito-idp create-user-pool \
  --pool-name LocalUserPool \
  --endpoint-url $ENDPOINT \
  --query "UserPool.Id" \
  --output text)

echo "-> User Pool criado com o ID: $USER_POOL_ID"

echo "2. Criando App Client..."
# Usamos o ID dinâmico e capturamos o Client ID gerado
CLIENT_ID=$(aws cognito-idp create-user-pool-client \
  --user-pool-id "$USER_POOL_ID" \
  --client-name LocalClient \
  --endpoint-url $ENDPOINT \
  --query "UserPoolClient.ClientId" \
  --output text)

echo "-> App Client criado com o ID: $CLIENT_ID"

echo "3. Cadastrando usuário de teste..."
aws cognito-idp admin-create-user \
  --user-pool-id "$USER_POOL_ID" \
  --username user@test.com \
  --user-attributes Name=email,Value=user@test.com \
  --message-action SUPPRESS \
  --endpoint-url $ENDPOINT

echo "4. Confirmando senha do usuário..."
aws cognito-idp admin-set-user-password \
  --user-pool-id "$USER_POOL_ID" \
  --username user@test.com \
  --password "SenhaLocal123!" \
  --permanent \
  --endpoint-url $ENDPOINT

echo "--------------------------------------------------"
echo "Configuração concluída com sucesso!"
echo "Copie estes valores para o seu arquivo src/aws-exports.ts:"
echo "userPoolId: '$USER_POOL_ID'"
echo "userPoolClientId: '$CLIENT_ID'"
echo "--------------------------------------------------"