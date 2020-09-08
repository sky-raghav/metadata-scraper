const { getValueFromRedis, setValueinRedis } = require('./redis-helpers');
const urlParser = require('./url-parser');

//cache handler
const cacheManager = (url) => {
    return getValueFromRedis(url)
    .then((result) => {
      if(result) {
        return result;
      }
      else {
        return urlParser(url)
        .then((res) => setValueinRedis(url, JSON.stringify(res), 12 * 60 * 60));
      }
    })
    .catch((err) => {
      throw err;
  });
};

module.exports = {
  cacheManager: cacheManager
};
