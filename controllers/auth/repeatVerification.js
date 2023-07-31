const { errorHandler } = require("../../helpers");
const User = require("../../models/user");
const { sendEmail } = require("../../helpers");

const repeatVerification = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw errorHandler(400, "Missing required field email");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw errorHandler(404, "No user with this email found");
  }

  if (user.verify) {
    throw errorHandler(400, "Verification has already been passed");
  }

  const verificationToken = user.verificationToken;

  await sendEmail({
    to: email,
    from: "sldpsnow8800@gmail",
    subject: "Confirm your email",
    html: `<a href='http://localhost:3000/users/verify/${verificationToken}'>Press to confirm your email</a>`,
  });

  res.json({ message: "Verification email sent" });
};

module.exports = repeatVerification;
