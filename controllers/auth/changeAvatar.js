const fs = require("fs/promises");
const path = require("path");
const { errorHandler } = require("../../helpers");

const changeAvatar = async (req, res) => {
  if (!req.file) {
    throw errorHandler(400, "No file uploaded");
  }
  const { filename } = req.file;
  const { _id } = req.user;

  const tempPath = path.resolve(__dirname, "../", "temp", filename);
  const newPath = path.resolve(__dirname, "../", "public", filename);

  try {
    await fs.rename(tempPath, newPath);
    await User.findByIdAndUpdate(_id, { avatarURL: filename });
    return res.json({ ok: true });
  } catch (error) {
    console.error("Error while moving file to public folder", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = changeAvatar;
