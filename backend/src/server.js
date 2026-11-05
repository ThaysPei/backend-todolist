require("dotenv").config();      // 1º: carrega o .env primeiro

const app = require("./app");    // 2º: agora sim, connection.js já vai ver as variáveis certas
const pool = require("./models/connection");

const PORT = process.env.PORT || 3333;
const SHUTDOWN_TIMEOUT_MS = 10000;

const start = async () => {
  // O pool do mysql2 é lazy: sem esse teste, a falha só apareceria na 1ª requisição
  try {
    await pool.query("SELECT 1");
  } catch (error) {
    console.error(
      `could not connect to the database (${error.code ?? error.message}). ` +
        "Check the MYSQL_* variables in .env and whether MySQL is running."
    );
    await pool.end().catch(() => {});
    process.exit(1);
  }

  const server = app.listen(PORT, () =>
    console.log(`server running on port ${PORT}`)
  );

  let shuttingDown = false;

  const shutdown = (signal) => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log(`${signal} received, shutting down...`);

    // Garante a saída mesmo se alguma conexão HTTP não fechar
    setTimeout(() => process.exit(1), SHUTDOWN_TIMEOUT_MS).unref();

    // Para de aceitar novas requisições, espera as em andamento e fecha o pool
    server.close(async () => {
      try {
        await pool.end();
        process.exit(0);
      } catch (error) {
        console.error("error closing the database pool:", error.message);
        process.exit(1);
      }
    });
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
};

start();
