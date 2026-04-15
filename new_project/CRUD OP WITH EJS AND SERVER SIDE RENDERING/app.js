const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

const userModel = require("./models/user.js");
const user = require("./models/user.js");
const { name } = require("ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get("/", (req, res) => {
  res.send("hey");
});

app.get("/home", (req, res) => {
  res.render("index");
});

app.get("/read", async (req, res) => {
  const allUsers = await userModel.find();
  res.render("read", { users: allUsers });
});

app.post("/create", async (req, res) => {
  const { name, email, image } = req.body;
  const createdUser = await userModel.create({
    name: name,
    email: email,
    image: image,
  });
  res.redirect("/read");
});

app.get("/delete/:id", async (req, res) => {
  const DeletedUser = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

app.get("/edit/:id", async (req, res) => {
  const user = await userModel.findOne({ _id: req.params.id });
  res.render("edit", { user });
});

app.post("/update/:id", async (req, res) => {
  const { name, email, image } = req.body;
  const user = await userModel.findOneAndUpdate(
    { _id: req.params.id },
    { name, email, image },
    { returnDocument: "after" },
  );
  res.redirect("/read");
});

app.listen(3000, () => {
  console.log("server is running at 3000");
});
