const express = require("express");
const cors = require("cors");
const router = require("./router");

const app = express();
const ALLOWED_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(express.json());
app.use(cors({ origin: ALLOWED_ORIGIN }));
app.use(router);
module.exports = app;
