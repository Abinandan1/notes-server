const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError, UnauthorizedError } = require("../errors");
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("Please provide username and password");
  }

  const user = await User.findOne({ username });
  if (!user) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  const passwordsMatch = await user.comparePasswords(password);
  if (!passwordsMatch) {
    throw new UnauthorizedError("Invalid Password");
  }
  const token = await user.generateToken();
  res.status(StatusCodes.OK).json({ user: { username }, token });
};

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.generateToken();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { username: user.username }, token });
};

module.exports = { login, register };
