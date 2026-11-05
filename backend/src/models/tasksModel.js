const connection = require("./connection");
const DatabaseError = require("../errors/DatabaseError");

const DEFAULT_TASK_STATUS = "pendente";

// Converte uma Date para o formato DATETIME do MySQL ("YYYY-MM-DD HH:MM:SS"), em UTC
const toMySqlDatetime = (date = new Date()) =>
  date.toISOString().slice(0, 19).replace("T", " ");

const getAll = async () => {
  try {
    const [tasks] = await connection.execute("SELECT * FROM tasks"); // função de busca GET
    return tasks;
  } catch (error) {
    throw new DatabaseError("Failed to list tasks", { cause: error });
  }
};

const createTask = async (task) => {
  const { title } = task;

  const query = "INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)";

  try {
    const [createdTask] = await connection.execute(query, [
      title,
      DEFAULT_TASK_STATUS,
      toMySqlDatetime(),
    ]);
    return { id: createdTask.insertId };
  } catch (error) {
    throw new DatabaseError("Failed to create task", { cause: error });
  }
};

module.exports = {
  getAll,
  createTask,
};