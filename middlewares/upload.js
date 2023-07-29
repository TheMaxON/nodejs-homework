const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dirPath = path.resolve(__dirname, "temp");
    cb(null, dirPath);
  },
  filename: (req, file, cb) => {
    cb(null, Math.random() + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
