# Changelog

Todas as mudanças relevantes deste projeto serão documentadas neste arquivo.

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/).

## [Não lançado]

### Adicionado

- `PUT /tasks/:id`: nova rota para atualizar uma task existente.
- `DELETE /tasks/:id`: nova rota para excluir uma task.

## [0.2.0] - 2026-10-02

### Adicionado

- `POST /tasks` agora valida os dados enviados (ex.: o campo `title`) antes de cadastrar a task.
- Habilita CORS para permitir requisições do front-end.

### Modificado

- `POST /tasks` não retorna mais o `insertId` na resposta, para não expor informação interna do banco. Quem dependia desse campo precisa ajustar.

### Corrigido

- Corrige a data de criação das tasks, que era gerada incorretamente.

## [0.1.0] - 2026-10-01

### Adicionado

- `POST /tasks`: nova rota para cadastrar tasks.
- Suporte a corpo JSON nas requisições.
- As datas das tasks passam a ser registradas em UTC.
