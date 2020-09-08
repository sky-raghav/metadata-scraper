const express = require('express');
const { cacheManager } = require('./services/cache-service');
const port = process.env.DB_HOST || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//Post route for scraper
app.post('/ogscraper', (req, res) => {
  const { url } = req.body;
  if(url && url.length){
    return cacheManager(url)
    .then((result) => {
      res.json(JSON.parse(result));
    })
    .catch((err) => res.status(404).json({error: err.message}));
  } else {
    res.status(404).json({error: 'No URL Found!'});
  }
});

//Server Listener
app.listen(port, () => {
  console.log('Listening on port 8080');
});

module.exports = app; // for testing
