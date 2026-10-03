const connection = require("./connection"); // conexão com banco de dados

const getAll = async () => {
  const [tasks] = await connection.execute("SELECT * FROM tasks"); // função de busca GET
  return tasks;
};

const createTasks = async (task) => {
  const { title } = task;
  const dateUTC = new Date().toISOString().slice(0, 19).replace("T", " ");

  const query = "INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)";

  const [createdTasks] = await connection.execute(query, [
    title,
    "pendente",
    dateUTC,
  ]);
  return {id: createdTasks.insertId};
};

module.exports = {
  getAll,
  createTasks,
};
// objeto que recebe funcao de busca
