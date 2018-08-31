/* eslint-disable no-unused-vars */
const nunjucks = require('nunjucks');

class Service {
  constructor(options) {
    this.options = options || {};
    nunjucks.configure('templates', { autoescape: true });
  }

  setup(app) {
    this.app = app;
  }

  async find(params) {
    const entries = this.app.service('entries');
    params.paginate=false;
    params.query.kodi_type = {$in : ['TV','Film']};
    return entries.find(params);
  }

  async get(id, params) {

    // Use strict mode so that Handlebars will throw exceptions if we
    // attempt to use fields in our template that are not in our data set.
    const result = nunjucks.render('output.sh', { foo: 'bar' });
    return {output : result};
  }

  async create(data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update(id, data, params) {
    return data;
  }

  async patch(id, data, params) {
    return data;
  }

  async remove(id, params) {
    return {id};
  }
}

module.exports = function(options) {
  return new Service(options);
};

module.exports.Service = Service;
