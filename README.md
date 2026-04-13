# Payment Web

Frontend em Next.js para consulta e operação da API do projeto [`payment-api`](../payment-api).

Esta aplicação consome o backend localizado na pasta `nestJs/payment-api` e permite:

- listar pedidos cadastrados;
- criar novos pedidos;
- iniciar a criação de pagamento para pedidos com status compatível.

## Requisitos

- Node.js instalado;
- API `payment-api` disponível e em execução;
- variável de ambiente `NEXT_PUBLIC_API_URL` apontando para a API.

## Configuração

O projeto já utiliza a variável abaixo no arquivo `.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Se a API estiver rodando em outra porta ou host, ajuste esse valor.

## Como executar

1. Inicie primeiro o backend em `../payment-api`.
2. Neste projeto, instale as dependências:

```bash
npm install
```

3. Rode o frontend em modo de desenvolvimento:

```bash
npm run dev
```

4. Acesse `http://localhost:3000`.

## Integração com a API

O frontend faz chamadas para os seguintes endpoints do backend:

- `GET /orders` para listar pedidos;
- `POST /orders` para criar um novo pedido;
- `POST /payments/intent` para iniciar o fluxo de pagamento.

Todas essas chamadas usam a base definida em `NEXT_PUBLIC_API_URL`.

## Scripts disponíveis

```bash
npm run dev
npm run build
npm run start
npm run lint
```
