require("dotenv").config();

const mongoose = require("mongoose");
const config = require("./config.json");
mongoose.connect(config.connectionString);

const User = require("./models/user");
const Note = require("./models/note");

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

app.post("/login", async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ error: true, message: "Request body is required" });
  }
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const returnedUser = await User.findOne({ email: email });
  if (!returnedUser) {
    return res.status(400).json({ error: true, message: "User not found" });
  }

  if (returnedUser.email == email && returnedUser.password == password) {
    const user = { user: returnedUser };
    const accessToken = jwt.sign(
      {
        user,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "36000m",
      }
    );
    res.json({
      error: false,
      email,
      message: "Login successful",
      accessToken,
    });
  } else {
    return res
      .status(400)
      .json({ error: true, message: "Invalid credentials" });
  }
});

app.post("/add-note", authenticateToken, async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ error: true, message: "Request body is required" });
  }
  const { title, content, tags } = req.body;
  const user = req.user.user;

  if (!title) {
    return res.status(400).json({ error: true, message: "Title is required" });
  }
  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }

  try {
    const newNote = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });
    await newNote.save();
    res.json({
      error: false,
      newNote,
      message: "Note added successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal server error" });
  }
});

app.post("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.param.noteId;
  const {title, content, tags, isPinned} = req.body;
  const {user} = req.user;

  if(!title && !content && !tags){
    return res.status(400).json({error: true, message: "No changes provided"})
  }
  try {
    const note = await Note.findOne({_id : noteId, userId: user._id});

    if(!note){
      return res.status(404).json({error : true, message: "Note not found"})
    }
  }
});

app.listen(8000);

module.exports = app;
