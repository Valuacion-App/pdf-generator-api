const { Router } = require("express");
const { upload } = require("../utils/upload");
const router = Router();

router.post("/uploadFile", upload.any(), function (req, res) {
  res.json({ message: "upload PDF File" });
});

module.exports = router;
