const app = require("express");

const UserRouter = app.Router();

const User = require("../models/user");

UserRouter.get("/user", async (req, res) => {
  try {
    let userEmail = req.body.emailId;
    if (!userEmail) {
      throw new Error("pls pass the emailid");
    } else {
      let userData = await User.findOne({ email: userEmail });
      res.json(userData);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

UserRouter.delete("/user", async (req, res) => {
  try {
    let userId = req.body.userId;
    if (!userId) {
      throw new Error("pls pass the userId");
    } else {
      let userData = await User.findByIdAndDelete(userId);
      res.send("user deleted successfully");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

UserRouter.patch("/user/:userId", async (req, res) => {
  try {
    let userId = req.params.userId;
    let data = req.body;

    const allowedUpdates = ["userId", "age", "skills", "about"];

    let isAllowed = Object.keys(data).every((val) =>
      allowedUpdates.includes(val)
    );

    if (!isAllowed) {
      throw new Error("update not allowed");
    }
    if (!userId) {
      throw new Error("pls pass the userId");
    } else {
      let userData = await User.findByIdAndUpdate(userId, data, {
        returnDocument: "after",
        runValidators: true,
      });
      res.send("user updated successfully");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
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

UserRouter.get("/feed", async (req, res) => {
  try {
    let users = await User.find({});
    if (users.length == 0) {
      throw new Error("users not found");
    } else {
      res.json({ msg: "get all the users", data: users });
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = UserRouter;
