require("dotenv").config();

const mongoose = require("mongoose");
const config = require("./config.json");
mongoose.connect(config.connectionString);

const User = require("./models/user");

const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ data: "Hello World" });
});

app.post("/create-account", async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ error: true, message: "Request body is required" });
  }
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full name is required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res
      .status(400)
      .json({ error: true, message: "User already exists" });
  }
  const newUser = new User({ fullName, email, password });
  await newUser.save();

  const accessToken = jwt.sign(
    {
      newUser,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "36000m",
    }
  );

  res.json({
    error: false,
    newUser,
    message: "Registration successful",
    accessToken,
  });
});

app.listen(8000);

module.exports = app;
