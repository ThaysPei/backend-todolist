require("dotenv").config();      // 1º: carrega o .env primeiro

const app = require("./app");    // 2º: agora sim, connection.js já vai ver as variáveis certas

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
