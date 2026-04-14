const express = require("express");
const mongoose = require("mongoose");
const app = express();

const userModel = require("./usermodel");
const { name } = require("ejs");

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://Arzaan:Arzaan123@cluster0.ydlwhze.mongodb.net/mongopractice?retryWrites=true&w=majority",
  )
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get("/", (req, res) => {
  res.send("hey");
});

app.get("/update", async (req, res) => {
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { username: "arzaan23" },
      { name: "owais" },
      { returnDocument: "after" },
    );
    res.send(updatedUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
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

app.get("/readAll", async (req, res) => {
  try {
    const users = await userModel.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/readOne", async (req, res) => {
  try {
    const singleUser = await userModel.findOne( { username : "arzaan23"});
    res.send(singleUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/deleteOne", async (req, res) => {
  try {
    const singleUser = await userModel.findOneAndDelete({
      username: "arzaan23",
    });
    res.send(singleUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => {
  console.log("server is running on 3000");
});
