const express = require("express");
const cors = require("cors");
const router = require("./router");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

const ALLOWED_ORIGINS = (
  process.env.CORS_ORIGIN || "http://localhost:5173,http://127.0.0.1:5500"
).split(",");

app.use(express.json());
app.use(cors({ origin: ALLOWED_ORIGINS }));
app.use(router);
app.use(errorHandler); // sempre por último

module.exports = app;
