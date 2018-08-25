'use strict';

const mock = require('egg-mock');

describe('test/logger-sls.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/logger-sls-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, loggerSLS')
      .expect(200);
  });
});
