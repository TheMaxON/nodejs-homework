const { errorHandler } = require("../../helpers");
const User = require("../../models/user");

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json(errorHandler(204, "Successfully logged out"));
};

module.exports = logout;
