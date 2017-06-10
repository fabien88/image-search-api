const zenodb = require('../zenodb');

// Handle insertion of a new url entry into the database
const getLatest = () => {
  let database = null;
  return zenodb.open()
    .then((db)=>{
        database = db;
        return db.collection('search-logs')
    })
    .then(searchLogs => {
      return searchLogs.find().sort({"_id":-1}).limit(10).toArray()
    })
    .then(result => {
      database.close();
      return result;
    })

};
const fetchFromCache = ({term, offset}) => {
  let database = null;
  return zenodb.open()
    .then((db)=>{
        database = db;
        return db.collection('search-cache')
    })
    .then(searchLogs => {
      return searchLogs.find({term, offset}).limit(1).toArray()
    })
    .then(result => {
        database.close();
        return result;
    })
};

const cacheResult = ({term, json, offset}) => {
  return zenodb.open()
    .then((db)=> db.collection('search-cache'))
    .then(collection => {
      return collection.insert({ term, offset, json, createdAt : new Date() })
    })
}

const insertNew = (term) => {
  return zenodb.open()
    .then((db)=> db.collection('search-logs'))
    .then(collection => collection.insert({ term, createdAt : new Date() }))
};

module.exports = {
  insertNew,
  getLatest,
  cacheResult,
  fetchFromCache
};
