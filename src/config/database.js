const mongoose = require("mongoose");

const URI =
  "mongodb+srv://RahulSingh:Rahul123@namasterahul.eah4f.mongodb.net/devConnect";

async function connectDb() {
  try {
    await mongoose.connect(URI);
    console.log("database connection established");
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = connectDb;
