const assert = require('assert');
const app = require('../../src/app');

describe('\'output\' service', () => {
  it('registered the service', () => {
    const service = app.service('output');

    assert.ok(service, 'Registered the service');
  });
});
