const { Router } = require("express");
const { importDataFromCsv } = require("../utils/importDataFromCsv");
const router = Router();

router.get("/importData", (req, res) => {
  importDataFromCsv(req, res);
});

module.exports = router;
