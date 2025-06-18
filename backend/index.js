require("dotenv").config();

const mongoose = require("mongoose");
const config = require("./config.json");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ data: "Hello World" });
});

app.listen(8000);

module.exports = app;