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
      //console.log("dataaaaa ::: ", data.Fotografia);

      //data.Fotografia = data.Fotografia.replace(/'/g, '"')
      /* console.log(
        " data double quotes modified: ",
        data.Fotografia.replace(/'/g, '"')
      ); */
      if (data.Fotografia) {
        imageI = JSON.parse(data.Fotografia.replace(/'/g, '"'));
        imageI.url = "https://adalo-uploads.imgix.net/" + imageI.url;
        //console.log("parsed imageI: ", imageI);
        data.Fotografia = imageI;
      }
      if (data.FotografiaII) {
        imageII = JSON.parse(data.FotografiaII.replace(/'/g, '"'));
        imageII.url = "https://adalo-uploads.imgix.net/" + imageII.url;
        //console.log("parsed imageII: ", imageII);
        data.FotografiaII = imageII;
      }

      /* const image1Splited = data.Fotografia.split("'");
      console.log("data splited: ", image1Splited[3]); */
      results.push(data);
    })
    .on("end", () => {
      //console.log(results);
      res.json(results);
    });
});

module.exports = router;
