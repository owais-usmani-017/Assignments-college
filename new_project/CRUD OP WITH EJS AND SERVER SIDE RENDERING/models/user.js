const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  image: String,
  email: String,
});

module.exports = mongoose.model("user", userSchema);
