let imageI
let imageII
const prefix = 'https://adalo-uploads.imgix.net/'

const addPrefixToImages = (data) => {
  if (data.Fotografia) {
    imageI = JSON.parse(data.Fotografia.replace(/'/g, '"'));
    imageI.url = prefix + imageI.url;

    data.Fotografia = imageI;
  }
  if (data.FotografiaII) {
    imageII = JSON.parse(data.FotografiaII.replace(/'/g, '"'));
    imageII.url = prefix + imageII.url;
    data.FotografiaII = imageII;
  }
  return data;
};

module.exports = { addPrefixToImages };
