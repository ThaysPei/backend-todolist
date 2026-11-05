const DatabaseError = require("../errors/DatabaseError");

// Middleware de erro (4 parâmetros): deve ser registrado por último em app.js.
// eslint-disable-next-line no-unused-vars
const errorHandler = (error, request, response, next) => {
  // Erros do cliente (ex.: JSON inválido no corpo) chegam com status 4xx
  const status = error.status ?? error.statusCode;
  if (status >= 400 && status < 500) {
    const message =
      error.type === "entity.parse.failed"
        ? "invalid JSON body"
        : "invalid request";
    return response.status(status).json({ message });
  }

  // Falha de banco ou qualquer erro inesperado: detalhe só no log do servidor
  console.error(
    error instanceof DatabaseError ? "[database]" : "[unexpected]",
    error.cause ?? error
  );
  return response.status(500).json({ message: "internal server error" });
};

module.exports = errorHandler;
