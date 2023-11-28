const { Router } = require("express");
const router = Router();

const csv = require("csv-parser");
const fs = require("fs");
const results = [];
let imageI;
let imageII;

router.get("/importData", (req, res) => {
  fs.createReadStream("TXdataAnt.csv")
    .pipe(csv())
    .on("data", (data) => {
      if (data.Fotografia) {
        imageI = JSON.parse(data.Fotografia.replace(/'/g, '"'));
        imageI.url = "https://adalo-uploads.imgix.net/" + imageI.url;

        data.Fotografia = imageI;
      }
      if (data.FotografiaII) {
        imageII = JSON.parse(data.FotografiaII.replace(/'/g, '"'));
        imageII.url = "https://adalo-uploads.imgix.net/" + imageII.url;
        data.FotografiaII = imageII;
      }
      results.push(data);
    })
    .on("end", () => {
      res.json(results);
    });
});

module.exports = router;
