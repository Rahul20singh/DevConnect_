const app = require("express");

const UserRouter = app.Router();

const User = require("../models/user");

UserRouter.get("/user", (req, res) => {
  res.send("user Page");
});

UserRouter.post("/signup", async (req, res) => {
  const userData = req.body;
  console.log("userData:::::::::::", userData);

  try {
    let newUser = new User(userData);
    await newUser.save();
    res.json({ message: "user is created", data: newUser });
  } catch (error) {
    console.log("error:::::::::::", error);
    res.json({ message: "got error", status: error });
  }
});

module.exports = UserRouter;
