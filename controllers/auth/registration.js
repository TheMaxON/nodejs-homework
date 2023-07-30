const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const User = require("../../models/user");

const registration = async (req, res) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const avatarURL = gravatar.url(email);

  const result = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
  });
  res.status(201).json({
    email,
    subscription: result.subscription,
  });
};

module.exports = registration;
