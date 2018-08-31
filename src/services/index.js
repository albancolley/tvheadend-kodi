const entries = require('./entries/entries.service.js');
const output = require('./output/output.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(entries);
  app.configure(output);
};
