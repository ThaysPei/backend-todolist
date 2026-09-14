const app = require('./app'); 

const PORT = process.env.PORT || 3333;
require('dotenv').config();


app.listen(PORT, () => console.log(`server running on port ${PORT}`)); //aqui roda o server
