const rClient = require('../redis-client');

//Set value in cache with expiry
const setValueinRedis = (field, value, expiry) => {
  return new Promise( (resolve, reject) => {
    rClient.set(field, value, 'EX', expiry, (err) => {
      if(err) reject(err);
      else resolve(value);
    });
  })
  .catch((err)=>{
    throw err;
  });
};

//get value from cache
const getValueFromRedis = (field) => {
  return new Promise( (resolve, reject) => {
    rClient.get(field, (err, result) => {
      if(err){
        reject(err);
      } else{
        resolve(result);
      }
    });
  })
  .catch((err)=>{
    throw err;
  });
};

//Clears Redis Client
const flushAll = () => {
  return new Promise((resolve, reject)=>{
    rClient.flushall((err,result)=>{
      if(err){
        reject(err);
      }
      else{
        resolve(result);
      }
    });
  })
  .catch(err => {
    throw err;
  });
};

module.exports = {
  setValueinRedis: setValueinRedis,
  getValueFromRedis: getValueFromRedis,
  flushAll : flushAll
};
