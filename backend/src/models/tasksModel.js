const connection = require("./connection"); // conexão com banco de dados

const getAll = async () => {
  const [tasks] = await connection.execute("SELECT * FROM tasks"); // função de busca GET
  return tasks;
};

module.exports = {
  getAll,
};
// objeto que recebe funcao de busca
