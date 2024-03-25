const { UnauthorizedError } = require("../errors");
const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  // Check header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authentication Invalid!");
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Attach User to notes routes
    req.user = { userId: payload.userId, username: payload.username };
    next();
  } catch (error) {
    throw new UnauthorizedError("Authentication Invalid!");
  }
};

module.exports = auth;
