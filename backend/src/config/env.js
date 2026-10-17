const dotenv = require('dotenv');

dotenv.config({ quiet: true });

const REQUIRED = ['MYSQL_HOST', 'MYSQL_PORT', 'MYSQL_USER', 'MYSQL_DB'];

const missing = REQUIRED.filter((name) => !process.env[name]?.trim());

// A senha pode ser vazia de propósito, então só exigimos que a variável exista.
if (process.env.MYSQL_PASSWORD === undefined) {
  missing.push('MYSQL_PASSWORD');
}

if (missing.length > 0) {
  console.error(`Variáveis de ambiente ausentes: ${missing.join(', ')}`);
  console.error('Copie o .env.example para .env e preencha os valores.');
  process.exit(1);
}

const mysqlPort = Number(process.env.MYSQL_PORT);

if (!Number.isInteger(mysqlPort) || mysqlPort < 1 || mysqlPort > 65535) {
  console.error(`MYSQL_PORT inválida: "${process.env.MYSQL_PORT}"`);
  process.exit(1);
}

module.exports = {
  port: Number(process.env.PORT) || 3333,
  isProduction: process.env.NODE_ENV === 'production',
  mysql: {
    host: process.env.MYSQL_HOST,
    port: mysqlPort,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
  },
};
