const connection = require("./connection"); 

// Converte uma Date para o formato DATETIME do MySQL ("YYYY-MM-DD HH:MM:SS"), em UTC
const toMySqlDatetime = (date = new Date()) =>
  date.toISOString().slice(0, 19).replace("T", " ");

const getAll = async () => {
  const [tasks] = await connection.execute("SELECT * FROM tasks"); // função de busca GET
  return tasks;
};

const createTask = async (task) => {
  const { title } = task;

  const query = "INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)";

  const [createdTask] = await connection.execute(query, [
    title,
    "pendente",
    toMySqlDatetime(),
  ]);
  return { id: createdTask.insertId };
};

module.exports = {
  getAll,
  createTask,
};