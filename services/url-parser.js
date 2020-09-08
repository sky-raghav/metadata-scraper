const metaParser = require('html-metadata-parser');

//Url parser
const urlParser = (url) => {
  return new Promise((resolve, reject) => {
    metaParser.parser(url)
    .then((result) => {
      resolve(resultFormatter(result));
    })
    .catch((err) => {
      reject(new Error('Invalid URL!'));
    })
  });
};

//Formats the result for final response
const resultFormatter = (result) => {
  let { title, description, images } = result.og;
  if(!title || !title.length){
    title = result.meta.title || title;
  }
  if(!description || !description.length){
    description = result.meta.description || description;
  }
  if(!images || !images.length){
      images = result.images || images;
  }
  delete result.og.image;
  return {
    ...result.og,
    title,
    description,
    images : images.map((item) => item.url)
  }
}

module.exports = urlParser;
