const connection = require("./connection"); // conexão com banco de dados

const getAll = async () => {
  const [tasks] = await connection.execute("SELECT * FROM tasks"); // função de busca GET
  return tasks;
};

const createTask = async (task) => {
  const { title } = task;
  const dateUTC = new Date().toISOString().slice(0, 19).replace("T", " ");

  const query = "INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)";

  const [createdTask] = await connection.execute(query, [
    title,
    "pendente",
    dateUTC,
  ]);
  return {id: createdTask.insertId};
};

module.exports = {
  getAll,
  createTask,
};
// objeto que recebe funcao de busca
