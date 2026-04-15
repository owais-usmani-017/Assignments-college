const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let waitlist = [];

app.post("/waitlist", (req, res) => {
  const { firstName, lastName, email, phone, reason } = req.body;

  // basic validation
  if (!firstName || !lastName || !email || !phone || !reason) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newUser = {
    firstName,
    lastName,
    email,
    phone,
    reason,
  };

  waitlist.push(newUser);

  res.json({ message: "Successfully added to waitlist" });
});

app.get("/waitlist", (req, res) => {
  res.json(waitlist);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
