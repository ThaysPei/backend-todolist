// Erro próprio para falhas de banco. Guarda o erro original em `cause`
// (para log no servidor) sem expor detalhes de SQL ao cliente.
class DatabaseError extends Error {
  constructor(message = "Database error", options) {
    super(message, options);
    this.name = "DatabaseError";
  }
}

module.exports = DatabaseError;
