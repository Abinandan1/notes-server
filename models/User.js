const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    minlength: 3,
    maxlength: 50,
    unique: [true, "The username is already taken"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 8,
    maxlength: 20,
    match: [
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
      "Password must contain at least one number, at least one special character, at least one uppercase letter.",
    ],
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.generateToken = function () {
  return jwt.sign(
    { userId: this._id, username: this.username },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

UserSchema.methods.comparePasswords = async function (password) {
  const passwordsMatch = await bcrypt.compare(password, this.password);
  return passwordsMatch;
};

module.exports = mongoose.model("User", UserSchema);
