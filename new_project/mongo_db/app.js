const express = require("express");
const mongoose = require("mongoose");
const app = express();

const userModel = require("./usermodel");
const { name } = require("ejs");

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/mongopractice")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get("/", (req, res) => {
  res.send("hey");
});

app.get("/create", async (req, res) => {
  try {
    const createdUser = await userModel.create({
      name: "arzaan",
      email: "a@b.com",
      username: "arzaan23",
    });
    res.send(createdUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => {
  console.log("server is running on 3000");
});
