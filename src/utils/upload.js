const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "src/files");
  },
  filename: function (req, file, callback) {
    const filename = file.originalname;
    callback(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2048576, // 2 Mb
  },
});

module.exports = { upload };
