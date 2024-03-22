const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const login = (req, res) => {
  res.send("Login");
};

const register = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.create;
  res.status(StatusCodes.CREATED).json({ user: { username } });
};

module.exports = { login, register };
