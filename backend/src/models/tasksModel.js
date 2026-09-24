const connection = require("./connection"); // conexão com banco de dados

const getAll = async () => {
  const [tasks] = await connection.execute("SELECT * FROM tasks"); // função de busca GET
  return tasks;
};


const createTasks = async (task) => {

const { title } = task;
const query = 'INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)';
const createdTasks = await connection.execute(query, [title, 'pendente', 'asdasd'])

}


module.exports = {
  getAll,
  createTasks,
};
// objeto que recebe funcao de busca
