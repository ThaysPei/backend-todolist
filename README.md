# TODO List Fullstack — Backend

API REST em Node.js para gerenciar tarefas (to-do list), com banco de dados MySQL rodando em um container Docker.

## Sobre o projeto

Este é o backend de uma aplicação de lista de tarefas. Ele expõe uma API que consulta as tarefas salvas no MySQL e as devolve em JSON. O projeto segue uma separação em camadas (rotas, controllers e models), em que cada uma tem uma responsabilidade única.

## Tecnologias

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/) (via [mysql2](https://github.com/sidorares/node-mysql2))
- [Docker](https://www.docker.com/) para rodar o banco
- [dotenv](https://github.com/motdotla/dotenv) para variáveis de ambiente
- [nodemon](https://nodemon.io/) para reiniciar o servidor em desenvolvimento

## Estrutura de pastas

```
backend/
├── src/
│   ├── controllers/
│   │   └── tasksController.js   # recebe a requisição e devolve a resposta
│   ├── models/
│   │   ├── connection.js        # conexão com o MySQL
│   │   └── tasksModel.js        # consultas SQL na tabela tasks
│   ├── router.js                # define as rotas da API
│   └── server.js                # inicia o servidor
├── .env                         # variáveis de ambiente (não versionar)
└── package.json
```

## Como funciona

Cada requisição percorre as camadas nesta ordem:

```
Cliente → router → controller → model → MySQL
                                          ↓
Cliente ← JSON + status ← controller ← model
```

| Camada | Responsabilidade |
|---|---|
| **router** | Define qual rota chama qual função do controller |
| **controller** | Recebe `request` e `response`, chama o model e devolve o JSON com o status HTTP |
| **model** | Conversa com o banco: executa as consultas SQL |

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [Docker](https://www.docker.com/) instalado e em execução
- Um cliente SQL para criar as tabelas (por exemplo, a extensão SQLTools ou Database Client no VS Code)

## Como rodar

### 1. Clone o repositório e instale as dependências

```bash
git clone <url-do-repositorio>
cd TODO-LIST-FULLSTACK/backend
npm install
```

### 2. Suba o MySQL com Docker

O container usa a porta **3307** da sua máquina, apontando para a 3306 do MySQL:

```bash
docker run -d --name mysql -e MYSQL_ROOT_PASSWORD=sua_senha -p 3307:3306 mysql:8
```

Se o container já existe e está parado (por exemplo, depois de reiniciar o computador):

```bash
docker start mysql
```

Confira se ele está de pé com `docker ps`. O MySQL leva de 20 a 30 segundos para aceitar conexões na primeira vez.

### 3. Crie o banco e a tabela

Conecte-se ao MySQL (host `localhost`, porta `3307`, usuário `root`) e execute:

```sql
CREATE DATABASE todolist;

USE todolist;

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pendente',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

Para testar, insira uma tarefa:

```sql
INSERT INTO tasks (title, status) VALUES ('Estudar JavaScript', 'pendente');
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na pasta `backend` (ajuste os nomes conforme o seu `connection.js`):

```env
PORT=3333
MYSQL_HOST=localhost
MYSQL_PORT=3307
MYSQL_USER=root
MYSQL_PASSWORD=sua_senha
MYSQL_DB=todolist
```

> Não versione o `.env`. Confirme que ele está no `.gitignore`.

### 5. Inicie o servidor

```bash
npm run dev
```

O terminal deve mostrar `server running on port 3333`.

## Rotas da API

### `GET /tasks`

Retorna todas as tarefas cadastradas.

**Resposta — `200 OK`**

```json
[
  {
    "id": 1,
    "title": "Estudar JavaScript",
    "status": "pendente",
    "created_at": "2026-09-24T18:33:54.000Z"
  }
]
```

Se a tabela estiver vazia, a resposta é `[]`.

> O campo `created_at` vem em UTC (o `Z` no final). Converta para o fuso local ao exibir no front-end.

## Status do projeto

- [x] Conexão com o MySQL em Docker
- [x] Estrutura em camadas (router, controller, model)
- [x] `GET /tasks`: listar tarefas
- [ ] `POST /tasks`: criar tarefa
- [ ] `PUT /tasks/:id`: atualizar tarefa
- [ ] `DELETE /tasks/:id`: remover tarefa
- [ ] Front-end

## Problemas comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| `Error opening connection` no cliente SQL | Container parado | `docker start mysql` |
| `[]` na resposta, mas a tabela tem dados | A API está lendo outro banco ou porta | Confira `MYSQL_PORT=3307` e `MYSQL_DB=todolist` no `.env` |
| `app crashed` no nodemon | Erro de sintaxe ou de importação | Leia a mensagem completa no terminal |
| Mudou o `.env` e nada mudou | O nodemon não recarrega o `.env` | Pare (`Ctrl+C`) e rode `npm run dev` de novo |

## Autora

Desenvolvido por Thays — [GitHub](https://github.com/ThaysPei)
