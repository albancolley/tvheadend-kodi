const url = require('url');
const MongoClient = require('mongodb').MongoClient;
const Logger = require('mongodb').Logger

module.exports = function (app) {
  const config = app.get('mongodb');
  const mongodb_collection = app.get('mongodb_collection');
  const dbName = mongodb_collection | url.parse(config).path.substring(1);

  const promise = MongoClient.connect(config, { useNewUrlParser: true }).then(client => {
    // For mongodb <= 2.2
    if(client.collection) {
      return client;
    }

    return client.db(dbName);
  });

  app.set('mongoClient', promise);
};
