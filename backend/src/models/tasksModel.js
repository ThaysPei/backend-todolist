const connection = require("./connection");
const DEFAULT_TASK_STATUS = "pendente";

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
    DEFAULT_TASK_STATUS,
    toMySqlDatetime(),
  ]);
  return { id: createdTask.insertId };
};

const deleteTask = async (id) => {
  const removedTask = await connection.execute(
    "DELETE FROM tasks WHERE id= ?",
    [id],
  );
  return removedTask;
};

const updateTask = async (id, task) => {
  const {title, status} = task;
  const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';

  const [updatedTask] = await connection.execute(query, [title, status, id]);
  return updatedTask;
};


module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
};
