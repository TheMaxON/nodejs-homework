const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const User = require("../../models/user");
const { sendEmail } = require("../../helpers");
const { nanoid } = require("nanoid");

const registration = async (req, res) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const result = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  await sendEmail({
    to: email,
    from: "sldpsnow8800@gmail",
    subject: "Confirm your email",
    html: `<a href='http://localhost:3000/users/verify/${verificationToken}'>Press to confirm your email</a>`,
  });

  res.status(201).json({
    email,
    subscription: result.subscription,
  });
};

module.exports = registration;
