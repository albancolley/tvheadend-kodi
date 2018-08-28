// Initializes the `entries` service on path `/entries`
const createService = require('feathers-mongodb');
const hooks = require('./entries.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/entries', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('entries');

  mongoClient.then(db => {
    service.Model = db.collection('entries');
  });

  service.hooks(hooks);
};
