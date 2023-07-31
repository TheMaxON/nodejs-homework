const registration = require("./registration");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const changeAvatar = require("./changeAvatar");
const verifyToken = require("./verifyToken");
const repeatVerification = require("./repeatVerification");

module.exports = {
  registration,
  login,
  logout,
  current,
  changeAvatar,
  verifyToken,
  repeatVerification,
};
