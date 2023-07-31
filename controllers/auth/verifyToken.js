const { errorHandler } = require("../../helpers");
const User = require("../../models/user");

const verifyToken = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken: verificationToken });

  if (!user) {
    throw errorHandler(404, "User not found");
  }

  if (user.verify) {
    throw errorHandler(400, "User is already verified");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  return res.json({ message: "Verification successful" });
};

module.exports = verifyToken;
