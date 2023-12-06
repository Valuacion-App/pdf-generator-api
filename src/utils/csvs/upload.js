const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 7048576, // 7 Mb
  },
});

module.exports = { upload };
