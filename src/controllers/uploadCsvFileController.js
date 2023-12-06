const csv = require('csv-parser');
const { Readable } = require('stream');
const { addPrefixToImages } = require("../utils/csvs/addPrefixToImages");

const uploadCsvFileController = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se proporcionó un archivo CSV' });
  }

  const csvData = req.file.buffer.toString();

  const results = [];
  Readable.from(csvData)
  .pipe(csv())
  .on('data', (data) => {
    const newData = addPrefixToImages(data)
    results.push(newData)
  })
  .on('end', () => {
    res.json(results);
  });

};

module.exports = uploadCsvFileController