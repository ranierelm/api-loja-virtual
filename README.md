# Loja Virtual
Aplicação backend para loja virtual

## Table of Contents
- [About](#about)
- [Technical Overview](#technical-overview)
- [Setup & Run](#setup-and-run)
- [Running](#running)
- [Testing](#testing)

## About
Este projeto foi criado como parte de um teste técnico para uma vaga. O Projeto ainda está em fase de finalização.

## Technical Overview
A aplicação é construída usando Node.js, com Express como framework de servidor e Sequelize como ORM. O banco de dados utilizado é o PostgreSQL, rodando em um contêiner Docker, assim como o Bull para processamento de tarefas assíncronas, como filas por exemplo.

### Sequelize
Para configurar o banco de dados e o Sequelize, certifique-se de ter o PostgreSQL e o Redis rodando via Docker. Após configurar e iniciar os serviços Docker, você pode executar as migrações do banco de dados usando o seguinte comando:

```bash
npx sequelize-cli db:migrate
```

### Docker
O projeto utiliza Docker para rodar o PostgreSQL e o Redis. O arquivo `docker-compose.yml` tem a configuração dos serviços necessários.

### PostgreSQL Unaccent Extension
Após rodar o Docker, ative a extensão `unaccent` do PostgreSQL com o seguinte comando:

```bash
docker exec -it <container_id> psql -U postgres -d loja_virtual -c "CREATE EXTENSION IF NOT EXISTS unaccent;"
```

Substitua `<container_id>` pelo ID do contêiner do PostgreSQL.

## Setup and Run
Antes de começar, certifique-se de ter os seguintes requisitos instalados em seu sistema:

- [Node.js](https://nodejs.org/) - Versão 18 ou superior
- [Docker](https://www.docker.com/) - Para rodar o PostgreSQL e Redis

### Dependencies
Instale as dependências do projeto usando o comando:

```bash
npm install
```

Este comando instalará todas as dependências necessárias listadas no arquivo `package.json`.

### Environment Variables
Crie um arquivo `.env` na raiz do projeto e adicione as variáveis de ambiente necessárias, por exemplo:

```env
NODE_ENV=development
DB_NAME=db_name
DB_USER=postgres
DB_PASS=postgres
DB_HOST=127.0.0.1
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

## Running
Para rodar o projeto, primeiro inicie os serviços Docker:

```bash
docker-compose up -d
```

Após rodar o Docker, ative a extensão `unaccent` do PostgreSQL com o seguinte comando:

```bash
docker exec -it <container_id> psql -U postgres -d loja_virtual -c "CREATE EXTENSION IF NOT EXISTS unaccent;"
```

Para saber o id do container utilize o comando:

```bash
docker ps
```

Em seguida, execute o servidor Node.js e Bull com o seguinte comando:

```bash
npm run dev
```

## Generating Fake Products
Para gerar produtos falsos no banco de dados, execute o seguinte comando:

```bash
node src/utils/generateFakeProducts.js generate <quantityProducts>
```

Substitua `<quantityProducts>` pelo número de produtos que deseja gerar.

## API Endpoints
A aplicação oferece os seguintes endpoints para interagir com a API:

### Search Products
**Endpoint:** `GET /search`

**Query Parameters:**
- `query` (opcional): Termo de busca para produtos.
- `page` (opcional): Número da página para paginação.
- `limit` (opcional): Número de resultados por página.

**Exemplo de requisição:**
```bash
curl "http://localhost:3000/search?query=apple&page=1&limit=10"
```

### Create Order
**Endpoint:** `POST /create-order`

**Body Parameters:**
- `clientId` (obrigatório): ID do cliente.
- `products` (obrigatório): Array de produtos, cada um contendo `id`: Integer, `quantity`: Integer, `unit_price`: Double.

**Exemplo de requisição:**
```bash
curl -X POST "http://localhost:3000/create-order" \
-H "Content-Type: application/json" \
-d '{
  "clientId": 123,
  "products": [
    { "id": 1, "quantity": 2, "unit_price": 40.20 },
    { "id": 2, "quantity": 1, "unit_price": 10.99 }
  ]
}'
```

### Health Check
**Endpoint:** `GET /`

**Descrição:** Verifica se a API está conectada.

**Exemplo de requisição:**
```bash
curl "http://localhost:3000/"
```

## Testing
Para rodar os testes, utilize o Jest com o comando:

```bash
npm test
```




