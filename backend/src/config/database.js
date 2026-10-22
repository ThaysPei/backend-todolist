const mysql = require('mysql2/promise');
const { mysql: db } = require('./env');

const pool = mysql.createPool({
  host: db.host,
  port: db.port,
  user: db.user,
  password: db.password,
  database: db.database,
  timezone: 'Z', // interpreta e grava DATETIME como UTC
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 50, // acima disso a requisição falha em vez de acumular sem fim
});

module.exports = pool;
