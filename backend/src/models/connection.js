const mysql = require('mysql2/promise')

const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,

    // DATETIME não carrega fuso: 'Z' faz o driver ler e gravar em UTC,
    // independente do fuso da máquina onde o Node roda (contrato do README).
    timezone: 'Z',

    // Máximo de conexões abertas ao mesmo tempo com o MySQL.
    connectionLimit: 10,

    // Requisições esperando por uma conexão livre. Acima disso, o driver
    // devolve erro em vez de acumular a fila sem limite se o banco travar.
    queueLimit: 100,
})
module.exports = connection;
