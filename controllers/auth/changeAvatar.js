const fs = require("fs/promises");
const path = require("path");
const { errorHandler } = require("../../helpers");
const User = require("../../models/user");
const Jimp = require("jimp");

const changeAvatar = async (req, res) => {
  if (!req.file) {
    throw errorHandler(400, "No file uploaded");
  }
  const { filename, originalname } = req.file;
  const { _id } = req.user;
  const newFileName = `${_id}_${originalname}`;

  const tempPath = path.resolve(__dirname, "../../", "tmp", filename);
  const newPath = path.resolve(
    __dirname,
    "../../",
    "public/avatars",
    newFileName
  );

  try {
    await fs.rename(tempPath, newPath);

    const avatar = await Jimp.read(newPath);
    avatar.resize(250, 250);
    avatar.write(newPath);

    const avatarURL = `avatars/${newFileName}`;
    await User.findByIdAndUpdate(_id, { avatarURL });
    return res.json({ avatarURL });
  } catch (error) {
    console.error("Error while moving file to public folder", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = changeAvatar;
