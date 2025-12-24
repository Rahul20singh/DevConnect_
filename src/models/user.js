const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
    },
    lastName: {
      type: String,
      maxLength: 10,
    },
    cityName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
      trim: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 50,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
    },
    skills: {
      type: [String],

      validate(value) {
        if (value.length > 5) {
          throw new Error("Pls add skills less than 5");
        }
      },
    },
    about: {
      type: String,
      default: "This is default about of the user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
