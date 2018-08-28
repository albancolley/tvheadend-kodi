const searchHooks = require('../../hooks/search');

const processEntry = require('../../hooks/process-entry');

module.exports = {
  before: {
    all: [],
    find: [searchHooks.searchRegex()],
    get: [],
    create: [],
    update: [
      processEntry()
    ],
    patch: [
      processEntry()
    ],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
