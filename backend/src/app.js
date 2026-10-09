const express = require('express');
const router = require('./router');

const app = express();

app.use(express.json());
app.use(router);


app.use((err, req, res, _next) => {
  const status = err.status ?? err.statusCode ?? 500;

  if (status >= 500) {
    console.error(err);
    return res.status(500).json({ message: 'internal server error' });
  }

  return res.status(status).json({ message: err.message });
});

module.exports = app;
