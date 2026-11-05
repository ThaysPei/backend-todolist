const connection = require("./connection"); 
const DEFAULT_TASK_STATUS = "pendente";

// Converte uma Date para o formato DATETIME do MySQL ("YYYY-MM-DD HH:MM:SS"), em UTC
const toMySqlDatetime = (date = new Date()) =>
  date.toISOString().slice(0, 19).replace("T", " ");

const getAll = async ({ limit, offset }) => {
  // Colunas explícitas e ordem definida (mais recentes primeiro; id desempata).
  // Usa query() porque execute() com LIMIT/OFFSET parametrizados falha em
  // versões recentes do MySQL; limit e offset já chegam validados como inteiros.
  const [tasks] = await connection.query(
    `SELECT id, title, status, created_at
     FROM tasks
     ORDER BY created_at DESC, id DESC
     LIMIT ? OFFSET ?`,
    [limit, offset]
  ); // função de busca GET
  return tasks;
};

const createTask = async (task) => {
  const { title } = task;

  const query = "INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)";

  const [createdTask] = await connection.execute(query, [
    title,
    DEFAULT_TASK_STATUS,
    toMySqlDatetime(),
  ]);
  return { id: createdTask.insertId };
};

module.exports = {
  getAll,
  createTask,
};