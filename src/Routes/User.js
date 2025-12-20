const app = require("express");

const User = app.Router();

User.get("/user", (req, res) => {
  res.send("user Page");
});

module.exports = User;
