// Initializes the `output` service on path `/output`
const createService = require('./output.class.js');
const hooks = require('./output.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/output', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('output');

  service.hooks(hooks);
};
