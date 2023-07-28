const jwt = require("jsonwebtoken");
const { errorHandler } = require("../helpers");
const User = require("../models/user");
const { JWT_SECRET } = process.env;

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") {
    throw errorHandler(401, "Invalid token type");
  }

  if (!token) {
    throw errorHandler(401, "No token provided");
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(payload.userId);
    if (!user || !user.token || user.token !== token) {
      throw errorHandler(401, "Invalid token");
    }

    req.user = user;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw errorHandler(401, "Token expired");
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw errorHandler(401, "Invalid token");
    }

    throw error;
  }

  next();
};

module.exports = auth;
